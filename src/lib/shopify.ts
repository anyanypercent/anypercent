type ShopifyMoney = { amount: string; currencyCode: string };

type ShopifyImage = { url: string; altText: string | null };

type ShopifyVariant = {
  id: string;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
};

type ShopifyProductNode = {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  onlineStoreUrl: string | null;
  priceRange: { minVariantPrice: ShopifyMoney };
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  variants: { nodes: ShopifyVariant[] };
};

type ShopifyProductsResponse = {
  data?: {
    products: {
      edges: Array<{ node: ShopifyProductNode }>;
    };
  };
  errors?: Array<{ message: string }>;
};

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

function formatPrice(money: ShopifyMoney) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(money.amount));
}

export type HeadlessProduct = {
  id: string;
  name: string;
  desc: string;
  price: string;
  href: string;
  checkoutUrl: string;
  image: string | null;
  hoverImage: string | null;
  category: string;
  sizes: string[];
};

function toProduct(node: ShopifyProductNode): HeadlessProduct {
  const image = node.featuredImage?.url ?? node.images.nodes[0]?.url ?? null;
  const hoverImage = node.images.nodes[1]?.url ?? null;
  const firstSellable = node.variants.nodes.find((v) => v.availableForSale) ?? node.variants.nodes[0];
  const variantId = firstSellable ? variantNumericId(firstSellable.id) : null;
  const sizes = Array.from(
    new Set(
      node.variants.nodes
        .flatMap((v) => v.selectedOptions)
        .filter((o) => o.name.toLowerCase() === "size")
        .map((o) => o.value)
    )
  );

  return {
    id: node.id,
    name: cleanName(node.title),
    desc: node.description || "",
    price: formatPrice(node.priceRange.minVariantPrice),
    href: node.onlineStoreUrl || `https://${SHOPIFY_DOMAIN}/products/${node.handle}`,
    checkoutUrl: variantId
      ? `https://${SHOPIFY_DOMAIN}/cart/${variantId}:1`
      : node.onlineStoreUrl || `https://${SHOPIFY_DOMAIN}/products/${node.handle}`,
    image,
    hoverImage,
    category: inferCategory(node.title, node.productType),
    sizes,
  };
}

function cleanName(name: string) {
  return name
    .replace(/\s+/g, " ")
    .replace(/\s*for\s+/i, " for ")
    .trim();
}

function inferCategory(name: string, productType?: string) {
  const n = `${name} ${productType ?? ""}`.toLowerCase();
  if (n.includes("hoodie")) return "hoodie";
  if (n.includes("shirt") || n.includes("tee") || n.includes("t-shirt")) return "t-shirt";
  return "other";
}

function variantNumericId(gid: string) {
  const m = gid.match(/\/(\d+)$/);
  return m?.[1] ?? null;
}

export async function getShopifyProducts(limit = 12): Promise<HeadlessProduct[]> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) return [];

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`;

  const query = `#graphql
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            onlineStoreUrl
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
            images(first: 2) {
              nodes {
                url
                altText
              }
            }
            variants(first: 50) {
              nodes {
                id
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables: { first: limit } }),
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const json = (await res.json()) as ShopifyProductsResponse;
  if (json.errors?.length) return [];

  const deduped = new Map<string, HeadlessProduct>();

  for (const { node } of json.data?.products.edges ?? []) {
    if (deduped.has(node.handle)) continue;

    deduped.set(node.handle, toProduct(node));
  }

  return Array.from(deduped.values());
}

export async function getShopifyProductsByHandles(handles: string[]): Promise<HeadlessProduct[]> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) return [];
  if (handles.length === 0) return [];

  const cleaned = handles
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean)
    .map((h) => h.replace(/[^a-z0-9-]/g, ""));
  if (cleaned.length === 0) return [];

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`;
  const queryString = cleaned.map((h) => `handle:${h}`).join(" OR ");

  const query = `#graphql
    query GetProductsByHandles($first: Int!, $query: String!) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            onlineStoreUrl
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
            images(first: 2) {
              nodes {
                url
                altText
              }
            }
            variants(first: 50) {
              nodes {
                id
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables: { first: Math.min(cleaned.length * 2, 100), query: queryString } }),
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];
  const json = (await res.json()) as ShopifyProductsResponse;
  if (json.errors?.length) return [];

  const byHandle = new Map<string, HeadlessProduct>();
  for (const { node } of json.data?.products.edges ?? []) {
    byHandle.set(node.handle.toLowerCase(), toProduct(node));
  }

  // Preserve caller order from env.
  return cleaned.map((h) => byHandle.get(h)).filter((v): v is HeadlessProduct => Boolean(v));
}

export async function getShopifyProductsByCollection(
  collectionHandle: string,
  limit = 100
): Promise<HeadlessProduct[]> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) return [];
  if (!collectionHandle.trim()) return [];

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`;
  const query = `#graphql
    query GetCollectionProducts($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              productType
              onlineStoreUrl
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              featuredImage {
                url
                altText
              }
              images(first: 2) {
                nodes {
                  url
                  altText
                }
              }
              variants(first: 50) {
                nodes {
                  id
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { handle: collectionHandle, first: Math.min(limit, 250) },
    }),
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];
  const json = (await res.json()) as {
    data?: { collectionByHandle?: { products?: { edges: Array<{ node: ShopifyProductNode }> } } };
    errors?: Array<{ message: string }>;
  };
  if (json.errors?.length) return [];

  return (json.data?.collectionByHandle?.products?.edges ?? []).map(({ node }) => toProduct(node));
}

import { SiteHeader } from "@/components/site-header";
import { ShopGrid } from "@/components/shop-grid";
import { products } from "@/data/site";
import { getShopifyProductsByCollection, getShopifyProductsByHandles } from "@/lib/shopify";

export default async function ShopPage() {
  const collectionHandle = process.env.SHOP_COLLECTION_HANDLE ?? "archetype";
  const selectedHandles = (process.env.SHOP_ITEMS ?? "")
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);

  const liveProducts = selectedHandles.length > 0
    ? await getShopifyProductsByHandles(selectedHandles)
    : await getShopifyProductsByCollection(collectionHandle, 100);
  const items = liveProducts.length > 0 ? liveProducts : products.map((p, i) => ({
    id: `fallback-${i}`,
    name: p.name,
    desc: p.desc,
    price: p.price,
    href: p.href,
    checkoutUrl: p.href,
    image: null,
    hoverImage: null,
    category: "other",
    sizes: [],
  }));

  return (
    <main className="min-h-screen bg-[#CCCCCC] text-zinc-900">
      <section className="flex w-full flex-col gap-[10px] px-5 pb-24 pt-0 md:px-[60px]">
        <SiteHeader
          light
          logoSrc="/images/ap-logo-xeno-black.svg"
          linkBaseClass="text-black"
          linkHoverClass="hover:text-[#ff3636]"
        />
        <ShopGrid items={items} />
        {liveProducts.length === 0 ? (
          <p className="text-sm text-zinc-600">
            Add Shopify Storefront env keys (and optional SHOP_COLLECTION_HANDLE/SHOP_ITEMS) to load live products automatically.
          </p>
        ) : null}
      </section>
    </main>
  );
}

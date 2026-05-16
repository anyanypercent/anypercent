"use client";

import { useEffect, useMemo, useState } from "react";

type AsciiTitleProps = {
  text: string;
  className?: string;
};

const CHARS = " .'`^,:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

export function AsciiTitle({ text, className }: AsciiTitleProps) {
  const [ascii, setAscii] = useState("");
  const cleaned = useMemo(() => text.toUpperCase(), [text]);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const w = 180;
    const h = 42;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;
    let frame = 0;

    const render = () => {
      if (!mounted) return;
      frame += 1;

      ctx.fillStyle = "#333333";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#fff";
      ctx.font = "900 24px monospace";
      ctx.textBaseline = "middle";
      ctx.fillText(cleaned, 2, h / 2);

      const img = ctx.getImageData(0, 0, w, h).data;
      const cols = 120;
      const rows = 26;
      const stepX = w / cols;
      const stepY = h / rows;

      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = Math.floor(x * stepX);
          const py = Math.floor(y * stepY);
          const i = (py * w + px) * 4;
          const lum = img[i];
          const jitter = (Math.sin((x + y + frame) * 0.15) + 1) * 0.03;
          const t = Math.min(1, lum / 255 + jitter);
          const idx = Math.floor(t * (CHARS.length - 1));
          out += CHARS[idx];
        }
        out += "\n";
      }

      setAscii(out);
    };

    render();
    const timer = window.setInterval(render, 220);

    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, [cleaned]);

  return (
    <pre
      className={className}
      aria-label={`ascii render of ${text}`}
      style={{ lineHeight: 0.72 }}
    >
      {ascii}
    </pre>
  );
}

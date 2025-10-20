import { useEffect } from "react";

// تحويل اللون من HEX إلى RGB
const hexToRgb = (hex: string) => {
  const parsed = hex.replace("#", "");
  const bigint = parseInt(parsed, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
};

// دمج RGB مع عامل (t) بين 0 و 1
const lerpColor = (a: number[], b: number[], t: number) => {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
};

const useThemeColorGradientSmooth = (colors: string[], duration = 3000) => {
  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }

    const rgbColors = colors.map(hexToRgb);
    let start = 0;
    let end = 1;
    let t = 0;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      t += delta / duration;

      if (t > 1) {
        t = 0;
        start = end;
        end = (end + 1) % rgbColors.length;
      }

      const [r, g, b] = lerpColor(rgbColors[start], rgbColors[end], t);
      meta!.setAttribute("content", `rgb(${r},${g},${b})`);

      requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(id);
  }, [colors, duration]);
};

export default useThemeColorGradientSmooth;

/** Adobe Photoshop app icon — raster asset in `/public/logos/photoshop.png`. */

export function PhotoshopLogo({ className }: { className?: string }) {
  return (
    <img
      src="/logos/photoshop.png"
      alt=""
      width={32}
      height={32}
      decoding="async"
      className={`h-8 w-auto max-h-8 object-contain ${className ?? ''}`}
    />
  );
}

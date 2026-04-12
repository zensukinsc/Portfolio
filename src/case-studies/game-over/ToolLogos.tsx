export { PhotoshopLogo } from '../insta-kill/ToolLogos';

export function DaVinciResolveLogo({ className }: { className?: string }) {
  return (
    <img
      src="/logos/davinci-resolve.png"
      alt=""
      width={48}
      height={48}
      decoding="async"
      className={`h-8 w-auto max-h-8 object-contain ${className ?? ''}`}
    />
  );
}

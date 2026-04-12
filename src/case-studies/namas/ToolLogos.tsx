/** Figma brand mark (multi-color). VS Code: official Wikimedia SVG in `/public/logos/vscode.svg`. */

export function FigmaLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#0acf83"
        d="M50 300c27.614 0 50-22.386 50-50v-50H50c-27.614 0-50 22.386-50 50s22.386 50 50 50z"
      />
      <path
        fill="#a259ff"
        d="M0 150c0-27.614 22.386-50 50-50h50v100H50c-27.614 0-50-22.386-50-50z"
      />
      <path
        fill="#f24e1e"
        d="M0 50C0 22.386 22.386 0 50 0h50v100H50C22.386 100 0 77.614 0 50z"
      />
      <path
        fill="#ff7262"
        d="M100 0h50c27.614 0 50 22.386 50 50s-22.386 50-50 50h-50V0z"
      />
      <path
        fill="#1abcfe"
        d="M200 150c0 27.614-22.386 50-50 50s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50z"
      />
    </svg>
  );
}

export function VSCodeLogo({ className }: { className?: string }) {
  return (
    <img
      src="/logos/vscode.svg"
      alt=""
      width={100}
      height={100}
      decoding="async"
      className={`object-contain ${className ?? ''}`}
    />
  );
}

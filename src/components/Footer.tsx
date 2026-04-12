import React from 'react';
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="snap-none border-t border-white/10 bg-[#0a0a0a] py-6 text-center">
      <p className="text-xs font-serif text-white/40 italic">
        Copyright @{currentYear} Designed by Ngawang Samten Chophel
      </p>
    </footer>);

}
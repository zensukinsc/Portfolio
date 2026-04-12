import { useRef, useState } from 'react';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeDegrees(deg: number): number {
  const x = deg % 360;
  return x < 0 ? x + 360 : x;
}

type LaptopFrameProps = {
  children: React.ReactNode;
  /**
   * When false, no drag-to-spin; pointer events pass through for parent links (e.g. Latest works cards).
   * @default true
   */
  interactive?: boolean;
};

/**
 * Laptop shell: hold + drag spins on Y; vertical motion tilts X (clamped).
 * Reused for portfolio cards and case-study gallery.
 */
export function LaptopFrame({ children, interactive = true }: LaptopFrameProps) {
  const [rotation, setRotation] = useState({ x: -6, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (!lastPointer.current) return;
    const prev = lastPointer.current;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    setRotation((r) => ({
      x: clamp(r.x - dy * 0.42, -82, 82),
      y: r.y + dx * 0.42,
    }));
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (lastPointer.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
    lastPointer.current = null;
    setDragging(false);
    setRotation((r) => ({
      x: clamp(r.x, -82, 82),
      y: normalizeDegrees(r.y),
    }));
  };

  return (
    <div
      className={`w-full ${interactive ? 'select-none [touch-action:none]' : 'pointer-events-none'}`}
      style={{ perspective: 'min(1200px, 92vw)' }}
    >
      <div
        title={
          interactive
            ? 'Hold and drag to spin 360° · drag up/down to tilt'
            : undefined
        }
        onPointerDown={interactive ? handlePointerDown : undefined}
        onPointerMove={interactive ? handlePointerMove : undefined}
        onPointerUp={interactive ? handlePointerEnd : undefined}
        onPointerCancel={interactive ? handlePointerEnd : undefined}
        onLostPointerCapture={
          interactive
            ? () => {
                lastPointer.current = null;
                setDragging(false);
                setRotation((r) => ({
                  x: clamp(r.x, -82, 82),
                  y: normalizeDegrees(r.y),
                }));
              }
            : undefined
        }
        className={`group/laptop w-full origin-center drop-shadow-[0_28px_56px_-20px_rgba(0,0,0,0.9)] will-change-transform ${
          interactive
            ? `cursor-grab active:cursor-grabbing ${dragging ? 'cursor-grabbing' : ''}`
            : 'pointer-events-none'
        }`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: dragging ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          className={`relative z-[1] mx-auto w-full rounded-[clamp(0.7rem,1.8vw,1rem)] rounded-b-[clamp(0.38rem,1vw,0.5rem)] border border-white/[0.14] bg-gradient-to-b from-zinc-500/90 via-zinc-800 to-zinc-950 p-[clamp(0.32rem,0.9vw,0.48rem)] pb-[clamp(0.38rem,1vw,0.52rem)] shadow-[inset_0_1px_0_rgba(255,255,255,0.11)] ${!interactive ? 'pointer-events-none' : ''}`}
        >
          <div className="pointer-events-none absolute inset-x-4 top-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="mb-1 flex justify-center md:mb-1.5">
            <div className="h-1 w-2 rounded-full bg-black/60 ring-1 ring-white/12" />
          </div>
          <div
            className={`relative overflow-hidden rounded-[clamp(0.18rem,0.5vw,0.3rem)] bg-black ring-1 ring-black/80 md:rounded-md ${!interactive ? 'pointer-events-none' : ''}`}
          >
            {children}
          </div>
        </div>
        <div
          aria-hidden
          className={`relative z-0 mx-auto h-1.5 w-[93%] -translate-y-px border-x border-b border-white/[0.07] bg-gradient-to-b from-zinc-800 to-zinc-950 md:h-2 ${!interactive ? 'pointer-events-none' : ''}`}
        />
        <div
          aria-hidden
          className={`relative mx-auto w-[min(100%,calc(100%+1.1rem))] -mt-px ${!interactive ? 'pointer-events-none' : ''}`}
        >
          <div className="h-[clamp(0.55rem,1.4vw,0.85rem)] rounded-b-[clamp(0.55rem,1.6vw,0.85rem)] border border-t-0 border-white/[0.06] bg-gradient-to-b from-zinc-800 via-zinc-950 to-[#070707] shadow-[0_14px_32px_-8px_rgba(0,0,0,0.7)]" />
          <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />
        </div>
      </div>
    </div>
  );
}

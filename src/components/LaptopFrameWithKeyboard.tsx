import { useRef, useState, type ReactNode } from 'react';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeDegrees(deg: number): number {
  const x = deg % 360;
  return x < 0 ? x + 360 : x;
}

function KeyCap({ wide = false }: { wide?: boolean }) {
  return (
    <div
      className={`h-[5px] min-w-0 rounded-[2px] border border-black/55 bg-gradient-to-b from-zinc-500/85 to-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] md:h-[7px] ${wide ? 'flex-[2.2]' : 'flex-1'}`}
      aria-hidden
    />
  );
}

function KeyRow({
  keys,
  wideAt,
}: {
  keys: number;
  /** index (0-based) of key that spans wider (e.g. space bar) */
  wideAt?: number;
}) {
  return (
    <div className="flex w-full gap-[3px] md:gap-1">
      {Array.from({ length: keys }, (_, i) => (
        <KeyCap key={i} wide={wideAt === i} />
      ))}
    </div>
  );
}

/**
 * Laptop with lid + screen and a **keyboard deck** (key rows + trackpad).
 * Same drag-to-tilt interaction as {@link LaptopFrame}.
 */
export function LaptopFrameWithKeyboard({
  children,
}: {
  children: ReactNode;
}) {
  const [rotation, setRotation] = useState({ x: -8, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
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
      className="w-full select-none [touch-action:none]"
      style={{ perspective: 'min(1200px, 92vw)' }}
    >
      <div
        title="Hold and drag to spin 360° · drag up/down to tilt"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={() => {
          lastPointer.current = null;
          setDragging(false);
          setRotation((r) => ({
            x: clamp(r.x, -82, 82),
            y: normalizeDegrees(r.y),
          }));
        }}
        className={`group/laptop w-full origin-center cursor-grab drop-shadow-[0_32px_64px_-24px_rgba(0,0,0,0.92)] will-change-transform active:cursor-grabbing ${dragging ? 'cursor-grabbing' : ''}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: dragging ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Lid + display */}
        <div className="relative z-[2] mx-auto w-full rounded-[clamp(0.7rem,1.8vw,1rem)] rounded-b-[clamp(0.35rem,0.9vw,0.45rem)] border border-white/[0.14] bg-gradient-to-b from-zinc-400/95 via-zinc-700 to-zinc-900 p-[clamp(0.32rem,0.9vw,0.48rem)] pb-[clamp(0.34rem,0.95vw,0.5rem)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
          <div className="pointer-events-none absolute inset-x-4 top-1 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="mb-1 flex justify-center md:mb-1.5">
            <div className="h-1 w-2 rounded-full bg-black/65 ring-1 ring-white/15" />
          </div>
          <div className="relative overflow-hidden rounded-[clamp(0.18rem,0.5vw,0.3rem)] bg-black ring-1 ring-black/85 md:rounded-md">
            {children}
          </div>
        </div>

        {/* Hinge */}
        <div
          aria-hidden
          className="relative z-[1] mx-auto h-1 w-[96%] -translate-y-px bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:h-1.5"
        />

        {/* Keyboard deck */}
        <div
          aria-hidden
          className="relative z-0 mx-auto w-[min(104%,calc(100%+1.25rem))] -mt-px rounded-b-[clamp(0.65rem,1.6vw,1rem)] border border-t-0 border-white/[0.08] bg-gradient-to-b from-zinc-700/95 via-zinc-900 to-[#080808] px-[clamp(0.5rem,2vw,1rem)] pb-[clamp(0.45rem,1.4vw,0.75rem)] pt-[clamp(0.35rem,1.2vw,0.55rem)] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] md:px-4 md:pb-3 md:pt-2"
        >
          <div className="mx-auto flex max-w-[96%] flex-col gap-[4px] md:max-w-[94%] md:gap-1.5">
            <KeyRow keys={13} />
            <KeyRow keys={13} />
            <KeyRow keys={12} wideAt={5} />
            <KeyRow keys={11} wideAt={4} />
          </div>
          <div className="mx-auto mt-[clamp(0.35rem,1.2vw,0.55rem)] h-[clamp(2.25rem,6vw,3rem)] w-[38%] min-w-[5.5rem] rounded-lg border border-white/[0.07] bg-gradient-to-b from-zinc-950/90 to-black/90 shadow-[inset_0_2px_8px_rgba(0,0,0,0.65),0_1px_0_rgba(255,255,255,0.04)] md:mt-3 md:rounded-xl" />
          <div className="pointer-events-none absolute inset-x-10 bottom-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent md:inset-x-14" />
        </div>
      </div>
    </div>
  );
}

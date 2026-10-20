import { useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { m, useReducedMotion, useSpring } from 'framer-motion';

/* Small, shared touches of personality: a tilt that leans toward the cursor,
   a soft glow that follows it, and a few hand-placed stickers. All are
   decorative, mouse-only where they respond to the pointer, and stand down
   under prefers-reduced-motion. */

/* --------------------------------- Tilt ---------------------------------- */

export function Tilt({
  children,
  className = '',
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 170, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 170, damping: 18 });

  // Also writes --mx/--my so children can place a spotlight under the cursor.
  const lean = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    event.currentTarget.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    if (reduceMotion) return;
    rotateY.set((x - 0.5) * max * 2);
    rotateX.set(-(y - 0.5) * max * 2);
  };

  const settle = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <m.div className={className} style={{ rotateX, rotateY, transformPerspective: 900 }} onPointerMove={lean} onPointerLeave={settle}>
      {children}
    </m.div>
  );
}

/* ------------------------------ Cursor glow ------------------------------ */

// A warm, low-contrast light that trails the mouse. Multiply blending keeps it
// a tint on cream and nearly invisible on the dark milestones band.
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reduce.matches) return;

    const node = ref.current;
    if (!node) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let frame = 0;

    const tick = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      node.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      tx = event.clientX;
      ty = event.clientY;
      node.dataset.on = '';
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => delete node.dataset.on;

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

/* -------------------------------- Stickers ------------------------------- */

type StickerKind = 'star' | 'sparkle' | 'note' | 'heart-note';

const stickerArt: Record<StickerKind, ReactNode> = {
  star: <path d="M20 3 L24.5 14.5 L37 15.5 L27.5 23.5 L30.5 36 L20 29.5 L9.5 36 L12.5 23.5 L3 15.5 L15.5 14.5 Z" />,
  sparkle: <path d="M20 2 C21.5 13 27 18.5 38 20 C27 21.5 21.5 27 20 38 C18.5 27 13 21.5 2 20 C13 18.5 18.5 13 20 2 Z" />,
  note: (
    <>
      <ellipse cx="13" cy="30" rx="7" ry="5.4" transform="rotate(-18 13 30)" />
      <rect x="17.4" y="6" width="3" height="24" rx="1.2" />
      <path d="M18.6 6 C25 8 30 10 33 16 C30 13.5 25 12.5 19.5 12 Z" />
    </>
  ),
  'heart-note': (
    <>
      <ellipse cx="10" cy="31" rx="6" ry="4.6" transform="rotate(-18 10 31)" />
      <ellipse cx="29" cy="27" rx="6" ry="4.6" transform="rotate(-18 29 27)" />
      <path d="M13.6 9 L33 4 L33 27 L30.4 27 L30.4 10 L16.2 13.6 L16.2 31 L13.6 31 Z" />
    </>
  ),
};

export function Sticker({
  kind,
  className = '',
  tone = '--coral-deep',
  rotate = 0,
  delay = 0,
  still = false,
  inline = false,
}: {
  kind: StickerKind;
  className?: string;
  tone?: string;
  rotate?: number;
  delay?: number;
  still?: boolean;
  // Inline stickers sit in the text flow, so they can never cover the words beside them.
  inline?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`sticker ${still ? 'sticker-still' : ''} pointer-events-none ${inline ? 'relative inline-block align-top' : 'absolute block'} ${className}`}
      style={{ '--rot': `${rotate}deg`, animationDelay: `${delay}ms` } as CSSProperties}
    >
      <svg viewBox="0 0 40 40" className="h-full w-full" style={{ fill: `hsl(var(${tone}))` }}>
        {stickerArt[kind]}
      </svg>
    </span>
  );
}

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { m } from 'framer-motion';
import { enter } from '@/lib/motion';

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/* ------------------------------ Illustrations ----------------------------- */

// Four dancers step through a staggered canon, like a group learning an eight-count.
const dancers = [
  { x: 62, tone: '--coral-deep', dx: '-10px', r: '-8deg' },
  { x: 102, tone: '--cocoa', dx: '8px', r: '7deg' },
  { x: 142, tone: '--mint-deep', dx: '-8px', r: '-6deg' },
  { x: 182, tone: '--lavender-deep', dx: '10px', r: '8deg' },
];

function DanceArt() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <text x="120" y="28" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="3" fill="hsl(var(--cocoa) / .4)">
        5 · 6 · 7 · 8
      </text>
      <line x1="24" x2="216" y1="118" y2="118" stroke="hsl(var(--cocoa) / .2)" strokeWidth="1.5" />
      {dancers.map((dancer, i) => (
        <g key={dancer.x}>
          <ellipse cx={dancer.x} cy="119" rx="11" ry="2.5" fill="hsl(var(--cocoa) / .12)" />
          <g
            className="dancer"
            style={{ '--dx': dancer.dx, '--r': dancer.r, animationDelay: `${i * 110}ms`, fill: `hsl(var(${dancer.tone}))` } as CSSProperties}
          >
            <circle cx={dancer.x} cy="66" r="8" />
            <rect x={dancer.x - 8} y="78" width="16" height="38" rx="8" />
          </g>
        </g>
      ))}
    </svg>
  );
}

// A small keyboard: while the card is active, a short phrase is played one key at a time.
const whiteKeys = range(10);
const blackKeys = [0, 1, 3, 4, 5, 7, 8]; // sits after these white keys, like C D · F G A · C D
const phrase = [2, 4, 5, 7, 5]; // white keys pressed in order; each gets its own beat

function PianoArt() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <rect x="14" y="36" width="212" height="94" rx="7" fill="hsl(var(--cocoa) / .92)" />
      <rect x="20" y="46" width="200" height="3" rx="1.5" fill="hsl(var(--coral) / .8)" />
      {whiteKeys.map((k) => {
        const beat = phrase.indexOf(k);
        return (
          <rect
            key={k}
            x={20 + k * 20}
            y="52"
            width="19"
            height="70"
            rx="2.5"
            fill="hsl(var(--paper))"
            className={beat >= 0 ? 'piano-key' : undefined}
            style={beat >= 0 ? { animationDelay: `${beat * 300}ms` } : undefined}
          />
        );
      })}
      {blackKeys.map((k) => (
        <rect key={k} x={20 + k * 20 + 14} y="52" width="12" height="42" rx="2" fill="hsl(var(--cocoa))" />
      ))}
      {['♪', '♩', '♫'].map((note, i) => (
        <text key={note} x={70 + i * 46} y="28" fontSize="15" fill="hsl(var(--coral-deep))" className="float-note" style={{ animationDelay: `${i * 300 + 100}ms` }}>
          {note}
        </text>
      ))}
    </svg>
  );
}

const waveBase = range(32).map((i) => 0.18 + 0.7 * Math.pow(Math.sin((Math.PI * (i + 0.5)) / 32), 1.6) * (0.6 + 0.4 * Math.abs(Math.sin(i * 0.8))));

// A voice waveform: it breathes while active and swells under a mouse cursor.
function SingArt() {
  const barsRef = useRef<HTMLSpanElement[]>([]);

  const follow = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    barsRef.current.forEach((bar, i) => {
      const distance = i / 31 - ratio;
      bar.style.setProperty('--s', Math.min(1, waveBase[i] * (1 + 0.8 * Math.exp(-(distance * distance) / 0.01))).toFixed(3));
    });
  };

  const reset = () => barsRef.current.forEach((bar, i) => bar.style.setProperty('--s', waveBase[i].toFixed(3)));

  return (
    <div className="flex h-full items-center gap-[3px] px-[9%]" onPointerMove={follow} onPointerLeave={reset} aria-hidden="true">
      {waveBase.map((base, i) => (
        <span
          key={i}
          ref={(node) => {
            if (node) barsRef.current[i] = node;
          }}
          className="sing-bar h-[62%] flex-1 rounded-full"
          style={{ '--s': base.toFixed(3), '--i': i, background: `hsl(var(${i % 4 === 1 ? '--coral-deep' : '--lavender-deep'}) / ${0.55 + base * 0.45})` } as CSSProperties}
        />
      ))}
    </div>
  );
}

/* ---------------------------------- Cards --------------------------------- */

const hobbies: { number: string; title: string; theme: string; line: string; tint: string; art: ReactNode }[] = [
  {
    number: '01',
    title: 'Dance',
    theme: 'Energy & Movement',
    line: 'Learning K-pop choreography, one eight-count at a time.',
    tint: 'hsl(var(--peach))',
    art: <DanceArt />,
  },
  {
    number: '02',
    title: 'Piano',
    theme: 'Learning & Melody',
    line: 'Learning piano one note at a time, and enjoying the rhythm, patience, and beauty in the process.',
    tint: 'hsl(var(--mint) / .55)',
    art: <PianoArt />,
  },
  {
    number: '03',
    title: 'Sing',
    theme: 'Joy & Expression',
    line: 'Singing along to my favorite songs, just for the joy of it.',
    tint: 'hsl(var(--lavender) / .45)',
    art: <SingArt />,
  },
];

function HobbyCard({ hobby, index }: { hobby: (typeof hobbies)[number]; index: number }) {
  const [active, setActive] = useState(false);
  const lastPointer = useRef('mouse');
  const tapTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(tapTimer.current), []);

  // A tap plays the animation briefly; mouse hover and keyboard focus play it while held.
  const onTap = () => {
    if (lastPointer.current === 'mouse') return;
    setActive(true);
    window.clearTimeout(tapTimer.current);
    tapTimer.current = window.setTimeout(() => setActive(false), 2400);
  };

  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={enter(index * 0.08)}
      tabIndex={0}
      aria-label={`${hobby.title}: ${hobby.theme}. ${hobby.line}`}
      data-active={active || undefined}
      onPointerDown={(event) => (lastPointer.current = event.pointerType)}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setActive(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={onTap}
      className="hobby-card flex flex-col overflow-hidden rounded-[10px] border border-foreground/12 bg-card"
      data-testid={`card-hobby-${hobby.title.toLowerCase()}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: hobby.tint }}>
        {hobby.art}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[10px] text-primary">{hobby.number}</p>
        <h3 className="mt-3 font-display text-3xl leading-none tracking-[-0.03em]">{hobby.title}</h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/55">{hobby.theme}</p>
        <p className="mt-4 text-sm leading-[1.6] text-foreground/68">{hobby.line}</p>
      </div>
    </m.article>
  );
}

export function BeyondTheData() {
  return (
    <section id="beyond" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 pb-28 md:px-10 md:pb-36">
      <div className="reveal grid gap-6 md:grid-cols-[1fr_minmax(0,380px)] md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">08 / beyond the data</p>
          <h2 className="mt-5 text-5xl leading-[.92] tracking-[-0.055em] md:text-7xl">
            There&apos;s more to
            <br />
            <span className="font-display font-normal italic">my rhythm.</span>
          </h2>
        </div>
        <p className="text-[15px] leading-[1.65] text-foreground/68 md:pb-2">
          When I&apos;m not exploring data or building with AI, you&apos;ll probably find me learning K-pop choreography, practicing piano, or singing along to my favorite songs. Music keeps me creative, curious, and always moving.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {hobbies.map((hobby, index) => (
          <HobbyCard key={hobby.title} hobby={hobby} index={index} />
        ))}
      </div>
    </section>
  );
}

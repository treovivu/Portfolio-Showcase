import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { m } from 'framer-motion';
import { ease, enter } from '@/lib/motion';
import { Sticker, Tilt } from '@/components/flourish';

/* -------------------------------- Glyphs --------------------------------- */
// Each card carries one beat of the same idea: a question, its connections,
// and what they add up to. They rest in a finished state and play on hover/focus.

function QuestionGlyph() {
  return (
    <svg viewBox="0 0 160 90" className="h-full w-full" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="52" cy="46" r="22" fill="none" stroke="hsl(var(--coral-deep) / .35)" strokeWidth="1.2" className="think-ripple" style={{ animationDelay: `${i * 420}ms` }} />
      ))}
      <circle cx="52" cy="46" r="22" fill="hsl(var(--paper))" stroke="hsl(var(--coral-deep) / .5)" strokeWidth="1.2" />
      <text x="52" y="57" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="32" fill="hsl(var(--coral-deep))">?</text>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={96 + i * 14} cy="46" r="3.2" fill="hsl(var(--cocoa) / .55)" className="think-blink" style={{ animationDelay: `${i * 180}ms` }} />
      ))}
    </svg>
  );
}

const nodes = [
  [22, 58], [48, 24], [70, 62], [96, 34], [118, 70], [140, 26],
] as const;
const edges = [[0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 5]] as const;

function ConnectionsGlyph() {
  return (
    <svg viewBox="0 0 160 90" className="h-full w-full" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="hsl(var(--mint-deep) / .55)"
          strokeWidth="1.3"
          pathLength={1}
          className="think-edge"
          style={{ animationDelay: `${i * 90}ms` }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 3 ? 5.5 : 4} fill={i === 3 ? 'hsl(var(--mint-deep))' : 'hsl(var(--paper))'} stroke="hsl(var(--mint-deep))" strokeWidth="1.4" className="think-node" style={{ animationDelay: `${i * 90 + 200}ms` }} />
      ))}
    </svg>
  );
}

const gathering = [
  { x: 30, y: 26, dx: '22px', dy: '12px' },
  { x: 26, y: 66, dx: '24px', dy: '-12px' },
  { x: 134, y: 24, dx: '-22px', dy: '14px' },
  { x: 136, y: 64, dx: '-24px', dy: '-10px' },
];

function MeaningGlyph() {
  return (
    <svg viewBox="0 0 160 90" className="h-full w-full" aria-hidden="true">
      {gathering.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r="3.4" fill="hsl(var(--lavender-deep) / .7)" className="think-gather" style={{ '--dx': dot.dx, '--dy': dot.dy, animationDelay: `${i * 70}ms` } as CSSProperties} />
      ))}
      <g className="think-spark">
        <path d="M80 18 C82 36 88 42 106 45 C88 48 82 54 80 72 C78 54 72 48 54 45 C72 42 78 36 80 18 Z" fill="hsl(var(--lavender-deep))" />
        <circle cx="80" cy="45" r="4" fill="hsl(var(--paper))" />
      </g>
      <path d="M114 20 C114.6 24.5 116 25.8 120 26.5 C116 27.2 114.6 28.6 114 33 C113.4 28.6 112 27.2 108 26.5 C112 25.8 113.4 24.5 114 20 Z" fill="hsl(var(--coral-deep) / .8)" className="think-twinkle" />
    </svg>
  );
}

/* --------------------------------- Cards --------------------------------- */

const steps: { number: string; stage: string; title: string; body: string; tint: string; tone: string; glyph: ReactNode }[] = [
  {
    number: '01',
    stage: 'Question',
    title: 'Stay Curious',
    body: 'Every interesting idea starts with a question. I like exploring the details, challenging assumptions, and understanding the bigger picture.',
    tint: 'hsl(var(--peach) / .75)',
    tone: '--coral-deep',
    glyph: <QuestionGlyph />,
  },
  {
    number: '02',
    stage: 'Connections',
    title: 'Find Connections',
    body: 'I enjoy looking for patterns, organizing information, and connecting ideas across data, technology, and everyday experiences.',
    tint: 'hsl(var(--mint) / .45)',
    tone: '--mint-deep',
    glyph: <ConnectionsGlyph />,
  },
  {
    number: '03',
    stage: 'Meaning',
    title: 'Make It Matter',
    body: 'For me, the most exciting part is making what I learn useful — whether that means communicating an insight clearly or building something that helps people.',
    tint: 'hsl(var(--lavender) / .4)',
    tone: '--lavender-deep',
    glyph: <MeaningGlyph />,
  },
];

function ThinkCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const [active, setActive] = useState(false);
  const lastPointer = useRef('mouse');
  const tapTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(tapTimer.current), []);

  // Same contract as the hobby cards: hover or focus plays while held, a tap plays briefly.
  const onTap = () => {
    if (lastPointer.current === 'mouse') return;
    setActive(true);
    window.clearTimeout(tapTimer.current);
    tapTimer.current = window.setTimeout(() => setActive(false), 2200);
  };

  return (
    <m.div
      className="h-full"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={enter(0.12 + index * 0.14)}
    >
      <Tilt className="h-full" max={4}>
        <article
          tabIndex={0}
          aria-labelledby={`think-${step.number}`}
          data-active={active || undefined}
          onPointerDown={(event) => (lastPointer.current = event.pointerType)}
          onPointerEnter={(event) => event.pointerType === 'mouse' && setActive(true)}
          onPointerLeave={(event) => event.pointerType === 'mouse' && setActive(false)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onClick={onTap}
          className="think-card relative flex h-full flex-col overflow-hidden rounded-[10px] border border-foreground/12 bg-card"
          data-testid={`card-think-${step.number}`}
        >
          <div className="relative h-[118px] overflow-hidden" style={{ background: step.tint }}>
            {step.glyph}
            <span className="absolute left-5 top-4 font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: `hsl(var(${step.tone}))` }}>
              {step.stage}
            </span>
          </div>
          <div className="relative flex flex-1 flex-col p-6 md:p-7">
            <p className="font-mono text-[10px] text-primary">{step.number}</p>
            <h3 id={`think-${step.number}`} className="mt-3 font-display text-3xl leading-none tracking-[-0.03em]">
              {step.title}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.65] text-foreground/68">{step.body}</p>
          </div>
        </article>
      </Tilt>
    </m.div>
  );
}

/* -------------------------------- Section -------------------------------- */

export function HowIThink() {
  return (
    <section id="approach" className="relative overflow-hidden border-y border-foreground/15 bg-secondary/20 scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-10 md:py-32">
        <div className="reveal relative grid gap-6 md:grid-cols-[1fr_minmax(0,360px)] md:items-end">
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">03 / how I think</p>
            <h2 className="mt-5 max-w-[660px] text-5xl leading-[.9] tracking-[-0.055em] md:text-8xl">
              It starts with
              <br />
              <span className="font-display font-normal italic">curiosity.</span>
              <Sticker kind="sparkle" inline className="ml-2 mt-1 h-6 w-6 md:h-9 md:w-9" tone="--lavender-deep" rotate={12} />
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-foreground/68 md:pb-2">
            I enjoy asking questions, discovering connections, and exploring how information can become something meaningful.
          </p>
        </div>

        {/* The thread: question → connections → meaning, keeping time across the three cards. */}
        <div className="relative mt-14 hidden grid-cols-3 md:grid" aria-hidden="true">
          <m.span
            className="absolute left-[16.66%] right-[16.66%] top-[7px] h-px origin-left bg-foreground/25"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 1.4, ease: ease.inOut, delay: 0.2 }}
          />
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center gap-3">
              <span className="think-beat relative block h-[15px] w-[15px] rounded-full border-2 border-background" style={{ background: `hsl(var(${step.tone}))`, animationDelay: `${i * 0.8}s` } as CSSProperties} />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/50">
                {step.stage}
                {i < steps.length - 1 && <span className="ml-2 text-primary">→</span>}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:mt-6 md:grid-cols-3 md:gap-5">
          {steps.map((step, index) => (
            <Fragment key={step.number}>
              <ThinkCard step={step} index={index} />
              {index < steps.length - 1 && (
                <span className="flex h-10 items-center justify-center md:hidden" aria-hidden="true">
                  <span className="h-full w-px bg-foreground/25" />
                </span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

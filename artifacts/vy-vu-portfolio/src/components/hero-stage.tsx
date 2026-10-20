import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring, type TargetAndTransition } from 'framer-motion';
import { ArrowDownRight, Circle } from 'lucide-react';
import { enter, spring } from '@/lib/motion';
import { external, links } from '@/lib/site';

type Flourish = 'move' | 'create' | 'build';

// Fixed "cut-out" angles so the create flourish feels hand-placed, not random on every replay.
const scrapAngles = [-9, 6, -4, 8, -6, 5];

const flourish: Record<Flourish, (index: number) => { initial?: TargetAndTransition; animate: TargetAndTransition }> = {
  // A small choreography wave: each letter steps up and sways in sequence.
  move: (i) => ({
    animate: {
      y: ['0em', '-0.16em', '0.03em', '0em'],
      rotate: [0, i % 2 ? 7 : -7, 0, 0],
      transition: { duration: 0.6, delay: i * 0.06, ease: 'easeOut' },
    },
  }),
  // Letters lift like scrapbook cut-outs, then settle back onto the page.
  create: (i) => ({
    animate: {
      rotate: [0, scrapAngles[i % scrapAngles.length], 0],
      y: ['0em', '-0.06em', '0em'],
      scale: [1, 1.08, 1],
      transition: { duration: 0.7, delay: i * 0.04, ease: 'easeInOut' },
    },
  }),
  // Blocks drop in from above and stack, one at a time.
  build: (i) => ({
    initial: { y: '-0.55em', opacity: 0 },
    animate: { y: '0em', opacity: 1, transition: { ...spring.beat, delay: i * 0.07 } },
  }),
};

function KineticWord({
  text,
  kind,
  beat,
  onReplay,
  className,
  after,
}: {
  text: string;
  kind: Flourish;
  beat: number;
  onReplay: () => void;
  className: string;
  after?: ReactNode;
}) {
  return (
    // nowrap keeps trailing punctuation on the same line as the word.
    <span className="whitespace-nowrap">
      <span
        className={`kinetic-word relative inline-block ${className}`}
        onPointerEnter={(event) => event.pointerType === 'mouse' && onReplay()}
        onClick={onReplay}
      >
        {[...text].map((letter, i) => {
          if (beat === 0) return <span key={i} className="inline-block">{letter}</span>;
          const { initial, animate } = flourish[kind](i);
          return (
            <m.span key={`${beat}-${i}`} className="inline-block" initial={initial} animate={animate}>
              {letter}
            </m.span>
          );
        })}
        {kind === 'create' && (
          <m.svg
            key={`underline-${beat}`}
            viewBox="0 0 200 16"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -bottom-[0.06em] left-0 h-[0.16em] w-full origin-left text-[hsl(var(--lilac))]"
            initial={{ scaleX: beat === 0 ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
          >
            <path d="M2 10 C 30 2, 50 15, 80 8 S 140 2, 198 9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </m.svg>
        )}
      </span>
      {after}
    </span>
  );
}

const barCount = 28;
const barBase = Array.from({ length: barCount }, (_, i) => 0.28 + 0.6 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37)));
const barTone = ['--rose', '--lilac', '--jade'];

function BeatStrip() {
  const barsRef = useRef<HTMLSpanElement[]>([]);
  const [wave, setWave] = useState(0);

  // The bars swell under the cursor, like an equalizer following the spotlight.
  const follow = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    barsRef.current.forEach((bar, i) => {
      const distance = i / (barCount - 1) - ratio;
      const lift = 1 + 1.1 * Math.exp(-(distance * distance) / 0.008);
      bar.style.setProperty('--s', Math.min(1, barBase[i] * lift).toFixed(3));
    });
  };

  const reset = () => barsRef.current.forEach((bar, i) => bar.style.setProperty('--s', barBase[i].toFixed(3)));

  return (
    <div
      className="beat-strip flex h-14 items-end gap-[3px] md:h-16"
      data-wave={wave === 0 ? undefined : wave % 2}
      onPointerMove={follow}
      onPointerLeave={reset}
      onClick={() => setWave((count) => count + 1)}
      aria-hidden="true"
    >
      {barBase.map((base, i) => (
        <span
          key={i}
          ref={(node) => {
            if (node) barsRef.current[i] = node;
          }}
          className="beat-bar h-full flex-1 rounded-full"
          style={{ '--s': base.toFixed(3), '--i': i, background: `hsl(var(${barTone[i % 3]}))` } as CSSProperties}
        />
      ))}
    </div>
  );
}

export function HeroStage() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [beats, setBeats] = useState<Record<Flourish, number>>({ move: 0, create: 0, build: 0 });
  const lastReplay = useRef<Record<Flourish, number>>({ move: 0, create: 0, build: 0 });
  const [canSpotlight, setCanSpotlight] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotX = useSpring(pointerX, { stiffness: 150, damping: 24, mass: 0.6 });
  const spotY = useSpring(pointerY, { stiffness: 150, damping: 24, mass: 0.6 });
  const spotOpacity = useSpring(0, { stiffness: 120, damping: 26 });

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanSpotlight(query.matches && !reduceMotion);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [reduceMotion]);

  const replay = (kind: Flourish) => {
    const now = performance.now();
    if (now - lastReplay.current[kind] < 750) return;
    lastReplay.current[kind] = now;
    setBeats((current) => ({ ...current, [kind]: current[kind] + 1 }));
  };

  // Play each word's flourish once, in time, right after the entrance settles.
  useEffect(() => {
    if (reduceMotion) return;
    const timers = (['move', 'create', 'build'] as const).map((kind, i) => window.setTimeout(() => replay(kind), 1050 + i * 380));
    return () => timers.forEach(window.clearTimeout);
  }, [reduceMotion]);

  const trackSpotlight = (event: ReactPointerEvent<HTMLElement>, jump = false) => {
    if (!canSpotlight || event.pointerType !== 'mouse' || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (jump) {
      spotX.jump(x);
      spotY.jump(y);
    }
    pointerX.set(x);
    pointerY.set(y);
    spotOpacity.set(1);
  };

  const line = (delay: number) => ({ initial: { opacity: 0, y: '0.35em' }, animate: { opacity: 1, y: '0em' }, transition: enter(delay) });
  const rise = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: enter(delay) });

  return (
    <section
      id="top"
      ref={sectionRef}
      className="hero-stage relative overflow-hidden"
      onPointerEnter={(event) => trackSpotlight(event, true)}
      onPointerMove={(event) => trackSpotlight(event)}
      onPointerLeave={() => spotOpacity.set(0)}
    >
      {canSpotlight && (
        <m.div
          aria-hidden="true"
          className="hero-spotlight pointer-events-none absolute left-0 top-0 -ml-[360px] -mt-[360px] h-[720px] w-[720px] rounded-full"
          style={{ x: spotX, y: spotY, opacity: spotOpacity }}
        />
      )}

      <div className="relative mx-auto flex min-h-[760px] max-w-[1280px] items-center px-5 pb-20 pt-28 md:px-10 md:pt-32">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-10">
          <div>
            <m.div {...rise(0)} className="mb-7 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="font-viet text-2xl italic text-primary" lang="vi">Xin chào</span>
              <span className="text-sm text-foreground/60">(hello) — I&apos;m Vy Vu.</span>
              <span className="basis-full font-mono text-[10px] uppercase leading-[1.7] tracking-[0.18em] text-foreground/55">
                <span className="mr-3 inline-block h-2 w-2 bg-primary" />
                <span className="whitespace-nowrap">Computer information systems student</span> <span className="text-primary">·</span>{' '}
                <span className="whitespace-nowrap">Atlanta, GA</span>
              </span>
            </m.div>

            <h1 className="max-w-[820px] text-[clamp(2.9rem,6.4vw,6rem)] leading-[.92] tracking-[-0.06em]">
              <span className="sr-only">Made to move, create, and build.</span>
              <span aria-hidden="true">
                <m.span {...line(0.1)} className="block">
                  Made to{' '}
                  <KineticWord text="move" kind="move" beat={beats.move} onReplay={() => replay('move')} className="font-display pr-[0.06em] text-[1.08em] font-normal italic text-primary" after="," />
                </m.span>
                <m.span {...line(0.2)} className="block">
                  <KineticWord text="create" kind="create" beat={beats.create} onReplay={() => replay('create')} className="font-light italic text-[hsl(var(--lilac))]" after="," /> and
                </m.span>
                <m.span {...line(0.3)} className="block">
                  <KineticWord text="build" kind="build" beat={beats.build} onReplay={() => replay('build')} className="font-semibold text-[hsl(var(--jade))]" after={<span className="text-primary">.</span>} />
                </m.span>
              </span>
            </h1>

            <m.p {...rise(0.45)} className="mt-8 max-w-[560px] text-lg leading-[1.55] text-foreground/70 md:text-xl">
              Computer Information Systems student focused on AI Analytics and Application Development, working toward AI product engineering.
              I&apos;m interested in how data can uncover patterns, explain behavior, and support better decisions.
            </m.p>

            <m.div {...rise(0.55)} className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-foreground px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.13em] text-background transition-colors hover:bg-primary"
                data-testid="link-hero-work"
              >
                View my work <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
              <a href="#writing" className="signal-line font-mono text-[11px] uppercase tracking-[0.13em]" data-testid="link-hero-notes">
                Read ViVu Notes
              </a>
              <a
                href={links.linkedin}
                {...external}
                className="font-mono text-[11px] uppercase tracking-[0.13em] text-foreground/60 transition-colors hover:text-primary"
                data-testid="link-hero-linkedin"
              >
                Connect on LinkedIn
              </a>
            </m.div>
          </div>

          <m.div {...rise(0.3)} className="relative mx-auto w-full max-w-[540px] lg:ml-auto">
            <div className="absolute -left-7 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45 [writing-mode:vertical-rl]">
              curiosity / analysis / making
            </div>
            <span aria-hidden="true" className="scrap-tape absolute -top-3 left-10 z-10 h-7 w-24 -rotate-[5deg]" />
            <span aria-hidden="true" className="scrap-tape absolute -right-4 top-16 z-10 h-6 w-20 rotate-[38deg]" />

            <div className="relative overflow-hidden border border-foreground/15 bg-[hsl(var(--ink))] p-6 text-[hsl(var(--cream))] shadow-[14px_14px_0_hsl(var(--primary)/.18)] md:p-9">
              <div className="stage-floor absolute inset-0" aria-hidden="true" />
              <div className="relative flex aspect-[1/1.02] flex-col justify-between">
                <div className="flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--cream)/.6)]">
                  <span>VV / 2026</span>
                  <span className="flex items-center gap-2"><Circle size={7} fill="currentColor" className="text-primary" /> building</span>
                </div>

                <div>
                  <p className="font-viet text-[clamp(4.6rem,13vw,8.6rem)] font-light italic leading-[.9] tracking-[-0.03em]" lang="vi">
                    Nhịp<span className="text-primary">.</span>
                  </p>
                  <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-[hsl(var(--cream)/.5)]">Vietnamese · noun</p>
                  <p className="mt-2 max-w-[320px] text-sm leading-[1.55] text-[hsl(var(--cream)/.75)]">
                    rhythm; the beat that keeps things moving, in dance, in music, and in how I build.
                  </p>
                </div>

                <div>
                  <BeatStrip />
                  <div className="mt-5 flex items-end justify-between gap-6">
                    <p className="max-w-[230px] font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em] text-[hsl(var(--cream)/.58)]">
                      A student portfolio about data, technology, and becoming.
                    </p>
                    <div className="text-right font-mono text-[9px] leading-[1.6] text-[hsl(var(--cream)/.58)]">GSU<br />ATL</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-6 -right-2 rotate-[2deg] border border-foreground/20 bg-background px-4 py-3 shadow-[5px_5px_0_hsl(var(--foreground)/.08)] transition-transform duration-300 hover:rotate-0 md:-right-6"
              data-testid="status-current-focus"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">Currently</p>
              <p className="mt-1 text-sm font-medium">learning by building</p>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

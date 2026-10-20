import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring, type TargetAndTransition } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Circle } from 'lucide-react';
import { enter, spring } from '@/lib/motion';
import { external, links } from '@/lib/site';

type Flourish = 'sway' | 'stack';

const flourish: Record<Flourish, (index: number) => { initial?: TargetAndTransition; animate: TargetAndTransition }> = {
  // A small choreography wave: each letter steps up and sways in sequence.
  sway: (i) => ({
    animate: {
      y: ['0em', '-0.16em', '0.03em', '0em'],
      rotate: [0, i % 2 ? 7 : -7, 0, 0],
      transition: { duration: 0.6, delay: i * 0.06, ease: 'easeOut' },
    },
  }),
  // Letters drop in and stack like bars on a chart.
  stack: (i) => ({
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
      </span>
      {after}
    </span>
  );
}

const barCount = 24;
const barBase = Array.from({ length: barCount }, (_, i) => 0.24 + 0.62 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37)));
const barTone = ['--rose', '--jade', '--lilac'];
const peakIndex = barBase.indexOf(Math.max(...barBase));

// A tiny chart that behaves like an equalizer: bars swell under the cursor and a readout follows.
function RhythmChart() {
  const barsRef = useRef<HTMLSpanElement[]>([]);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const [wave, setWave] = useState(0);

  const showReadout = (index: number) => {
    const readout = readoutRef.current;
    if (!readout) return;
    readout.textContent = `beat ${String(index + 1).padStart(2, '0')} · ${Math.round(barBase[index] * 100)}`;
    readout.style.transform = `translateX(calc(${((index + 0.5) / barCount) * 100}cqw - 50%))`;
    readout.style.opacity = '1';
  };

  const follow = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(0.999, Math.max(0, (event.clientX - rect.left) / rect.width));
    barsRef.current.forEach((bar, i) => {
      const distance = i / (barCount - 1) - ratio;
      const lift = 1 + 0.9 * Math.exp(-(distance * distance) / 0.006);
      bar.style.setProperty('--s', Math.min(1, barBase[i] * lift).toFixed(3));
    });
    showReadout(Math.floor(ratio * barCount));
  };

  const reset = () => {
    barsRef.current.forEach((bar, i) => bar.style.setProperty('--s', barBase[i].toFixed(3)));
    if (readoutRef.current) readoutRef.current.style.opacity = '0';
  };

  return (
    <div aria-hidden="true">
      <div className="relative h-5 [container-type:inline-size]">
        <span
          ref={readoutRef}
          className="absolute left-0 top-0 whitespace-nowrap bg-[hsl(var(--cream))] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[hsl(var(--ink))] opacity-0 transition-opacity duration-150"
        />
      </div>
      <div
        className="beat-strip relative mt-1 flex h-16 cursor-crosshair items-end gap-[3px] border-b border-[hsl(var(--cream)/.3)] md:h-20"
        data-wave={wave === 0 ? undefined : wave % 2}
        onPointerMove={follow}
        onPointerLeave={reset}
        onClick={() => {
          setWave((count) => count + 1);
          showReadout(peakIndex);
        }}
      >
        <span className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-[hsl(var(--cream)/.14)]" />
        {barBase.map((base, i) => (
          <span
            key={i}
            ref={(node) => {
              if (node) barsRef.current[i] = node;
            }}
            className="beat-bar h-full flex-1 rounded-t-[2px]"
            style={{ '--s': base.toFixed(3), '--i': i, background: `hsl(var(${barTone[i % 3]}))` } as CSSProperties}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-[hsl(var(--cream)/.45)]">
        <span>count 1</span>
        <span>fig. 01 — a beat, as data</span>
        <span>8</span>
      </div>
    </div>
  );
}

export function HeroStage() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [beats, setBeats] = useState<Record<Flourish, number>>({ sway: 0, stack: 0 });
  const lastReplay = useRef<Record<Flourish, number>>({ sway: 0, stack: 0 });
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
    const timers = (['sway', 'stack'] as const).map((kind, i) => window.setTimeout(() => replay(kind), 1000 + i * 420));
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
            <m.div {...rise(0)} className="mb-7 flex flex-wrap items-baseline gap-x-3 gap-y-3">
              <span className="font-viet text-2xl italic text-primary" lang="vi">Xin chào</span>
              <span className="text-sm text-foreground/60">(hello) — I&apos;m Vy Vu, a CIS student from Vietnam, based in Atlanta.</span>
              <span className="basis-full">
                <span className="inline-flex items-center gap-2 border border-[hsl(var(--jade)/.45)] bg-[hsl(var(--jade)/.08)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--jade))]" data-testid="text-hero-role">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--jade))]" /> Aspiring Data Analyst
                </span>
              </span>
            </m.div>

            <h1 className="max-w-[820px] text-[clamp(3rem,6.6vw,6.2rem)] leading-[.92] tracking-[-0.06em]">
              <span className="sr-only">Finding the rhythm in data.</span>
              <span aria-hidden="true">
                <m.span {...line(0.1)} className="block">
                  Finding the
                </m.span>
                <m.span {...line(0.2)} className="block">
                  <KineticWord text="rhythm" kind="sway" beat={beats.sway} onReplay={() => replay('sway')} className="font-display pr-[0.06em] text-[1.08em] font-normal italic text-primary" /> in{' '}
                  <KineticWord text="data" kind="stack" beat={beats.stack} onReplay={() => replay('stack')} className="font-semibold text-[hsl(var(--jade))]" after={<span className="text-primary">.</span>} />
                </m.span>
              </span>
            </h1>

            <m.p {...rise(0.4)} className="mt-8 max-w-[580px] text-lg leading-[1.55] text-foreground/70 md:text-xl">
              I&apos;m looking for <span className="text-foreground">Data Analyst and Business Data Analyst internships</span>. I study Computer Information Systems at Georgia State, concentrating in AI Analytics and Application Development, and I like turning messy information into patterns people can act on.
            </m.p>

            <m.ul {...rise(0.48)} className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/50" aria-label="Toolkit">
              <li className="text-primary">Toolkit</li>
              {['SQL', 'Python', 'Excel', 'Data analysis', 'AI-powered apps'].map((tool) => (
                <li key={tool} className="whitespace-nowrap">{tool}</li>
              ))}
            </m.ul>

            <m.div {...rise(0.56)} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-5">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-foreground px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.13em] text-background transition-colors hover:bg-primary"
                data-testid="link-hero-work"
              >
                View my work <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
              <a
                href={links.resume}
                {...external}
                className="inline-flex items-center gap-2 border border-foreground/25 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.13em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                data-testid="link-hero-resume"
              >
                View resume <ArrowUpRight size={14} />
              </a>
              <a
                href={links.linkedin}
                {...external}
                className="signal-line ml-1 font-mono text-[11px] uppercase tracking-[0.13em] text-foreground/70 transition-colors hover:text-primary"
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
                  <p className="font-display text-[clamp(2.6rem,5.2vw,4.2rem)] italic leading-[.95] tracking-[-0.02em]">
                    Every dataset
                    <br />
                    has a rhythm<span className="text-primary">.</span>
                  </p>
                  <p className="mt-5 max-w-[340px] text-sm leading-[1.6] text-[hsl(var(--cream)/.72)]">
                    <span className="font-viet italic text-[hsl(var(--cream))]" lang="vi">Nhịp</span> is Vietnamese for rhythm. I look for it in data, in dance practice, and in music.
                  </p>
                </div>

                <div>
                  <RhythmChart />
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
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">Open to</p>
              <p className="mt-1 text-sm font-medium">Data Analyst internships</p>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

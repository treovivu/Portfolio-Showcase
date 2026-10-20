import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Linkedin, Play } from 'lucide-react';
import portrait from '@assets/vy-vu-portrait-hero.jpg';
import { Monogram } from '@/components/monogram';
import { enter, spring } from '@/lib/motion';
import { external, links } from '@/lib/site';

/* ------------------------------ Album cover ------------------------------ */

function AlbumCover() {
  const reduceMotion = useReducedMotion();
  const tiltX = useSpring(0, { stiffness: 160, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 160, damping: 18 });
  const sheenX = useSpring(0, { stiffness: 120, damping: 20 });
  const sheenY = useSpring(0, { stiffness: 120, damping: 20 });

  // The sleeve leans toward the cursor and a soft sheen follows it, like light on a glossy print.
  const lean = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(x * 9);
    tiltX.set(-y * 9);
    sheenX.set(x * rect.width);
    sheenY.set(y * rect.height);
  };

  const settle = () => {
    tiltX.set(0);
    tiltY.set(0);
    sheenX.set(0);
    sheenY.set(0);
  };

  return (
    <div className="album group relative mx-auto w-full max-w-[540px] pr-[17%]" onPointerMove={lean} onPointerLeave={settle}>
      <div className="vinyl-slot absolute right-0 top-[3%] aspect-square w-[78%]" aria-hidden="true">
        <div className="vinyl vinyl-spin relative h-full w-full rounded-full">
          <div className="absolute inset-[34%] flex items-center justify-center rounded-full bg-[hsl(var(--coral))]">
            <span className="font-mono text-[clamp(6px,1.4vw,9px)] uppercase tracking-[0.18em] text-[hsl(var(--cocoa))]">side a</span>
          </div>
          <div className="absolute inset-[48.5%] rounded-full bg-[hsl(var(--cream))]" />
        </div>
      </div>

      <m.figure
        className="album-sleeve relative aspect-square w-full overflow-hidden bg-[hsl(var(--peach))]"
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
      >
        <span aria-hidden="true" className="absolute right-[-8%] top-[12%] aspect-square w-[64%] rounded-full bg-[hsl(var(--coral)/.75)]" />
        <span aria-hidden="true" className="absolute right-0 top-0 aspect-square w-[16%] rounded-bl-full bg-[hsl(var(--lavender))]" />
        <span aria-hidden="true" className="absolute left-[7%] top-[22%] flex gap-[2.2cqw]">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="block aspect-square w-[2.6cqw] rounded-full bg-[hsl(var(--mint-deep))]" style={{ opacity: 1 - i * 0.2 }} />
          ))}
        </span>

        <div className="absolute bottom-0 right-[7%] h-[74%] w-[50%] overflow-hidden rounded-t-full border-[1.2cqw] border-b-0 border-[hsl(var(--paper))] bg-[hsl(var(--cocoa))]">
          <img
            src={portrait}
            alt="Vy Vu standing outdoors in Atlanta at night"
            className="h-full w-full object-cover object-[50%_24%]"
            fetchPriority="high"
            width={667}
            height={1000}
          />
        </div>

        <div className="absolute left-[6%] top-[6%] flex items-center gap-[2cqw]">
          <Monogram className="h-[8cqw] w-[8cqw]" />
          <span className="font-mono text-[2.3cqw] uppercase tracking-[0.18em] text-[hsl(var(--cocoa)/.75)]">Portfolio</span>
        </div>
        <span className="absolute right-[19%] top-[6.5%] font-mono text-[2.3cqw] uppercase tracking-[0.18em] text-[hsl(var(--cocoa)/.75)]">2026</span>

        <div className="absolute left-[7%] top-[32%] flex aspect-square w-[25cqw] -rotate-[10deg] flex-col items-center justify-center rounded-full bg-[hsl(var(--mint))] text-center text-[hsl(var(--cocoa))] shadow-[0_0.6cqw_0_hsl(var(--cocoa)/.12)]">
          <span className="font-mono text-[1.9cqw] uppercase tracking-[0.16em]">contains</span>
          <span className="mt-[0.8cqw] font-display text-[3.4cqw] italic leading-[1.05]">SQL · Python<br />Excel</span>
        </div>

        <figcaption className="absolute bottom-[6%] left-[6%] max-w-[40cqw]">
          <span className="block font-display text-[11.5cqw] font-normal italic leading-[.9] text-[hsl(var(--cocoa))]">Vy Vu</span>
          <span className="mt-[1.4cqw] block max-w-[40cqw] text-[3.6cqw] font-bold uppercase leading-[1.05] tracking-[0.02em] text-[hsl(var(--coral-deep))]">Aspiring Data Analyst</span>
          <span className="mt-[1.4cqw] block font-mono text-[2.1cqw] uppercase tracking-[0.14em] text-[hsl(var(--cocoa)/.75)]">Data · AI · Creativity</span>
        </figcaption>

        <m.span
          aria-hidden="true"
          className="album-sheen pointer-events-none absolute left-1/2 top-1/2 -ml-[45%] -mt-[45%] aspect-square w-[90%] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ x: sheenX, y: sheenY }}
        />
      </m.figure>
    </div>
  );
}

/* ------------------------------ Now playing ------------------------------ */

const BAR_COUNT = 56;
const bars = Array.from({ length: BAR_COUNT }, (_, i) => 0.22 + 0.7 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21 + 1)));

function NowPlaying({ hot }: { hot: boolean }) {
  const barsRef = useRef<HTMLSpanElement[]>([]);
  const { scrollYProgress } = useScroll();
  // The playhead tracks how far down the page the visitor is.
  const playhead = useTransform(scrollYProgress, (value) => `${value * 100}%`);

  const follow = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    barsRef.current.forEach((bar, i) => {
      const distance = i / (BAR_COUNT - 1) - ratio;
      bar.style.setProperty('--s', Math.min(1, bars[i] * (1 + 0.9 * Math.exp(-(distance * distance) / 0.004))).toFixed(3));
    });
  };

  const reset = () => barsRef.current.forEach((bar, i) => bar.style.setProperty('--s', bars[i].toFixed(3)));

  return (
    <div className="now-playing mt-9 max-w-[560px] rounded-2xl border border-foreground/12 bg-[hsl(var(--paper)/.7)] px-4 py-3.5" data-hot={hot || undefined} aria-hidden="true">
      <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.16em]">
        <span className="flex items-center gap-2 text-primary">
          <span className="eq-icon" /> Now exploring
        </span>
        <span className="truncate text-foreground/55">Data analytics · AI · Building</span>
      </div>
      <div className="relative mt-3" onPointerMove={follow} onPointerLeave={reset}>
        <div className="flex h-10 items-center gap-[2px]">
          {bars.map((base, i) => (
            <span
              key={i}
              ref={(node) => {
                if (node) barsRef.current[i] = node;
              }}
              className="np-bar h-full flex-1 rounded-full"
              style={{ '--s': base.toFixed(3), '--i': i, background: `hsl(var(${i % 7 === 3 ? '--lavender-deep' : i % 2 ? '--coral' : '--mint-deep'}))` } as CSSProperties}
            />
          ))}
        </div>
        <div className="mt-2 h-[2px] bg-foreground/10">
          <m.div className="h-full origin-left bg-[hsl(var(--coral-deep))]" style={{ scaleX: scrollYProgress }} />
        </div>
        <m.div className="pointer-events-none absolute inset-x-0 bottom-[-4px] h-[10px]" style={{ x: playhead }}>
          <span className="absolute left-0 top-0 -ml-[5px] h-[10px] w-[10px] rounded-full border-2 border-[hsl(var(--paper))] bg-[hsl(var(--coral-deep))]" />
        </m.div>
      </div>
    </div>
  );
}

/* --------------------------------- Hero ---------------------------------- */

export function HeroStage() {
  const reduceMotion = useReducedMotion();
  const [hot, setHot] = useState(false);
  const [dataBeat, setDataBeat] = useState(0);
  const lastBeat = useRef(0);

  const replay = () => {
    const now = performance.now();
    if (now - lastBeat.current < 750) return;
    lastBeat.current = now;
    setDataBeat((count) => count + 1);
  };

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setTimeout(replay, 900);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  const rise = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: enter(delay) });
  const heat = {
    onPointerEnter: () => setHot(true),
    onPointerLeave: () => setHot(false),
    onFocus: () => setHot(true),
    onBlur: () => setHot(false),
  };

  return (
    <section id="top" className="hero-stage relative overflow-hidden">
      <div className="relative mx-auto max-w-[1280px] px-5 pb-20 pt-28 md:px-10 md:pt-32 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-10">
          <div>
            <h1>
              <m.span {...rise(0)} className="flex items-center gap-3">
                <span className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-[-0.03em]">Vy Vu</span>
                <span className="h-px w-8 bg-foreground/30" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">Aspiring</span>
              </m.span>
              <m.span {...rise(0.08)} className="mt-3 block font-display text-[clamp(3.4rem,7vw,6.2rem)] font-normal leading-[.9] tracking-[-0.04em]">
                <span className="kinetic-word inline-block whitespace-nowrap italic text-primary" onPointerEnter={(event) => event.pointerType === 'mouse' && replay()} onClick={replay}>
                  {[...'Data'].map((letter, i) =>
                    dataBeat === 0 ? (
                      <span key={i} className="inline-block">{letter}</span>
                    ) : (
                      <m.span
                        key={`${dataBeat}-${i}`}
                        className="inline-block"
                        initial={{ y: '-0.5em', opacity: 0 }}
                        animate={{ y: '0em', opacity: 1 }}
                        transition={{ ...spring.beat, delay: i * 0.07 }}
                      >
                        {letter}
                      </m.span>
                    ),
                  )}
                </span>{' '}
                Analyst
              </m.span>
              <m.span {...rise(0.16)} className="mt-3 block font-display text-[clamp(1.25rem,2.1vw,1.75rem)] font-light italic text-foreground/75">
                (feat. <span className="text-[hsl(var(--mint-deep))]">AI Enthusiast</span> &amp; <span className="text-[hsl(var(--lavender-deep))]">Creative Mind</span>)
              </m.span>
            </h1>

            <m.div {...rise(0.26)} className="mt-6 max-w-[580px] space-y-3 leading-[1.6] text-foreground/75">
              <p className="text-lg">
                I&apos;m Vy, a Computer Information Systems student at Georgia State University who loves exploring the stories hidden in data.
              </p>
              <p className="text-[15px] text-foreground/68">
                I&apos;m especially curious about how AI and thoughtful analysis can turn complex information into meaningful insights. Whether I&apos;m exploring a dataset, building a digital experience, or learning something new, I enjoy connecting ideas and bringing them to life.
              </p>
            </m.div>

            <m.div {...rise(0.34)} className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                {...heat}
                className="btn-play group/cta inline-flex items-center gap-3 rounded-full bg-foreground py-2 pl-2 pr-5 font-mono text-[11px] uppercase tracking-[0.13em] text-background transition-colors hover:bg-primary"
                data-testid="link-hero-work"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--coral))] text-[hsl(var(--cocoa))] transition-transform duration-300 group-hover/cta:scale-110">
                  <Play size={13} fill="currentColor" />
                </span>
                View projects
              </a>
              <a
                href={links.resume}
                {...external}
                {...heat}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.13em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                data-testid="link-hero-resume"
              >
                View resume <ArrowUpRight size={14} />
              </a>
              <a
                href={links.linkedin}
                {...external}
                {...heat}
                className="inline-flex items-center gap-2 rounded-full px-3 py-3.5 font-mono text-[11px] uppercase tracking-[0.13em] text-foreground/75 transition-colors hover:text-primary"
                data-testid="link-hero-linkedin"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </m.div>

            <m.p {...rise(0.4)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--mint)/.35)] px-3 py-1.5 text-[13px] text-[hsl(var(--mint-deep))]" data-testid="text-hero-status">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-[hsl(var(--mint-deep))]" aria-hidden="true" />
              Exploring Data Analytics &amp; Business Analytics Internship Opportunities
            </m.p>

            <m.div {...rise(0.46)}>
              <NowPlaying hot={hot} />
            </m.div>
          </div>

          <m.div initial={{ opacity: 0, scale: 0.96, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={enter(0.2)}>
            <AlbumCover />
          </m.div>
        </div>
      </div>
    </section>
  );
}

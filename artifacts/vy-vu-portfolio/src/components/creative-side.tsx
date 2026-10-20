import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { MicVocal, Pause, Play } from 'lucide-react';
import { ease, spring } from '@/lib/motion';

type ModeId = 'dance' | 'guitar' | 'sing';

const modes: {
  id: ModeId;
  number: string;
  label: string;
  vi: string;
  accent: string;
  title: string;
  body: string;
  howTo: string;
  inWork: string;
}[] = [
  {
    id: 'dance',
    number: '01',
    label: 'Dance',
    vi: 'nhảy',
    accent: '--rose',
    title: 'K-pop dance',
    body: 'Learning choreography eight counts at a time: clean lines, sharp formation changes, and repeating a section until it feels natural.',
    howTo: 'Click or tap the stage to move to the next count, pick a count, or play a full eight-count.',
    inWork: 'Rehearse in small counts. I build features the same way, one section at a time until the whole sequence lands.',
  },
  {
    id: 'guitar',
    number: '02',
    label: 'Guitar',
    vi: 'đàn',
    accent: '--jade',
    title: 'Guitar',
    body: 'Chord shapes, finger placement, and the patience of learning a song slowly before playing it at tempo.',
    howTo: 'Pick a chord, then sweep across the strings with your cursor or finger. Each string is also a button.',
    inWork: 'Small adjustments change the whole tone, like tuning an interface one detail at a time.',
  },
  {
    id: 'sing',
    number: '03',
    label: 'Sing',
    vi: 'hát',
    accent: '--lilac',
    title: 'Singing',
    body: 'Finding the melody first, then shaping it with breath and expression.',
    howTo: 'Press and hold the mic (or hold Space) to sing. Move up and down, or use the arrow keys, to change pitch.',
    inWork: 'Listen first. A voice only works when people can hear and feel it, and products are the same.',
  },
];

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const ring = (n: number, r: number, cx: number, cy: number): [number, number][] =>
  range(n).map((i) => [cx + r * Math.cos((i * 2 * Math.PI) / n - Math.PI / 2), cy + r * Math.sin((i * 2 * Math.PI) / n - Math.PI / 2)]);

/* ---------------------------------- Dance --------------------------------- */

const formations: { name: string; points: [number, number][] }[] = [
  { name: 'Line', points: range(8).map((i) => [60 + i * 40, 140]) },
  { name: 'V', points: range(8).map((i) => [60 + i * 40, 70 + (3.5 - Math.abs(i - 3.5)) * 38]) },
  { name: 'Diamond', points: [[200, 40], [255, 85], [310, 130], [255, 175], [200, 220], [145, 175], [90, 130], [145, 85]] },
  { name: 'Circle', points: ring(8, 88, 200, 130) },
  { name: 'Arrow', points: [[200, 50], [160, 100], [240, 100], [120, 150], [200, 150], [280, 150], [160, 200], [240, 200]] },
  { name: 'Two rows', points: [[95, 90], [165, 90], [235, 90], [305, 90], [60, 180], [130, 180], [270, 180], [340, 180]] },
  { name: 'Zigzag', points: range(8).map((i) => [60 + i * 40, i % 2 ? 175 : 95]) },
  { name: 'Ending pose', points: [[200, 130], ...ring(7, 58, 200, 130)] },
];

const dancerTone = ['--rose', '--cream', '--jade', '--lilac'];

function DancerShape({ kind }: { kind: number }) {
  switch (kind % 4) {
    case 0:
      return <circle r="12" />;
    case 1:
      return <rect x="-10.5" y="-10.5" width="21" height="21" />;
    case 2:
      return <polygon points="0,-13 12,9 -12,9" />;
    default:
      return <rect x="-9" y="-9" width="18" height="18" transform="rotate(45)" />;
  }
}

function DanceMode() {
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number>(0);

  const next = () => setCount((current) => (current + 1) % formations.length);

  useEffect(() => {
    if (!playing) return;
    let steps = 0;
    timer.current = window.setInterval(() => {
      next();
      steps += 1;
      if (steps >= formations.length) setPlaying(false);
    }, 560);
    return () => window.clearInterval(timer.current);
  }, [playing]);

  const formation = formations[count];
  const upcoming = formations[(count + 1) % formations.length];

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setPlaying(false);
          next();
        }}
        className="mode-stage group relative block w-full"
        aria-label={`Dance stage, count ${count + 1}: ${formation.name} formation. Activate to move to the next count.`}
        data-testid="creative-dance-stage"
      >
        <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
          {range(5).map((i) => (
            <line key={i} x1="0" x2="400" y1={40 + i * 50} y2={40 + i * 50} className="stroke-[hsl(var(--cream)/.06)]" />
          ))}
          {upcoming.points.map(([x, y], i) => (
            <g key={`mark-${i}`} className="stroke-[hsl(var(--cream)/.22)]" strokeWidth="1.5">
              <line x1={x - 5} x2={x + 5} y1={y} y2={y} />
              <line x1={x} x2={x} y1={y - 5} y2={y + 5} />
            </g>
          ))}
          {formation.points.map(([x, y], i) => (
            <m.g
              key={i}
              initial={false}
              animate={{ x, y, rotate: count * 45 * (i % 2 ? 1 : -1) }}
              transition={{ ...spring.sway, delay: i * 0.025 }}
              style={{ fill: `hsl(var(${dancerTone[i % dancerTone.length]}))` }}
            >
              <DancerShape kind={i} />
            </m.g>
          ))}
        </svg>
        <span className="pointer-events-none absolute left-4 top-3 text-left font-mono text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--cream)/.6)]">
          Count {count + 1} · {formation.name}
          <span className="block text-[hsl(var(--cream)/.35)]">+ marks the next spot</span>
        </span>
        <span className="pointer-events-none absolute bottom-3 right-4 font-viet text-4xl font-light italic text-[hsl(var(--rose))] md:text-5xl" aria-hidden="true">
          {count + 1}
        </span>
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1" role="group" aria-label="Jump to a count">
          {formations.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                setPlaying(false);
                setCount(i);
              }}
              aria-pressed={count === i}
              aria-label={`Count ${i + 1}: ${item.name}`}
              className={`h-9 w-9 border font-mono text-[11px] transition-colors ${count === i ? 'border-primary bg-primary text-primary-foreground' : 'border-foreground/20 hover:border-primary hover:text-primary'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="inline-flex items-center gap-2 border border-foreground/20 px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          data-testid="creative-dance-play"
        >
          {playing ? <Pause size={13} /> : <Play size={13} />} {playing ? 'Stop' : 'Play an 8-count'}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">Count {count + 1}, {formation.name} formation</p>
    </div>
  );
}

/* --------------------------------- Guitar --------------------------------- */

const stringNames = ['low E', 'A', 'D', 'G', 'B', 'high E'];
const stringShort = ['E', 'A', 'D', 'G', 'B', 'e'];
const openMidi = [40, 45, 50, 55, 59, 64];
const noteNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const chords: Record<string, { name: string; frets: number[] }> = {
  G: { name: 'G major', frets: [3, 2, 0, 0, 0, 3] },
  C: { name: 'C major', frets: [-1, 3, 2, 0, 1, 0] },
  Em: { name: 'E minor', frets: [0, 2, 2, 0, 0, 0] },
  D: { name: 'D major', frets: [-1, -1, 0, 2, 3, 2] },
};
const stringX = (s: number) => 110 + s * 36;
const NUT_Y = 40;
const FRET_GAP = 50;
const noteFor = (s: number, fret: number) => {
  const midi = openMidi[s] + fret;
  return `${noteNames[midi % 12]}${Math.floor(midi / 12) - 1}`;
};

function GuitarMode() {
  const [chord, setChord] = useState('G');
  const [plucks, setPlucks] = useState({ count: range(6).map(() => 0), delay: range(6).map(() => 0) });
  const [lastNote, setLastNote] = useState<string | null>(null);
  const lastX = useRef<number | null>(null);
  const frets = chords[chord].frets;

  const pluck = (strings: number[], stagger = 0) => {
    setPlucks((current) => ({
      count: current.count.map((value, s) => (strings.includes(s) ? value + 1 : value)),
      delay: current.delay.map((value, s) => (strings.includes(s) ? strings.indexOf(s) * stagger : value)),
    }));
    const sounding = strings.filter((s) => frets[s] >= 0);
    if (strings.length === 1) setLastNote(frets[strings[0]] < 0 ? 'muted' : noteFor(strings[0], frets[strings[0]]));
    else setLastNote(sounding.length ? chords[chord].name : null);
  };

  const strum = () => pluck(range(6), 0.035);

  const sweep = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 400;
    if (lastX.current !== null) {
      const [from, to] = [Math.min(lastX.current, x), Math.max(lastX.current, x)];
      const crossed = range(6).filter((s) => stringX(s) > from && stringX(s) <= to);
      if (crossed.length) pluck(x > lastX.current ? crossed : [...crossed].reverse(), 0.02);
    }
    lastX.current = x;
  };

  return (
    <div>
      <div
        className="mode-stage relative touch-pan-y"
        onPointerMove={sweep}
        onPointerLeave={() => (lastX.current = null)}
        onPointerCancel={() => (lastX.current = null)}
        onPointerUp={(event) => event.pointerType !== 'mouse' && (lastX.current = null)}
        data-testid="creative-guitar-stage"
      >
        <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
          <rect x="92" y={NUT_Y} width="216" height="216" className="fill-[hsl(var(--cream)/.05)]" />
          <circle cx="200" cy={NUT_Y + 2.5 * FRET_GAP} r="6" className="fill-[hsl(var(--cream)/.1)]" />
          <rect x="92" y={NUT_Y - 5} width="216" height="6" className="fill-[hsl(var(--cream)/.8)]" />
          {range(4).map((i) => (
            <line key={i} x1="92" x2="308" y1={NUT_Y + (i + 1) * FRET_GAP} y2={NUT_Y + (i + 1) * FRET_GAP} className="stroke-[hsl(var(--cream)/.25)]" strokeWidth="2" />
          ))}

          {range(6).map((s) => {
            const x = stringX(s);
            const muted = frets[s] < 0;
            const count = plucks.count[s];
            const delay = plucks.delay[s];
            const amp = muted ? 0.4 : 1.6;
            return (
              <g key={s}>
                {count > 0 && !muted && (
                  <m.path
                    key={`blur-${count}`}
                    d={`M ${x} ${NUT_Y} Q ${x + 9} 148 ${x} 256 Q ${x - 9} 148 ${x} ${NUT_Y} Z`}
                    className="fill-[hsl(var(--jade))]"
                    initial={{ opacity: 0, scaleX: 1 }}
                    animate={{ opacity: [0.75, 0.5, 0.3, 0], scaleX: [1, 0.55, 0.85, 0.3, 0.5, 0] }}
                    transition={{ duration: 0.8, delay, ease: 'easeOut' }}
                  />
                )}
                <m.line
                  key={`string-${count}`}
                  x1={x}
                  x2={x}
                  y1={NUT_Y}
                  y2="256"
                  strokeWidth={3.2 - s * 0.4}
                  className={muted ? 'stroke-[hsl(var(--cream)/.3)]' : 'stroke-[hsl(var(--cream)/.85)]'}
                  animate={count > 0 ? { x: [0, amp, -amp, amp * 0.6, -amp * 0.4, 0] } : undefined}
                  transition={{ duration: 0.5, delay, ease: 'linear' }}
                />
                <text x={x} y="24" textAnchor="middle" className="fill-[hsl(var(--cream)/.6)] font-mono text-[11px]">
                  {muted ? '×' : frets[s] === 0 ? '○' : ''}
                </text>
                {frets[s] > 0 && (
                  <m.circle
                    key={`${chord}-${s}`}
                    cx={x}
                    cy={NUT_Y + (frets[s] - 0.5) * FRET_GAP}
                    r="11"
                    className="fill-[hsl(var(--jade))] stroke-[hsl(var(--cream)/.9)]"
                    strokeWidth="1.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ...spring.beat, delay: s * 0.03 }}
                  />
                )}
              </g>
            );
          })}
        </svg>
        <span className="pointer-events-none absolute left-4 top-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--cream)/.6)]">
          {chords[chord].name}
          <span className="hidden text-[hsl(var(--cream)/.35)] sm:block">sweep across the strings</span>
        </span>
        <span className="pointer-events-none absolute bottom-3 right-4 text-right font-mono text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--cream)/.6)]">
          <span className="block font-viet text-4xl normal-case italic tracking-normal text-[hsl(var(--jade))] md:text-5xl">{chord}</span>
          <span className="hidden sm:inline">{lastNote ?? 'visual only · no sound'}</span>
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1" role="group" aria-label="Choose a chord">
          {Object.keys(chords).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setChord(key);
                window.setTimeout(() => setPlucks((current) => ({ count: current.count.map((v) => v + 1), delay: range(6).map((s) => s * 0.035) })), 120);
                setLastNote(chords[key].name);
              }}
              aria-pressed={chord === key}
              aria-label={chords[key].name}
              className={`h-9 min-w-11 border px-3 font-mono text-[11px] transition-colors ${chord === key ? 'border-[hsl(var(--jade))] bg-[hsl(var(--jade))] text-[hsl(var(--cream))]' : 'border-foreground/20 hover:border-[hsl(var(--jade))] hover:text-[hsl(var(--jade))]'}`}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Pluck a string">
          {range(6).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => pluck([s])}
              aria-label={`Pluck ${stringNames[s]} string`}
              className="h-9 w-8 border border-foreground/20 font-mono text-[11px] transition-colors hover:border-[hsl(var(--jade))] hover:text-[hsl(var(--jade))]"
            >
              {stringShort[s]}
            </button>
          ))}
          <button
            type="button"
            onClick={strum}
            className="ml-2 inline-flex h-9 items-center border border-foreground/20 px-3.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-[hsl(var(--jade))] hover:bg-[hsl(var(--jade))] hover:text-[hsl(var(--cream))]"
            data-testid="creative-guitar-strum"
          >
            Strum
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{lastNote ? `Played ${lastNote}` : ''}</p>
    </div>
  );
}

/* ---------------------------------- Sing ---------------------------------- */

const BAR_COUNT = 44;
const IDLE_AMP = 0.14;
const lyric = [
  { text: 'Xin', vi: true },
  { text: 'chào', vi: true },
  { text: '·', vi: false },
  { text: 'hel-', vi: false },
  { text: 'lo', vi: false, join: true },
  { text: '♪', vi: false },
];
const envelope = range(BAR_COUNT).map((i) => Math.pow(Math.sin((Math.PI * (i + 0.5)) / BAR_COUNT), 1.4));
const pitchName = (pitch: number) => (pitch > 0.66 ? 'high' : pitch < 0.33 ? 'low' : 'mid');

function SingMode({ reduceMotion }: { reduceMotion: boolean }) {
  const barsRef = useRef<HTMLSpanElement[]>([]);
  const noteRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const voice = useRef({ amp: 0, target: 0, phase: 0, pitch: 0.5, raf: 0, held: 0, last: 0, shown: 0 });
  const [singing, setSinging] = useState(false);
  const [shown, setShown] = useState(0);
  const [pitch, setPitchLabel] = useState('mid');

  const paint = (amp: number) => {
    const { phase, pitch: p } = voice.current;
    const density = 0.22 + p * 0.6;
    barsRef.current.forEach((bar, i) => {
      const wobble = 0.55 + 0.45 * Math.sin(i * density + phase);
      bar.style.transform = `scaleY(${(0.04 + amp * envelope[i] * wobble).toFixed(3)})`;
    });
  };

  const reveal = (n: number) => {
    if (n === voice.current.shown) return;
    voice.current.shown = n;
    setShown(n);
  };

  const tick = (now: number) => {
    const v = voice.current;
    const dt = now - v.last;
    v.last = now;
    v.amp += (v.target - v.amp) * 0.12;
    v.phase += 0.09 + v.pitch * 0.14;
    if (v.target > 0) {
      v.held += dt;
      reveal(Math.min(lyric.length, Math.floor(v.held / 420) + 1));
    }
    if (v.target === 0 && v.amp < IDLE_AMP + 0.01) {
      v.raf = 0;
      v.phase = 0;
      paint(IDLE_AMP);
      return;
    }
    paint(Math.max(v.amp, IDLE_AMP));
    v.raf = requestAnimationFrame(tick);
  };

  const setPitch = (value: number) => {
    const v = voice.current;
    v.pitch = Math.min(1, Math.max(0, value));
    if (noteRef.current) noteRef.current.style.transform = `translateY(${((1 - v.pitch) * 64).toFixed(1)}px)`;
    setPitchLabel(pitchName(v.pitch));
    if (reduceMotion && v.target > 0) paint(0.85);
  };

  const start = () => {
    const v = voice.current;
    if (v.target > 0) return;
    v.target = 1;
    setSinging(true);
    if (v.shown >= lyric.length) {
      v.held = 0;
      reveal(0);
    }
    if (reduceMotion) {
      paint(0.85);
      reveal(lyric.length);
      return;
    }
    if (!v.raf) {
      v.last = performance.now();
      v.raf = requestAnimationFrame(tick);
    }
  };

  const stop = () => {
    voice.current.target = 0;
    setSinging(false);
    if (reduceMotion) paint(IDLE_AMP);
  };

  useEffect(() => {
    paint(IDLE_AMP);
    setPitch(0.5);
    return () => cancelAnimationFrame(voice.current.raf);
  }, []);

  const pitchFromPointer = (event: ReactPointerEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (rect) setPitch(1 - (event.clientY - rect.top) / rect.height);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const onMic = (event.target as Element).closest('[data-mic]');
    if (event.pointerType !== 'mouse' && !onMic) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pitchFromPointer(event);
    start();
  };

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (!event.repeat) start();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      setPitch(voice.current.pitch + (event.key === 'ArrowUp' ? 0.1 : -0.1));
    }
  };

  const onKeyUp = (event: ReactKeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') stop();
  };

  return (
    <div>
      <div
        ref={stageRef}
        className="mode-stage relative cursor-pointer select-none"
        onPointerDown={onPointerDown}
        onPointerMove={(event) => singing && pitchFromPointer(event)}
        onPointerUp={stop}
        onPointerCancel={stop}
        onContextMenu={(event) => event.preventDefault()}
        data-testid="creative-sing-stage"
      >
        <div className="absolute bottom-[32%] left-[6%] right-[16%] top-[22%] flex items-center gap-[2px] md:gap-[3px]" aria-hidden="true">
          {range(BAR_COUNT).map((i) => (
            <span
              key={i}
              ref={(node) => {
                if (node) barsRef.current[i] = node;
              }}
              className="h-full flex-1 rounded-full will-change-transform"
              style={{ background: `hsl(var(${i / BAR_COUNT < 0.5 ? '--lilac' : '--rose'}) / ${0.55 + envelope[i] * 0.45})` }}
            />
          ))}
        </div>

        <div className="absolute right-4 top-3 h-[88px] w-10" aria-hidden="true">
          {range(5).map((i) => (
            <span key={i} className="absolute inset-x-0 h-px bg-[hsl(var(--cream)/.25)]" style={{ top: 12 + i * 16 }} />
          ))}
          <span ref={noteRef} className="absolute left-1/2 top-[6px] -ml-[6px] block h-3 w-3 rounded-full bg-[hsl(var(--lilac))] transition-transform duration-150" />
        </div>

        <span className="pointer-events-none absolute left-4 top-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--cream)/.6)]">
          {singing ? `singing · ${pitch} pitch` : 'press and hold to sing'}
          <span className="block text-[hsl(var(--cream)/.35)]">visual only · no microphone</span>
        </span>

        <p className="pointer-events-none absolute bottom-5 left-5 flex flex-wrap items-baseline gap-x-2 text-2xl md:bottom-6 md:left-6 md:text-3xl" aria-hidden="true">
          {lyric.map((syllable, i) => (
            <span
              key={i}
              lang={syllable.vi ? 'vi' : undefined}
              className={`transition-[opacity,transform] duration-300 ${'join' in syllable ? '-ml-2' : ''} ${syllable.vi ? 'font-viet font-light italic' : 'font-display italic'} ${i < shown ? 'translate-y-0 text-[hsl(var(--cream))] opacity-100' : 'translate-y-1 text-[hsl(var(--cream))] opacity-20'}`}
            >
              {syllable.text}
            </span>
          ))}
        </p>

        <button
          type="button"
          data-mic
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onBlur={stop}
          aria-pressed={singing}
          aria-label="Hold to sing. Use the up and down arrow keys to change pitch."
          className={`absolute bottom-4 right-4 flex h-16 w-16 touch-none items-center justify-center rounded-full border transition-[transform,background-color,color] duration-200 md:bottom-5 md:right-5 md:h-[72px] md:w-[72px] ${singing ? 'scale-110 border-[hsl(var(--lilac))] bg-[hsl(var(--lilac))] text-[hsl(var(--cream))]' : 'border-[hsl(var(--cream)/.35)] text-[hsl(var(--cream))] hover:border-[hsl(var(--lilac))]'}`}
          data-testid="creative-sing-mic"
        >
          <MicVocal size={24} strokeWidth={1.6} />
        </button>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/50">
        Hold the mic · drag up or down for pitch · keyboard: hold Space, arrows for pitch
      </p>
      <p className="sr-only" aria-live="polite">{singing ? `Singing at ${pitch} pitch` : ''}</p>
    </div>
  );
}

/* --------------------------------- Section -------------------------------- */

export function CreativeSide() {
  const [active, setActive] = useState<ModeId>('dance');
  const reduceMotion = useReducedMotion() ?? false;
  const tabsRef = useRef<Record<ModeId, HTMLButtonElement | null>>({ dance: null, guitar: null, sing: null });
  const mode = modes.find((item) => item.id === active)!;

  const onTabKey = (event: ReactKeyboardEvent, index: number) => {
    const keys: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: modes.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const target = modes[(keys[event.key] + modes.length) % modes.length];
    setActive(target.id);
    tabsRef.current[target.id]?.focus();
  };

  return (
    <section id="creative" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 pb-28 md:px-10 md:pb-40">
      <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">03 / off the screen</p>
          <h2 className="mt-5 text-5xl leading-[.92] tracking-[-0.055em] md:text-8xl">
            Off the screen,
            <br />
            <span className="font-display font-normal italic">I keep the </span>
            <span className="font-viet font-light italic text-primary" lang="vi">nhịp.</span>
          </h2>
        </div>
        <p className="max-w-[320px] text-sm leading-[1.6] text-foreground/60 md:pb-2">
          <span className="font-viet italic text-foreground" lang="vi">Nhịp</span> means rhythm in Vietnamese. I find it in K-pop dance practice, on guitar strings, and when I sing. Pick a mode and play: it&apos;s all motion, no sound.
        </p>
      </div>

      <div className="reveal reveal-delay-1 mt-14">
        <div className="grid grid-cols-3 border border-foreground/15" role="tablist" aria-label="Creative modes">
          {modes.map((item, index) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabsRef.current[item.id] = node;
                }}
                type="button"
                role="tab"
                id={`mode-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`mode-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(item.id)}
                onKeyDown={(event) => onTabKey(event, index)}
                className={`group relative flex flex-col items-start gap-1 px-4 py-4 text-left transition-colors md:flex-row md:items-baseline md:gap-3 md:px-6 md:py-5 ${index > 0 ? 'border-l border-foreground/15' : ''} ${selected ? 'bg-foreground text-background' : 'hover:bg-card'}`}
                data-testid={`creative-tab-${item.id}`}
              >
                <span className={`font-mono text-[10px] ${selected ? 'text-background/55' : 'text-primary'}`}>{item.number}</span>
                <span className="text-xl tracking-[-0.03em] md:text-2xl">{item.label}</span>
                <span className="font-viet text-base font-light italic md:text-lg" style={{ color: `hsl(var(${item.accent}))` }} lang="vi">
                  {item.vi}
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-[3px] origin-left transition-transform duration-300 ${selected ? 'scale-x-100' : 'scale-x-0'}`}
                  style={{ background: `hsl(var(${item.accent}))` }}
                />
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active}
            id={`mode-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`mode-tab-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: ease.settle }}
            className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_.6fr]"
          >
            <div>
              {active === 'dance' && <DanceMode />}
              {active === 'guitar' && <GuitarMode />}
              {active === 'sing' && <SingMode reduceMotion={reduceMotion} />}
            </div>

            <aside className="relative flex flex-col border border-foreground/15 bg-card p-6 md:p-7">
              <span aria-hidden="true" className="scrap-tape absolute -top-3 right-8 h-6 w-16 rotate-[4deg]" />
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/50">Mode {mode.number} · {mode.label}</p>
              <h3 className="mt-4 text-3xl leading-none tracking-[-0.04em]">
                {mode.title}{' '}
                <span className="font-viet text-2xl font-light italic" style={{ color: `hsl(var(${mode.accent}))` }} lang="vi">
                  {mode.vi}
                </span>
              </h3>
              <p className="mt-4 text-sm leading-[1.7] text-foreground/65">{mode.body}</p>
              <div className="mt-6 border-t border-foreground/15 pt-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Try it</p>
                <p className="mt-2 text-sm leading-[1.6] text-foreground/65">{mode.howTo}</p>
              </div>
              <div className="mt-auto border-t border-foreground/15 pt-5 lg:mt-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">In my work</p>
                <p className="mt-2 font-display text-xl italic leading-[1.25]">{mode.inWork}</p>
              </div>
            </aside>
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

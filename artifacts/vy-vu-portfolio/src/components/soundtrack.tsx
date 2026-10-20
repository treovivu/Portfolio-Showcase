import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { enter } from '@/lib/motion';
import { soundtrack } from '@/lib/site';

/* The portfolio soundtrack: one shared <audio>, created only when the visitor
   first presses play (no autoplay, nothing downloaded up front). See SOUNDTRACK.md
   for how to add the track. Without a configured file the player stays hidden in
   production builds and shows a hint in development. */

type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'unavailable';

type Soundtrack = {
  /** True when there is a player to show: a track is configured, or we're in dev. */
  enabled: boolean;
  status: Status;
  playing: boolean;
  toggle: () => void;
  /** The in-hero player reports whether it's on screen; the dock appears when it isn't. */
  setHeroInView: (inView: boolean) => void;
  heroInView: boolean;
};

const SoundtrackContext = createContext<Soundtrack | null>(null);

export function useSoundtrack() {
  const value = useContext(SoundtrackContext);
  if (!value) throw new Error('useSoundtrack must be used inside <SoundtrackProvider>');
  return value;
}

export function SoundtrackProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>(soundtrack.src ? 'idle' : 'unavailable');
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => () => audioRef.current?.pause(), []);

  const value = useMemo<Soundtrack>(() => {
    const getAudio = () => {
      if (audioRef.current || !soundtrack.src) return audioRef.current;
      const audio = new Audio(soundtrack.src);
      audio.loop = true;
      audio.volume = 0.45;
      audio.preload = 'auto';
      audio.addEventListener('playing', () => setStatus('playing'));
      audio.addEventListener('pause', () => setStatus('paused'));
      audio.addEventListener('waiting', () => setStatus('loading'));
      audio.addEventListener('error', () => setStatus('unavailable'));
      audioRef.current = audio;

      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: soundtrack.title,
          artist: soundtrack.artist || 'Vy Vu Portfolio',
        });
      }
      return audio;
    };

    return {
      enabled: Boolean(soundtrack.src) || import.meta.env.DEV,
      status,
      playing: status === 'playing',
      heroInView,
      setHeroInView,
      toggle: () => {
        const audio = getAudio();
        if (!audio) return;
        if (audio.paused) {
          setStatus('loading');
          audio.play().catch(() => setStatus('unavailable'));
        } else {
          audio.pause();
        }
      },
    };
  }, [status, heroInView]);

  return (
    <SoundtrackContext.Provider value={value}>
      {children}
      <SoundtrackDock />
    </SoundtrackContext.Provider>
  );
}

/* ------------------------------ Vinyl button ----------------------------- */

// A tiny record: it spins while the music plays, holds its angle when paused,
// and leans a little toward the cursor.
export function VinylButton({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { status, playing, toggle } = useSoundtrack();
  const unavailable = status === 'unavailable';
  const label = unavailable
    ? `${soundtrack.title} soundtrack is unavailable`
    : `${playing ? 'Pause' : 'Play'} soundtrack: ${soundtrack.title}${soundtrack.artist ? ` by ${soundtrack.artist}` : ''}`;

  const lean = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--lx', `${(((event.clientX - rect.left) / rect.width - 0.5) * 5).toFixed(1)}px`);
    event.currentTarget.style.setProperty('--ly', `${(((event.clientY - rect.top) / rect.height - 0.5) * 5).toFixed(1)}px`);
  };
  const settle = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.removeProperty('--lx');
    event.currentTarget.style.removeProperty('--ly');
  };

  const dimension = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';

  return (
    <button
      type="button"
      onClick={toggle}
      onPointerMove={lean}
      onPointerLeave={settle}
      disabled={unavailable}
      aria-label={label}
      aria-pressed={playing}
      title={unavailable ? undefined : label}
      className={`track-button relative shrink-0 rounded-full ${dimension} disabled:cursor-not-allowed disabled:opacity-50`}
      data-testid={`button-soundtrack-${size}`}
    >
      <span className="track-vinyl vinyl absolute inset-0 rounded-full" data-playing={playing || undefined} aria-hidden="true">
        <span className="absolute inset-[30%] rounded-full bg-[hsl(var(--coral))]" />
      </span>
      <span className="relative flex h-full w-full items-center justify-center text-[hsl(var(--cocoa))]" aria-hidden="true">
        {status === 'loading' ? (
          <span className="track-loading h-2 w-2 rounded-full bg-[hsl(var(--cocoa))]" />
        ) : playing ? (
          <Pause size={size === 'sm' ? 10 : 12} fill="currentColor" strokeWidth={0} />
        ) : (
          <Play size={size === 'sm' ? 10 : 12} fill="currentColor" strokeWidth={0} className="translate-x-[1px]" />
        )}
      </span>
    </button>
  );
}

/* --------------------------------- Dock ---------------------------------- */

// Once the visitor has pressed play and scrolls past the hero, a small dock
// keeps the pause button within reach. It never appears before they opt in.
function SoundtrackDock() {
  const { status, playing, heroInView } = useSoundtrack();
  const started = status === 'playing' || status === 'paused' || status === 'loading';

  return (
    <AnimatePresence>
      {started && !heroInView && (
        <m.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={enter()}
          className="track-dock fixed bottom-4 right-4 z-30 flex items-center gap-3 rounded-full border border-foreground/12 bg-[hsl(var(--paper)/.92)] py-1.5 pl-1.5 pr-4 backdrop-blur-md md:bottom-6 md:right-6"
          data-playing={playing || undefined}
          role="region"
          aria-label="Soundtrack player"
          data-testid="soundtrack-dock"
        >
          <VinylButton size="sm" />
          <span className="flex flex-col leading-tight">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/50">{playing ? 'Now playing' : 'Paused'}</span>
            <span className="text-[12px] font-medium tracking-[-0.01em] text-foreground/80">{soundtrack.title}</span>
          </span>
          <span className="eq-icon text-[hsl(var(--coral-deep))]" aria-hidden="true" />
        </m.div>
      )}
    </AnimatePresence>
  );
}

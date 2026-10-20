import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { ArrowUpRight, BookOpen, Disc3, Sparkles, Trophy } from 'lucide-react';
import { enter } from '@/lib/motion';
import { external, links } from '@/lib/site';
import type { CoverArt, MediaItem, ProjectDetail } from '@/lib/types';

export function ProjectAction({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      {...external}
      className="link-chip inline-flex items-center justify-between gap-2 rounded-full border border-foreground/20 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.11em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
      data-testid={`link-project-${label.toLowerCase().replaceAll(' ', '-')}`}
    >
      {label} <ArrowUpRight size={13} />
    </a>
  );
}

/* --------------------------------- Covers --------------------------------- */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const auraBars = [22, 38, 30, 56, 44, 70, 52, 34, 62, 80, 58, 40, 66, 48, 30, 42, 26, 18];

// Each project gets album art whose motif explains the work; hover/focus plays a short motion.
const covers: Record<CoverArt, { label: string; bg: string; ink: string; art: ReactNode }> = {
  aurabeat: {
    label: 'AuraBeat',
    bg: 'hsl(var(--cocoa))',
    ink: 'hsl(var(--cream))',
    art: (
      <>
        {[40, 100, 160].map((x, i) => (
          <polygon key={x} points={`${x},0 ${x - 34},150 ${x + 34},150`} fill={`hsl(var(${['--lavender', '--coral', '--mint'][i]}) / .2)`} className="cover-beam" style={{ animationDelay: `${i * 90}ms` }} />
        ))}
        {auraBars.map((h, i) => (
          <rect key={i} x={28 + i * 8} y={118 - h / 2} width="5" height={h} rx="2.5" fill={i % 3 === 1 ? 'hsl(var(--mint))' : 'hsl(var(--coral))'} className="cover-bar" style={{ animationDelay: `${i * 35}ms` }} />
        ))}
        <g transform="translate(160 44)">
          {[8, 15, 22].map((r, i) => (
            <circle key={r} r={r} fill="none" stroke="hsl(var(--mint))" strokeOpacity={0.7 - i * 0.2} className="cover-ring" style={{ animationDelay: `${i * 120}ms` }} />
          ))}
          <rect x="-5" y="-6" width="10" height="12" rx="3" fill="hsl(var(--cream))" />
        </g>
      </>
    ),
  },
  herbuddy: {
    label: 'HerBuddy',
    bg: 'hsl(var(--mint))',
    ink: 'hsl(var(--cocoa))',
    art: (
      <>
        {range(7).map((i) => (
          <line key={`h${i}`} x1="0" x2="200" y1={i * 30 + 10} y2={i * 30 + 10} stroke="hsl(var(--cocoa) / .08)" />
        ))}
        {range(7).map((i) => (
          <line key={`v${i}`} y1="0" y2="200" x1={i * 30 + 10} x2={i * 30 + 10} stroke="hsl(var(--cocoa) / .08)" />
        ))}
        <path d="M40 140 C 75 140, 70 92, 104 92 S 140 46, 162 46" fill="none" stroke="hsl(var(--cocoa))" strokeWidth="3" strokeDasharray="4 7" strokeLinecap="round" />
        <circle r="5" fill="hsl(var(--paper))" stroke="hsl(var(--cocoa))" strokeWidth="2" className="cover-traveler" />
        <circle cx="40" cy="140" r="11" fill="hsl(var(--coral))" />
        <circle cx="162" cy="46" r="11" fill="hsl(var(--lavender-deep))" />
      </>
    ),
  },
  vimf: {
    label: 'VIMF',
    bg: 'hsl(var(--peach))',
    ink: 'hsl(var(--cocoa))',
    art: (
      <>
        {range(16).map((i) => {
          const x = 24 + (i % 4) * 30;
          const y = 26 + Math.floor(i / 4) * 30;
          const filled = [1, 6, 8, 11, 13].includes(i);
          return <rect key={i} x={x} y={y} width="22" height="22" rx="3" fill={filled ? 'hsl(var(--coral))' : 'none'} stroke="hsl(var(--cocoa) / .55)" strokeWidth="1.5" className="cover-tile" style={{ animationDelay: `${i * 30}ms` }} />;
        })}
        <g transform="translate(160 76)" className="cover-gear">
          <circle r="22" fill="none" stroke="hsl(var(--cocoa))" strokeWidth="6" strokeDasharray="6 5" />
          <circle r="8" fill="hsl(var(--mint-deep))" />
        </g>
      </>
    ),
  },
  halloween: {
    label: 'Halloween',
    bg: 'hsl(var(--lavender))',
    ink: 'hsl(var(--cocoa))',
    art: (
      <>
        <circle cx="152" cy="44" r="20" fill="hsl(var(--cream))" />
        <circle cx="160" cy="38" r="17" fill="hsl(var(--lavender))" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={34 + i * 16} y={56 + i * 16} width="96" height="62" rx="6" fill="hsl(var(--paper))" stroke="hsl(var(--cocoa) / .6)" strokeWidth="1.5" className="cover-slide" style={{ animationDelay: `${i * 80}ms` }} />
        ))}
        <text x="74" y="122" fontFamily="DM Mono, monospace" fontSize="11" fill="hsl(var(--cocoa))">·−·· ·− −−</text>
      </>
    ),
  },
  nsdc: {
    label: 'NSDC',
    bg: 'hsl(var(--paper))',
    ink: 'hsl(var(--cocoa))',
    art: (
      <>
        <line x1="24" x2="180" y1="146" y2="146" stroke="hsl(var(--cocoa) / .4)" strokeWidth="1.5" />
        {[46, 70, 58, 94, 82, 112].map((h, i) => (
          <rect key={i} x={30 + i * 24} y={146 - h} width="16" height={h} rx="2" fill={i % 2 ? 'hsl(var(--mint-deep))' : 'hsl(var(--coral))'} className="cover-column" style={{ animationDelay: `${i * 50}ms` }} />
        ))}
        <g className="cover-lens">
          <circle cx="138" cy="58" r="20" fill="hsl(var(--paper) / .6)" stroke="hsl(var(--cocoa))" strokeWidth="4" />
          <line x1="152" y1="72" x2="168" y2="88" stroke="hsl(var(--cocoa))" strokeWidth="5" strokeLinecap="round" />
        </g>
        <text x="26" y="34" fontFamily="DM Mono, monospace" fontSize="11" fill="hsl(var(--cocoa) / .7)">SELECT *</text>
      </>
    ),
  },
};

function TrackCover({ art, number, title }: { art: CoverArt; number: string; title: string }) {
  const cover = covers[art];
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label={`Cover art for ${title}`}>
      <rect width="200" height="200" fill={cover.bg} />
      {cover.art}
      <text x="14" y="186" fontFamily="Fraunces, Georgia, serif" fontStyle="italic" fontSize="22" fill={cover.ink}>
        {cover.label}
      </text>
      <text x="186" y="22" textAnchor="end" fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="1.5" fill={cover.ink} opacity=".7">
        {number}
      </text>
    </svg>
  );
}

function CoverWithVinyl({ children, onOpen, label }: { children: ReactNode; onOpen?: () => void; label: string }) {
  return (
    <div className="relative w-[200px] max-w-full shrink-0 pr-[14%] lg:w-full">
      <div className="track-vinyl vinyl absolute right-0 top-[6%] aspect-square w-[86%] rounded-full" aria-hidden="true">
        <div className="absolute inset-[36%] rounded-full bg-[hsl(var(--coral))]" />
        <div className="absolute inset-[48%] rounded-full bg-[hsl(var(--cream))]" />
      </div>
      {onOpen ? (
        <button type="button" onClick={onOpen} className="track-cover relative block aspect-square w-full overflow-hidden shadow-[0_10px_24px_-14px_hsl(var(--cocoa)/.6)]" aria-label={label}>
          {children}
        </button>
      ) : (
        <div className="track-cover relative aspect-square w-full overflow-hidden shadow-[0_10px_24px_-14px_hsl(var(--cocoa)/.6)]">{children}</div>
      )}
    </div>
  );
}

/* -------------------------------- Tracklist ------------------------------- */

const reveal = (index: number) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: enter(index * 0.05),
});

export function Tracklist({
  work,
  onOpenProject,
  onOpenMedia,
}: {
  work: ProjectDetail[];
  onOpenProject: (project: ProjectDetail) => void;
  onOpenMedia: (item: MediaItem) => void;
}) {
  return (
    <section id="work" className="scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-36">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">05 / the tracklist</p>
            <h2 className="mt-5 text-5xl leading-[.9] tracking-[-0.055em] md:text-8xl">
              Selected
              <br />
              <span className="font-display font-normal italic">work.</span>
            </h2>
          </div>
          <div className="max-w-[300px] md:pb-2">
            <p className="text-sm leading-[1.6] text-foreground/60">Products I&apos;ve built and experiences that taught me to lead, coordinate, and ship.</p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/50">
              <Disc3 size={14} className="text-primary" /> Side B · {work.length} tracks + 1 bonus
            </p>
          </div>
        </div>

        <div className="mt-14 hidden grid-cols-[64px_200px_minmax(0,1fr)_200px] gap-8 border-b-2 border-foreground pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/55 lg:grid" aria-hidden="true">
          <span>No.</span>
          <span>Cover</span>
          <span>Title · credits · liner notes</span>
          <span>Listen</span>
        </div>

        <ol className="mt-6 lg:mt-0">
          {work.map((project, index) => (
            <m.li
              key={project.number}
              {...reveal(index)}
              className="track group relative grid gap-6 border-b border-foreground/15 py-10 lg:grid-cols-[64px_200px_minmax(0,1fr)_200px] lg:gap-8"
              data-testid={`card-project-${project.number}`}
            >
              <div className="hidden lg:block">
                <span className="font-display text-4xl italic text-foreground/80">{project.number}</span>
                <span className="eq-icon mt-3 block text-primary" aria-hidden="true" />
              </div>

              <CoverWithVinyl onOpen={() => onOpenProject(project)} label={`Open liner notes for ${project.title}`}>
                <TrackCover art={project.cover} number={project.number} title={project.title} />
              </CoverWithVinyl>

              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/50">
                  <span className="text-primary lg:hidden">Track {project.number} · </span>
                  {project.role}
                </p>
                <h3 className="track-title mt-3 font-display text-3xl leading-[1] tracking-[-0.03em] md:text-[2.6rem]">{project.title}</h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {project.featured && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--peach))] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[hsl(var(--cocoa))]" data-testid="badge-featured-project">
                      {project.award ? <><Trophy size={11} /> Award winner</> : <><Sparkles size={11} /> Lead single</>}
                    </span>
                  )}
                  {project.award && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-primary-foreground" data-testid="text-project-award">
                      <Trophy size={14} strokeWidth={1.8} />
                      <span className="text-sm font-medium tracking-[-0.01em]">{project.award}</span>
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm text-foreground/60">
                  {project.organization} <span className="text-primary">·</span> <span className="font-mono text-[10px] uppercase tracking-[0.12em]">{project.period}</span>
                </p>
                <p className="mt-4 max-w-[640px] text-[15px] leading-[1.7] text-foreground/72">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Skills used">
                  {project.skills.map((skill) => (
                    <li key={skill} className="rounded-full border border-foreground/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-foreground/60">{skill}</li>
                  ))}
                </ul>
                {project.media.length > 0 && (
                  <div className="mt-6 flex items-center gap-2">
                    <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">Liner photos</span>
                    {project.media.slice(0, 3).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onOpenMedia(item)}
                        className="liner-thumb h-12 w-16 overflow-hidden rounded-[4px] border border-foreground/15 bg-card"
                        aria-label={`View ${item.label} full size`}
                        data-testid={`media-${item.id}`}
                      >
                        <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </button>
                    ))}
                    {project.media.length > 3 && <span className="font-mono text-[10px] text-foreground/50">+{project.media.length - 3}</span>}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 lg:items-stretch">
                {project.links && project.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 lg:flex-col" data-testid="project-actions">
                    {project.links.map((link) => <ProjectAction key={link.label} label={link.label} url={link.url} />)}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => onOpenProject(project)}
                  className="mt-1 inline-flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.13em] text-primary lg:mt-3"
                  data-testid={`button-project-${project.number}`}
                >
                  Liner notes <ArrowUpRight size={14} />
                </button>
              </div>

              <span className="track-wave pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-[hsl(var(--coral-deep))]" aria-hidden="true" />
            </m.li>
          ))}
        </ol>

        <m.article
          {...reveal(0)}
          className="mt-10 grid gap-8 overflow-hidden rounded-[6px] bg-[hsl(var(--coral))] p-7 text-[hsl(var(--cocoa))] md:grid-cols-[200px_1fr] md:p-10"
          data-testid="card-project-vivu-notes"
        >
          <div className="relative aspect-square w-[160px] -rotate-3 bg-[hsl(var(--paper))] p-4 shadow-[0_14px_26px_-16px_hsl(var(--cocoa)/.7)] md:w-full" aria-hidden="true">
            {range(7).map((i) => (
              <span key={i} className="mt-[11%] block h-px bg-[hsl(var(--cocoa)/.15)] first:mt-[18%]" />
            ))}
            <span className="absolute left-4 top-4 font-display text-xl italic">ViVu Notes</span>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--cocoa)/.7)]">Bonus track · 06 / personal publication</p>
              <h3 className="mt-4 font-display text-5xl italic leading-[.9] md:text-6xl">ViVu Notes</h3>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.13em] text-[hsl(var(--cocoa)/.75)]">Notes on books, data, and becoming.</p>
              <p className="mt-6 max-w-[560px] text-xl leading-[1.3] tracking-[-0.02em]">
                My personal publication where I write about books, lessons from studying abroad, personal growth, data, and ideas I&apos;m learning along the way.
              </p>
            </div>
            <a
              href={links.notes}
              {...external}
              className="mt-8 inline-flex items-center gap-3 self-start rounded-full bg-[hsl(var(--cocoa))] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.13em] text-[hsl(var(--cream))] transition-colors hover:bg-[hsl(var(--paper))] hover:text-[hsl(var(--cocoa))]"
              data-testid="link-vivu-notes-work"
            >
              <BookOpen size={14} /> Read ViVu Notes <ArrowUpRight size={14} />
            </a>
          </div>
        </m.article>
      </div>
    </section>
  );
}

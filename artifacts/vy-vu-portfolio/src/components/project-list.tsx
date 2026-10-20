import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { ArrowUpRight, BookOpen, Sparkles, Trophy } from 'lucide-react';
import { enter } from '@/lib/motion';
import { external, links } from '@/lib/site';
import type { CoverArt, MediaItem, ProjectDetail } from '@/lib/types';

export function ProjectAction({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      {...external}
      className="inline-flex items-center justify-between gap-2 rounded-full border border-foreground/20 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.11em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
      data-testid={`link-project-${label.toLowerCase().replaceAll(' ', '-')}`}
    >
      {label} <ArrowUpRight size={13} />
    </a>
  );
}

/* ------------------------------ Illustrations ----------------------------- */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const auraBars = [22, 38, 30, 56, 44, 70, 52, 34, 62, 80, 58, 40, 66, 48, 30, 42, 26, 18];

// Only projects where an illustration explains the work get one; the rest use real photos.
const illustrations: Record<Exclude<CoverArt, 'photo'>, { label: string; bg: string; ink: string; art: ReactNode }> = {
  // Stage light + music waveform + watch haptic rings: what AuraBeat translates music into.
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
          <rect key={i} x={28 + i * 8} y={110 - h / 2} width="5" height={h} rx="2.5" fill={i % 3 === 1 ? 'hsl(var(--mint))' : 'hsl(var(--coral))'} className="cover-bar" style={{ animationDelay: `${i * 35}ms` }} />
        ))}
        <g transform="translate(162 50)">
          {[8, 15, 22].map((r, i) => (
            <circle key={r} r={r} fill="none" stroke="hsl(var(--mint))" strokeOpacity={0.7 - i * 0.2} className="cover-ring" style={{ animationDelay: `${i * 120}ms` }} />
          ))}
          <rect x="-5" y="-6" width="10" height="12" rx="3" fill="hsl(var(--cream))" />
        </g>
      </>
    ),
  },
  // Two students joined by a walking route over a campus grid.
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
        <path d="M40 140 C 75 140, 70 92, 104 92 S 140 56, 162 56" fill="none" stroke="hsl(var(--cocoa))" strokeWidth="3" strokeDasharray="4 7" strokeLinecap="round" />
        <circle r="5" fill="hsl(var(--paper))" stroke="hsl(var(--cocoa))" strokeWidth="2" className="cover-traveler" />
        <circle cx="40" cy="140" r="11" fill="hsl(var(--coral))" />
        <circle cx="162" cy="56" r="11" fill="hsl(var(--lavender-deep))" />
      </>
    ),
  },
  // The event ran on 100 interactive slides with Morse code challenges.
  halloween: {
    label: '100 slides',
    bg: 'hsl(var(--lavender))',
    ink: 'hsl(var(--cocoa))',
    art: (
      <>
        <circle cx="156" cy="56" r="18" fill="hsl(var(--cream))" />
        <circle cx="163" cy="50" r="15" fill="hsl(var(--lavender))" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={30 + i * 16} y={58 + i * 14} width="96" height="58" rx="6" fill="hsl(var(--paper))" stroke="hsl(var(--cocoa) / .6)" strokeWidth="1.5" className="cover-slide" style={{ animationDelay: `${i * 80}ms` }} />
        ))}
        {/* Morse code, drawn as shapes so it renders the same in every font. */}
        {[[0, 3], [6, 12], [21, 3], [27, 3], [36, 12], [51, 3]].map(([x, w]) => (
          <rect key={x} x={86 + x} y="112" width={w} height="3" rx="1.5" fill="hsl(var(--cocoa) / .7)" />
        ))}
      </>
    ),
  },
};

function ProjectMedia({ project }: { project: ProjectDetail }) {
  if (project.cover === 'photo') {
    const photo = project.media[0];
    return photo?.src ? <img src={photo.src} alt={photo.alt} loading="lazy" className="project-media-inner h-full w-full object-cover" /> : null;
  }
  const art = illustrations[project.cover];
  // The 200×200 artwork is cropped to the 4:3 frame via "slice", so everything important sits in y 25–175.
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="project-media-inner h-full w-full" role="img" aria-label={`Illustration for ${project.title}`}>
      <rect width="200" height="200" fill={art.bg} />
      {art.art}
      <text x="14" y="168" fontFamily="Fraunces, Georgia, serif" fontStyle="italic" fontSize="20" fill={art.ink}>
        {art.label}
      </text>
    </svg>
  );
}

/* ------------------------------ Project list ------------------------------ */

const reveal = (index: number) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: enter(index * 0.05),
});

export function ProjectList({
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
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">05 / selected work</p>
            <h2 className="mt-5 text-5xl leading-[.9] tracking-[-0.055em] md:text-8xl">
              Selected
              <br />
              <span className="font-display font-normal italic">work.</span>
            </h2>
          </div>
          <p className="max-w-[300px] text-sm leading-[1.6] text-foreground/60 md:pb-2">Products I&apos;ve built and experiences that taught me to lead, coordinate, and ship.</p>
        </div>

        <ol className="mt-12 border-t-2 border-foreground">
          {work.map((project, index) => (
            <m.li
              key={project.number}
              {...reveal(index)}
              // Every piece gets its own grid cell; artwork is clipped to its cell so motion can never cover text.
              className="project-row group relative grid gap-6 border-b border-foreground/15 py-10 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[48px_minmax(0,260px)_minmax(0,1fr)_180px]"
              data-testid={`card-project-${project.number}`}
            >
              <div className="hidden lg:block" aria-hidden="true">
                <span className="block font-display text-3xl italic text-foreground/75">{project.number}</span>
                <span className="eq-icon mt-3 text-primary" />
              </div>

              <div data-media className="project-media relative aspect-[4/3] w-full max-w-[420px] self-start overflow-hidden rounded-[6px] border border-foreground/10 bg-card md:max-w-none">
                <button type="button" onClick={() => onOpenProject(project)} className="block h-full w-full" aria-label={`Open project details for ${project.title}`}>
                  <ProjectMedia project={project} />
                </button>
              </div>

              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/50">
                  <span className="text-primary lg:hidden">Project {project.number} · </span>
                  {project.role}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-[1.02] tracking-[-0.03em] [overflow-wrap:anywhere] md:text-[2.4rem]">{project.title}</h3>
                {(project.featured || project.award) && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {project.featured && !project.award && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--peach))] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[hsl(var(--cocoa))]" data-testid="badge-featured-project">
                        <Sparkles size={11} /> Featured project
                      </span>
                    )}
                    {project.award && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-primary-foreground" data-testid="text-project-award">
                        <Trophy size={14} strokeWidth={1.8} />
                        <span className="text-sm font-medium tracking-[-0.01em]">{project.award}</span>
                      </span>
                    )}
                  </div>
                )}
                <p className="mt-4 text-sm text-foreground/60">
                  {project.organization} <span className="text-primary">·</span> <span className="font-mono text-[10px] uppercase tracking-[0.12em]">{project.period}</span>
                </p>
                <p className="mt-4 max-w-[680px] text-[15px] leading-[1.65] text-foreground/75">{project.description}</p>

                <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.15em] text-primary">What I did</p>
                <ul className="mt-2 max-w-[680px] space-y-2">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5 text-sm leading-[1.6] text-foreground/68">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools and skills">
                  {project.skills.map((skill) => (
                    <li key={skill} className="rounded-full border border-foreground/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-foreground/60">{skill}</li>
                  ))}
                </ul>

                {project.media.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">Photos</span>
                    {project.media.slice(0, 3).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onOpenMedia(item)}
                        className="photo-thumb h-12 w-16 overflow-hidden rounded-[4px] border border-foreground/15 bg-card"
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

              <div className="flex flex-col gap-2 md:col-start-2 lg:col-start-auto">
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
                  Project details <ArrowUpRight size={14} />
                </button>
              </div>

              <span className="row-wave pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-[hsl(var(--coral-deep))]" aria-hidden="true" />
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
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--cocoa)/.7)]">06 / personal publication</p>
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

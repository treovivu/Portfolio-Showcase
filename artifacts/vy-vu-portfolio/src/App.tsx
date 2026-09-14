import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BarChart3, Check, ChevronDown, Circle, Menu, MoveUpRight, Play, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
];

const capabilities = [
  { number: '01', title: 'Find the signal', body: 'I turn scattered information into a clear point of view: patterns, tension, and the one thing worth carrying forward.' },
  { number: '02', title: 'Shape the story', body: 'I build an editorial arc around complex ideas so the audience always knows where they are, and why they should care.' },
  { number: '03', title: 'Make it tangible', body: 'From a dashboard to an exhibition website, I design the interface that lets a good idea move from screen to memory.' },
];

const projects = [
  {
    id: '01',
    title: 'Technology Event Exhibition',
    category: 'Digital exhibition · Research · Web',
    detail: 'A living archive for the ideas changing how we work.',
    tone: 'dark',
  },
  {
    id: '02',
    title: 'Signal Notes',
    category: 'Editorial system · Data storytelling',
    detail: 'A compact visual language for explaining technology without the fog.',
    tone: 'coral',
  },
  {
    id: '03',
    title: 'The Quiet Metric',
    category: 'Analysis · Content series',
    detail: 'Short, considered dispatches about what numbers leave out.',
    tone: 'blue',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('Narrative');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@vyvu.studio');
    } catch {
      // Clipboard permissions are optional; the visible state still confirms the action.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main className="portfolio-shell min-h-[100dvh] text-foreground">
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-foreground/10 bg-[hsl(var(--background)/.82)] backdrop-blur-xl" data-testid="navigation-main">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="group flex items-center gap-3" data-testid="link-logo">
            <span className="flex h-9 w-9 items-center justify-center bg-foreground text-background font-mono text-xs font-medium transition-transform duration-300 group-hover:rotate-12">VV</span>
            <span className="hidden text-sm font-semibold tracking-[-0.02em] sm:block">Vy Vu<span className="text-primary">.</span></span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/65 transition-colors hover:text-primary" data-testid={`link-nav-${item.label.toLowerCase()}`}>
                {item.label}
              </a>
            ))}
          </div>
          <a href="mailto:hello@vyvu.studio" className="hidden items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground sm:flex" data-testid="link-nav-email">
            Let&apos;s talk <ArrowUpRight size={13} />
          </a>
          <button type="button" className="flex items-center justify-center p-2 md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-foreground/10 bg-[hsl(var(--background))] px-5 py-5 md:hidden" data-testid="menu-mobile">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-foreground/10 py-4 font-mono text-xs uppercase tracking-[0.14em]" data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                {item.label} <ArrowUpRight size={14} className="text-primary" />
              </a>
            ))}
          </div>
        )}
      </nav>

      <section id="top" className="relative mx-auto flex min-h-[790px] max-w-[1280px] items-center px-5 pb-20 pt-36 md:px-10 md:pt-40">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
          <div>
            <div className="reveal mb-9 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
              <span className="h-2 w-2 bg-primary" /> Data analyst / content creator <span className="text-primary">·</span> Ho Chi Minh City
            </div>
            <h1 className="reveal reveal-delay-1 max-w-[800px] text-[clamp(3.9rem,9.2vw,8.5rem)] leading-[.86] tracking-[-0.065em]">
              Make sense<br />
              <span className="font-display italic font-normal text-primary">of the noise.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-10 max-w-[450px] text-lg leading-[1.48] text-foreground/70 md:text-xl">
              Vy helps people understand information — then turns technology stories into experiences worth staying with.
            </p>
            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-5">
              <a href="#work" className="group inline-flex items-center gap-3 bg-foreground px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.13em] text-background transition-colors hover:bg-primary" data-testid="link-hero-work">
                Explore selected work <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
              <a href="#about" className="signal-line font-mono text-[11px] uppercase tracking-[0.13em]" data-testid="link-hero-about">A little more about me</a>
            </div>
          </div>

          <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[570px] lg:ml-auto">
            <div className="absolute -left-7 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45 [writing-mode:vertical-rl]">Information / interpretation / impact</div>
            <div className="relative aspect-square overflow-hidden border border-foreground/15 bg-[#17202f] p-5 shadow-[14px_14px_0_hsl(var(--primary)/.18)] md:p-8">
              <div className="project-visual absolute inset-0" />
              <div className="relative flex h-full flex-col justify-between text-[hsl(var(--background))]">
                <div className="flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--background)/.58)]">
                  <span>VV / 2024—25</span>
                  <span className="flex items-center gap-2"><Circle size={7} fill="currentColor" className="text-primary" /> live signal</span>
                </div>
                <div className="relative mx-auto flex aspect-square w-[71%] items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[hsl(var(--background)/.2)]" />
                  <div className="orbit absolute inset-[11%] rounded-full border border-dashed border-[hsl(var(--background)/.25)]" />
                  <div className="orbit absolute inset-[25%] rounded-full border border-[hsl(var(--primary)/.8)] [animation-duration:10s]" />
                  <div className="absolute h-[29%] w-[29%] rounded-full bg-primary shadow-[0_0_0_11px_hsl(var(--primary)/.12)]" />
                  <div className="absolute left-[9%] top-[18%] h-2.5 w-2.5 rounded-full bg-[hsl(var(--background))]" />
                  <div className="absolute bottom-[17%] right-[12%] h-2.5 w-2.5 rounded-full bg-accent" />
                  <div className="absolute right-[12%] top-[25%] h-1.5 w-1.5 rounded-full bg-[hsl(var(--background))]" />
                  <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.12em]">signal</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-display text-3xl italic">Curiosity, clarified.</p>
                    <p className="mt-2 max-w-[180px] font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em] text-[hsl(var(--background)/.58)]">A visual index of the things I&apos;m trying to understand.</p>
                  </div>
                  <div className="font-mono text-right text-[9px] leading-[1.6] text-[hsl(var(--background)/.58)]">36° 08&apos; N<br />106° 40&apos; E</div>
                </div>
              </div>
            </div>
            <div className="float-slow absolute -bottom-6 -right-2 border border-foreground/20 bg-background px-4 py-3 shadow-[5px_5px_0_hsl(var(--foreground)/.08)] md:-right-6" data-testid="status-current-focus">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">Currently exploring</p>
              <p className="mt-1 text-sm font-medium">how ideas travel</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="section-rule flex items-center justify-between py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
          <span>01 — the short version</span>
          <span className="hidden md:block">scroll to read between the lines <ChevronDown size={13} className="ml-2 inline text-primary" /></span>
          <span>© 2025</span>
        </div>
      </div>

      <section id="about" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <div className="reveal">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">About / context</p>
            <h2 className="mt-6 max-w-[400px] text-4xl leading-[.97] tracking-[-0.045em] md:text-6xl">Numbers are only the beginning.</h2>
          </div>
          <div className="reveal reveal-delay-1 max-w-[730px]">
            <p className="text-2xl leading-[1.2] tracking-[-0.025em] md:text-[2.8rem] md:leading-[1.08]">The interesting part is what they reveal about people, systems, and the small choices that shape a bigger picture.</p>
            <div className="mt-12 grid gap-8 border-t border-foreground/15 pt-7 sm:grid-cols-2">
              <p className="text-sm leading-[1.65] text-foreground/65">I work between analysis and expression. That might mean finding the human story in a messy dataset, or making a technology topic feel less like a press release and more like a room you want to enter.</p>
              <p className="text-sm leading-[1.65] text-foreground/65">My practice is deliberately cross-disciplinary: research, writing, editorial direction, data visualization, and the occasional pixel-perfect interface. The through-line is always clarity with character.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 border-y border-foreground/15 bg-[hsl(var(--muted)/.45)]">
        <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-10 md:py-36">
          <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">02 — selected work</p>
              <h2 className="mt-5 text-5xl leading-[.9] tracking-[-0.055em] md:text-8xl">Ideas, made<br /><span className="font-display font-normal italic">visible.</span></h2>
            </div>
            <p className="max-w-[270px] text-sm leading-[1.5] text-foreground/60 md:pb-2">A few ways I&apos;ve turned information into something people can see, feel, and use.</p>
          </div>

          <article className="reveal reveal-delay-1 mt-20 grid overflow-hidden border border-foreground/15 bg-[#17202f] lg:grid-cols-[1.1fr_.9fr]" data-testid="card-project-technology-event">
            <div className="project-visual relative min-h-[430px] overflow-hidden p-6 text-[hsl(var(--background))] md:p-10">
              <div className="absolute right-8 top-8 font-mono text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--background)/.56)]">Featured case study / 01</div>
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex gap-2">
                  {['Narrative', 'Interface', 'Signal'].map((view) => (
                    <button key={view} type="button" onClick={() => setActiveView(view)} className={`border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors ${activeView === view ? 'border-primary bg-primary text-primary-foreground' : 'border-[hsl(var(--background)/.22)] text-[hsl(var(--background)/.6)] hover:border-[hsl(var(--background)/.65)]'}`} data-testid={`button-case-${view.toLowerCase()}`}>
                      {view}
                    </button>
                  ))}
                </div>
                <div className="relative mx-auto w-full max-w-[570px] py-8">
                  <div className="grid grid-cols-12 items-end gap-2 border-b border-[hsl(var(--background)/.35)] pb-2">
                    {[38, 52, 44, 72, 61, 86, 66, 94, 78, 64, 83, 98].map((height, index) => (
                      <div key={index} className="relative flex flex-col items-center gap-2">
                        <div className={`w-full transition-all duration-500 ${index % 3 === 0 ? 'bg-primary' : 'bg-[hsl(var(--background)/.62)]'}`} style={{ height: `${height * 1.6}px` }} />
                        {index % 3 === 0 && <span className="absolute -top-4 font-mono text-[8px] text-primary">{index + 1}</span>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-[hsl(var(--background)/.5)]"><span>attention</span><span>context</span><span>memory</span></div>
                  <div className="absolute -right-1 top-10 border border-[hsl(var(--background)/.3)] bg-[#17202f]/80 px-3 py-2 backdrop-blur-sm">
                    <span className="block font-mono text-[8px] uppercase tracking-[0.1em] text-primary">reading time</span><span className="font-display text-xl italic">{activeView === 'Narrative' ? '04:32' : activeView === 'Interface' ? '02:18' : '06:07'}</span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-display text-3xl italic md:text-4xl">{activeView === 'Narrative' ? 'The future is a room.' : activeView === 'Interface' ? 'Make the invisible legible.' : 'Every signal has a shape.'}</span>
                  <Play size={24} className="hidden text-primary md:block" fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between bg-background p-7 md:p-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Technology event exhibition</p>
                <h3 className="mt-5 max-w-[470px] text-4xl leading-[.93] tracking-[-0.05em] md:text-6xl">A living archive for the ideas changing how we work.</h3>
                <p className="mt-8 max-w-[410px] text-base leading-[1.6] text-foreground/65">A digital exhibition that gives a technology event a longer life. I translated a day of talks, demos, and competing futures into a navigable editorial world — less conference recap, more open-ended conversation.</p>
              </div>
              <div className="mt-12">
                <div className="grid grid-cols-2 gap-5 border-y border-foreground/15 py-5 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/50">
                  <div><span className="block text-foreground/35">Role</span><span className="mt-2 block text-foreground">Research · narrative · design</span></div>
                  <div><span className="block text-foreground/35">Output</span><span className="mt-2 block text-foreground">Exhibition website · 2024</span></div>
                </div>
                <button type="button" className="group mt-7 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-primary" onClick={() => setActiveView(activeView === 'Signal' ? 'Narrative' : 'Signal')} data-testid="button-case-study">
                  View the case study <span className="flex h-8 w-8 items-center justify-center border border-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight size={14} /></span>
                </button>
              </div>
            </div>
          </article>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {projects.slice(1).map((project, index) => (
              <article key={project.id} className={`reveal reveal-delay-${index + 2} group relative min-h-[315px] overflow-hidden border border-foreground/15 p-7 transition-transform duration-500 hover:-translate-y-1 md:p-9 ${project.tone === 'coral' ? 'bg-primary text-primary-foreground' : 'bg-[#b7d7d9]'}`} data-testid={`card-project-${project.id}`}>
                <div className="flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.15em] opacity-60"><span>{project.id} / {project.category.split(' · ')[0]}</span><MoveUpRight size={15} /></div>
                <div className="absolute bottom-8 left-7 right-7 md:left-9 md:right-9">
                  <h3 className="max-w-[370px] text-4xl leading-[.92] tracking-[-0.05em] md:text-5xl">{project.title}</h3>
                  <p className="mt-4 max-w-[320px] text-sm leading-[1.5] opacity-75">{project.detail}</p>
                </div>
                <div className={`absolute -right-12 -top-12 h-48 w-48 rounded-full border-[28px] transition-transform duration-700 group-hover:scale-125 ${project.tone === 'coral' ? 'border-[hsl(var(--background)/.18)]' : 'border-[hsl(var(--foreground)/.15)]'}`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
          <div className="reveal">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">03 — how I work</p>
            <h2 className="mt-5 max-w-[400px] text-5xl leading-[.92] tracking-[-0.055em] md:text-7xl">Clear is a creative decision.</h2>
          </div>
          <div className="space-y-0">
            {capabilities.map((item, index) => (
              <div key={item.number} className={`reveal reveal-delay-${index + 1} grid gap-4 border-t border-foreground/15 py-7 md:grid-cols-[70px_1fr_1.2fr] md:items-start md:gap-7`}>
                <span className="font-mono text-[10px] text-primary">{item.number}</span>
                <h3 className="text-2xl tracking-[-0.035em]">{item.title}</h3>
                <p className="max-w-[400px] text-sm leading-[1.6] text-foreground/62">{item.body}</p>
              </div>
            ))}
            <div className="border-t border-foreground/15" />
          </div>
        </div>
      </section>

      <section className="border-y border-foreground/15 bg-foreground text-background">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_.9fr] lg:items-end">
          <div className="reveal">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">A note from the desk</p>
            <p className="mt-7 max-w-[780px] text-4xl leading-[.98] tracking-[-0.045em] md:text-6xl">“Good communication is not about making a complex thing smaller. It&apos;s about giving people a better way in.”</p>
          </div>
          <div className="reveal reveal-delay-1 flex justify-between border-t border-background/20 pt-5 font-mono text-[10px] uppercase tracking-[0.13em] text-background/55 lg:block lg:border-t-0 lg:pt-0">
            <span>Vy Vu</span><span className="lg:mt-3 lg:block">Analyst / maker / curious person</span>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-28 md:px-10 md:py-40">
        <div className="reveal relative overflow-hidden border border-foreground/15 bg-[hsl(var(--secondary)/.42)] px-6 py-16 md:px-16 md:py-24">
          <div className="absolute -right-10 -top-24 h-80 w-80 rounded-full border-[1px] border-primary/30 md:h-[480px] md:w-[480px]" />
          <div className="absolute -right-2 -top-16 h-64 w-64 rounded-full border-[1px] border-primary/20 md:h-[380px] md:w-[380px]" />
          <div className="relative max-w-[730px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">04 — open channel</p>
            <h2 className="mt-6 text-6xl leading-[.85] tracking-[-0.065em] md:text-8xl">Have a good<br /><span className="font-display font-normal italic">question?</span></h2>
            <p className="mt-8 max-w-[470px] text-base leading-[1.6] text-foreground/65">I&apos;m always interested in the space between a sharp idea and the way it lands. Tell me what you&apos;re looking at.</p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href="mailto:hello@vyvu.studio" className="group inline-flex items-center gap-3 bg-primary px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.13em] text-primary-foreground transition-colors hover:bg-foreground" data-testid="link-contact-email">hello@vyvu.studio <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
              <button type="button" onClick={copyEmail} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-foreground/60 transition-colors hover:text-primary" data-testid="button-copy-email">
                {copied ? <Check size={14} /> : <BarChart3 size={14} />} {copied ? 'Copied to clipboard' : 'Copy email'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1280px] flex-col gap-4 border-t border-foreground/15 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/50 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <span data-testid="text-footer-copyright">Vy Vu — making information memorable.</span>
        <div className="flex gap-5">
          <a href="#top" className="transition-colors hover:text-primary" data-testid="link-footer-top">Back to top ↑</a>
          <a href="mailto:hello@vyvu.studio" className="transition-colors hover:text-primary" data-testid="link-footer-email">Email</a>
        </div>
      </footer>
    </main>
  );
}

export default App;

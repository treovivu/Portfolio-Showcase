import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Circle,
  Database,
  FileText,
  Linkedin,
  Mail,
  Maximize2,
  Menu,
  MoveUpRight,
  Sparkles,
  X,
} from 'lucide-react';
import personalPhoto from '@assets/IMG_4981_1789411105954.JPG';
import presidentsListSpring2026 from '@assets/presidents-list-spring-2026.png';
import presidentsListFall2025 from '@assets/presidents-list-fall-2025.png';
import presidentsListSpring2025 from '@assets/presidents-list-spring-2025.png';
import herBuddyCover from '@assets/Screenshot_2026-09-22_at_1.26.18_PM_1790097984255.png';
import herBuddyContributions from '@assets/IMG_6188_1790098101201.JPG';
import herBuddyBuddyMatch from '@assets/Screenshot_2026-09-22_at_1.28.46_PM_1790098128879.png';
import herBuddyCampusMap from '@assets/Screenshot_2026-09-22_at_1.29.02_PM_1790098146026.png';
import herBuddyWellness from '@assets/Screenshot_2026-09-22_at_1.29.16_PM_1790098159020.png';
import vimfCover from '@assets/image_1790100671213.png';

const links = {
  linkedin: '',
  notes: '',
  email: '',
  resume: '',
};

type MediaItem = {
  id: string;
  label: string;
  caption: string;
  alt: string;
  src?: string;
};

type ProjectDetail = {
  number: string;
  title: string;
  role: string;
  organization: string;
  description: string;
  skills: string[];
  tone: 'blue' | 'paper' | 'ink';
  media: MediaItem[];
  featured?: boolean;
  award?: string;
  liveDemo?: string;
  github?: string;
};

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Writing', href: '#writing' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const building = [
  {
    number: '01',
    title: 'Data & Analytics',
    body: 'Developing skills in Python, SQL, Excel, data analysis, and visualization while learning how to turn raw information into useful insights.',
    icon: Database,
  },
  {
    number: '02',
    title: 'Business & Leadership',
    body: 'Building experience in project coordination, event operations, stakeholder communication, partnerships, and team collaboration.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Writing & Storytelling',
    body: 'Exploring how writing, books, personal experiences, and data can be used to communicate ideas clearly and meaningfully.',
    icon: BookOpen,
  },
];

const work: ProjectDetail[] = [
  {
    number: '01',
    title: 'HerBuddy — HackHERS 2026',
    role: 'Hackathon project',
    organization: 'HackHERS 2026',
    description:
      'HerBuddy is a campus mental health and student support platform with peer matching, location-based safety zones, and AI-powered voice support.',
    skills: ['Auth0', 'Google Maps API', 'ElevenLabs', 'HTML/CSS', 'JavaScript'],
    tone: 'blue',
    featured: true,
    award: 'MLH Best Use of Auth0',
    liveDemo: 'https://her-buddy.vercel.app',
    github: 'https://github.com/1Cazarez/HerBuddy',
    media: [
      { id: 'herbuddy-cover', label: 'Project screenshot', caption: 'HerBuddy campus support dashboard with safety and wellness tools.', alt: 'HerBuddy campus support dashboard showing route matching, wellness summary, and safety check-in', src: herBuddyCover },
      { id: 'herbuddy-contributions', label: 'Contributions photos', caption: 'The HerBuddy team during HackHERS 2026.', alt: 'Vy Vu with three HerBuddy teammates at HackHERS 2026', src: herBuddyContributions },
      { id: 'herbuddy-buddy-match', label: 'Feature detail · Buddy Match', caption: 'Peer matching for walking, studying, and campus activities.', alt: 'HerBuddy Buddy Match screen showing a verified student profile and match percentage', src: herBuddyBuddyMatch },
      { id: 'herbuddy-campus-map', label: 'Feature detail · Campus Map', caption: 'Campus safety zones, lit walkways, and live group routes.', alt: 'HerBuddy Campus Map screen showing a secure zone, active groups, and walk routes', src: herBuddyCampusMap },
      { id: 'herbuddy-wellness', label: 'Feature detail · Wellness Dashboard', caption: 'Student health, activity goals, and campus support resources.', alt: 'HerBuddy Wellness Dashboard showing activity goals, peer support, and emergency contact', src: herBuddyWellness },
    ],
  },
  {
    number: '02',
    title: 'Interactive Event Experience',
    role: 'Event Leader',
    organization: 'Trường MN - TiH - THCS - THPT Việt Anh',
    description:
      'Coordinated an interactive Morse Code game for approximately 100 participants and created a 100-slide PowerPoint experience. Organized assignments and progress tracking for a 30-member team using Excel.',
    skills: ['Microsoft Excel', 'Event Planning', 'Leadership', 'Team Coordination', 'Presentation Design'],
    tone: 'blue',
    media: [
      { id: 'event-cover', label: 'Cover image', caption: 'Upload one strong cover image for this project.', alt: 'Interactive Event Experience cover placeholder' },
      { id: 'event-slides', label: 'Presentation slides', caption: 'Selected examples from the Morse Code presentation.', alt: 'Morse Code presentation slides placeholder' },
      { id: 'event-materials', label: 'Event materials', caption: 'Upload event materials or activity visuals.', alt: 'Interactive event materials placeholder' },
      { id: 'event-excel', label: 'Excel workflow', caption: 'Upload a readable screenshot of the team organization system.', alt: 'Excel team organization workflow placeholder' },
    ],
  },
  {
    number: '03',
    title: 'Strategic Partnerships & VIMF',
    role: 'Strategic Partnerships Intern',
    organization: 'OMG Events Management Co Ltd',
    description:
      'Researched and conducted outreach to more than 50 industrial and manufacturing companies to support partnership, sponsorship, and event participation opportunities. Worked with the event manager to support relationships with business leaders, media partners, and key stakeholders involved with the Vietnam Industrial & Manufacturing Fair.',
    skills: ['Strategic Partnerships', 'Stakeholder Management', 'Business Development', 'Communication', 'Event Management'],
    tone: 'paper',
    media: [
      { id: 'vimf-cover', label: 'VIMF cover image', caption: 'Vietnam Industrial & Manufacturing Fair promotional banner.', alt: 'Vietnam Industrial and Manufacturing Fair promotional banner with manufacturing event dates and robotics imagery', src: vimfCover },
      { id: 'vimf-banner', label: 'Invitation banners', caption: 'Upload invitation banners or promotional materials.', alt: 'VIMF invitation banner placeholder' },
      { id: 'vimf-event', label: 'Event photos', caption: 'Only upload approved event photos here.', alt: 'VIMF event photo placeholder' },
      { id: 'vimf-outreach', label: 'Outreach sample', caption: 'Upload an approved partnership outreach sample.', alt: 'Partnership outreach sample placeholder' },
    ],
  },
  {
    number: '04',
    title: 'National Student Data Corps',
    role: 'Event Coordinator',
    organization: 'National Student Data Corps at Georgia State University',
    description:
      'Plan and coordinate workshops, networking events, and general body meetings related to data analytics, visualization, data cleaning, and emerging AI tools. Collaborate with student leaders and advisors on logistics, scheduling, communication, and member engagement.',
    skills: ['Event Coordination', 'Data Analytics', 'Leadership', 'Project Management', 'Communication'],
    tone: 'ink',
    media: [
      { id: 'nsc-cover', label: 'Cover image', caption: 'Upload a workshop or event cover image.', alt: 'National Student Data Corps cover placeholder' },
      { id: 'nsc-flyer', label: 'Event flyers', caption: 'Upload flyers for workshops or general body meetings.', alt: 'National Student Data Corps flyer placeholder' },
      { id: 'nsc-workshop', label: 'Workshop photos', caption: 'Upload approved workshop photos or event materials.', alt: 'National Student Data Corps workshop placeholder' },
      { id: 'nsc-data', label: 'Data activity', caption: 'Upload a data-related activity visual.', alt: 'National Student Data Corps data activity placeholder' },
    ],
  },
];

const dataProjects: ProjectDetail[] = [
  {
    number: '01',
    title: 'Content Performance Analysis',
    role: 'Future data project',
    organization: 'Personal writing and content',
    description:
      'Analyzing performance data from my own writing and content to understand audience behavior, engagement, and content trends.',
    skills: ['Dataset', 'SQL / Python', 'Visualization'],
    tone: 'paper',
    media: [
      { id: 'content-dashboard', label: 'Dashboard screenshots', caption: 'Upload dashboard screenshots when this project is ready.', alt: 'Content Performance Analysis dashboard placeholder' },
      { id: 'content-chart', label: 'Charts and visualizations', caption: 'Upload charts or a dataset preview.', alt: 'Content Performance Analysis chart placeholder' },
    ],
  },
  {
    number: '02',
    title: 'Personal Analytics Project',
    role: 'Future data project',
    organization: 'Everyday life and decision-making',
    description:
      'Using data from everyday life to explore patterns, behaviors, and decision-making.',
    skills: ['Dataset', 'Process', 'Insights'],
    tone: 'paper',
    media: [
      { id: 'personal-dashboard', label: 'Data visualizations', caption: 'Upload a visualization or dashboard screenshot.', alt: 'Personal Analytics Project visualization placeholder' },
      { id: 'personal-cleaning', label: 'Before and after', caption: 'Upload a before-and-after data cleaning example.', alt: 'Personal Analytics Project data cleaning placeholder' },
    ],
  },
  {
    number: '03',
    title: 'SQL / Python Project',
    role: 'Future data project',
    organization: 'Technical analysis',
    description:
      'A future technical project demonstrating data cleaning, analysis, querying, and visualization.',
    skills: ['SQL', 'Python', 'Data Cleaning'],
    tone: 'paper',
    media: [
      { id: 'sql-code', label: 'Code screenshot', caption: 'Upload a useful SQL or Python code screenshot.', alt: 'SQL and Python project code placeholder' },
      { id: 'sql-output', label: 'Analysis output', caption: 'Upload the final chart, dashboard, or dataset preview.', alt: 'SQL and Python project output placeholder' },
    ],
  },
];

const certificates: MediaItem[] = [
  { id: 'presidents-list-1', label: 'President’s List · Spring 2026', caption: 'Georgia State University President’s List certificate.', alt: 'Vy Vu Georgia State University President’s List certificate for Spring 2026', src: presidentsListSpring2026 },
  { id: 'presidents-list-2', label: 'President’s List · Fall 2025', caption: 'Georgia State University President’s List certificate.', alt: 'Vy Vu Georgia State University President’s List certificate for Fall 2025', src: presidentsListFall2025 },
  { id: 'presidents-list-3', label: 'President’s List · Spring 2025', caption: 'Georgia State University President’s List certificate.', alt: 'Vy Vu Georgia State University President’s List certificate for Spring 2025', src: presidentsListSpring2025 },
  { id: 'menaul-1', label: 'Menaul School certificate', caption: 'Upload an academic certificate or award from Menaul School.', alt: 'Menaul School certificate placeholder' },
  { id: 'menaul-2', label: 'Menaul School award', caption: 'Upload another approved Menaul School certificate or award.', alt: 'Menaul School award placeholder' },
];

const skills = [
  { title: 'Data', items: ['Python', 'SQL', 'Microsoft Excel', 'Data Analysis', 'Data Visualization'] },
  { title: 'Technology', items: ['Application Development', 'Information Systems'] },
  { title: 'Business', items: ['Business Analysis', 'Stakeholder Management', 'Strategic Partnerships', 'Project Coordination'] },
  { title: 'Communication', items: ['Storytelling', 'Presentation', 'Writing', 'Team Collaboration'] },
];

const articles = [
  {
    title: 'A place for notes, questions, and becoming',
    description: 'A future space for sharing what I am reading, learning, and thinking through.',
    date: 'Coming soon',
  },
  {
    title: 'What data can teach us about attention',
    description: 'A future reflection on content, patterns, and the stories inside everyday signals.',
    date: 'Coming soon',
  },
  {
    title: 'Learning in public',
    description: 'A future note on building technical skills with curiosity instead of perfection.',
    date: 'Coming soon',
  },
];

function MediaPlaceholder({
  item,
  onOpen,
  className = '',
}: {
  item: MediaItem;
  onOpen?: (item: MediaItem) => void;
  className?: string;
}) {
  if (item.src) {
    return (
      <button
        type="button"
        className={`group relative block aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-foreground/15 bg-card text-left ${className}`}
        onClick={() => onOpen?.(item)}
        data-testid={`media-${item.id}`}
      >
        <img src={item.src} alt={item.alt} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
        <span className="absolute bottom-3 right-3 flex items-center gap-2 bg-foreground/85 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-background">
          <Maximize2 size={12} /> View full size
        </span>
      </button>
    );
  }

  return (
    <div className={`media-placeholder relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden rounded-[3px] border border-dashed border-foreground/25 bg-background p-4 ${className}`} data-testid={`media-${item.id}`}>
      <div className="media-placeholder-grid absolute inset-0 opacity-70" />
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-foreground/45">Visual slot</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-primary">Upload later</span>
      </div>
      <div className="relative">
        <p className="max-w-[230px] text-lg leading-[1] tracking-[-0.03em] text-foreground/70">{item.label}</p>
        <p className="mt-2 max-w-[300px] text-xs leading-[1.5] text-foreground/50">{item.caption}</p>
      </div>
    </div>
  );
}

function linkTarget(url: string, fallback = '#contact') {
  return url || fallback;
}

function ProjectAction({
  label,
  url,
  className = '',
}: {
  label: string;
  url?: string;
  className?: string;
}) {
  const sharedClassName = `inline-flex items-center gap-2 border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.11em] transition-colors ${className}`;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`${sharedClassName} border-foreground/20 hover:border-primary hover:bg-primary hover:text-primary-foreground`}
        data-testid={`link-project-${label.toLowerCase().replaceAll(' ', '-')}`}
      >
        {label} <ArrowUpRight size={13} />
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled
      title={`${label} link coming soon`}
      aria-label={`${label} link coming soon`}
      className={`${sharedClassName} cursor-not-allowed border-foreground/15 text-foreground/45`}
      data-testid={`button-project-${label.toLowerCase().replaceAll(' ', '-')}-placeholder`}
    >
      {label} <ArrowUpRight size={13} />
    </button>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxItem(null);
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = activeProject || lightboxItem ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeProject, lightboxItem]);

  const copyPlaceholder = async () => {
    if (!links.email) {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    await navigator.clipboard.writeText(links.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main className="portfolio-shell min-h-[100dvh] text-foreground">
      <nav
        className="fixed inset-x-0 top-0 z-40 border-b border-foreground/10 bg-[hsl(var(--background)/.9)] backdrop-blur-xl"
        data-testid="navigation-main"
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="group flex items-center gap-3" data-testid="link-logo">
            <span className="flex h-9 w-9 items-center justify-center bg-foreground text-background font-mono text-xs font-medium transition-transform duration-300 group-hover:rotate-12">
              VV
            </span>
            <span className="hidden text-sm font-semibold tracking-[-0.02em] sm:block">
              Vy Vu<span className="text-primary">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/65 transition-colors hover:text-primary"
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={linkTarget(links.resume)}
            className="hidden items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground sm:flex"
            data-testid="link-nav-resume"
          >
            View resume <ArrowUpRight size={13} />
          </a>

          <button
            type="button"
            className="flex items-center justify-center p-2 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-foreground/10 bg-[hsl(var(--background))] px-5 py-5 lg:hidden" data-testid="menu-mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-foreground/10 py-4 font-mono text-xs uppercase tracking-[0.14em]"
                data-testid={`link-mobile-${item.label.toLowerCase()}`}
              >
                {item.label} <ArrowUpRight size={14} className="text-primary" />
              </a>
            ))}
            <a
              href={linkTarget(links.resume)}
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex items-center justify-between bg-foreground px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-background"
              data-testid="link-mobile-resume"
            >
              View resume <FileText size={14} />
            </a>
          </div>
        )}
      </nav>

      <section id="top" className="relative mx-auto flex min-h-[790px] max-w-[1280px] items-center px-5 pb-20 pt-36 md:px-10 md:pt-40">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
          <div>
            <div className="reveal mb-9 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
              <span className="h-2 w-2 bg-primary" /> Computer information systems student <span className="text-primary">·</span> Atlanta, GA
            </div>
            <h1 className="reveal reveal-delay-1 max-w-[800px] text-[clamp(3.45rem,8vw,7.6rem)] leading-[.86] tracking-[-0.065em]">
              Building at the
              <br />
              <span className="font-display font-normal italic text-primary">intersection.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-10 max-w-[560px] text-lg leading-[1.55] text-foreground/70 md:text-xl">
              Computer Information Systems student focused on Data Analytics and Application Development.
              I&apos;m interested in how data can uncover patterns, explain behavior, and support better decisions.
            </p>
            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-5">
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
                href={linkTarget(links.linkedin)}
                className="font-mono text-[11px] uppercase tracking-[0.13em] text-foreground/60 transition-colors hover:text-primary"
                data-testid="link-hero-linkedin"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[570px] lg:ml-auto">
            <div className="absolute -left-7 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45 [writing-mode:vertical-rl]">
              curiosity / analysis / making
            </div>
            <div className="relative aspect-square overflow-hidden border border-foreground/15 bg-[#243b53] p-5 shadow-[14px_14px_0_hsl(var(--primary)/.16)] md:p-8">
              <div className="project-visual absolute inset-0" />
              <div className="relative flex h-full flex-col justify-between text-[hsl(var(--background))]">
                <div className="flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--background)/.62)]">
                  <span>VV / 2026</span>
                  <span className="flex items-center gap-2"><Circle size={7} fill="currentColor" className="text-primary" /> building</span>
                </div>
                <div className="relative mx-auto flex aspect-square w-[71%] items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[hsl(var(--background)/.2)]" />
                  <div className="orbit absolute inset-[11%] rounded-full border border-dashed border-[hsl(var(--background)/.25)]" />
                  <div className="orbit absolute inset-[25%] rounded-full border border-[hsl(var(--primary)/.8)] [animation-duration:10s]" />
                  <div className="absolute h-[29%] w-[29%] rounded-full bg-primary shadow-[0_0_0_11px_hsl(var(--primary)/.12)]" />
                  <div className="absolute left-[9%] top-[18%] h-2.5 w-2.5 rounded-full bg-[hsl(var(--background))]" />
                  <div className="absolute bottom-[17%] right-[12%] h-2.5 w-2.5 rounded-full bg-accent" />
                  <div className="absolute right-[12%] top-[25%] h-1.5 w-1.5 rounded-full bg-[hsl(var(--background))]" />
                  <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.12em]">in progress</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-display text-3xl italic">Curiosity, cultivated.</p>
                    <p className="mt-2 max-w-[210px] font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em] text-[hsl(var(--background)/.58)]">
                      A student portfolio about data, technology, and becoming.
                    </p>
                  </div>
                  <div className="font-mono text-right text-[9px] leading-[1.6] text-[hsl(var(--background)/.58)]">GSU<br />ATL</div>
                </div>
              </div>
            </div>
            <div className="float-slow absolute -bottom-6 -right-2 border border-foreground/20 bg-background px-4 py-3 shadow-[5px_5px_0_hsl(var(--foreground)/.08)] md:-right-6" data-testid="status-current-focus">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">Currently</p>
              <p className="mt-1 text-sm font-medium">learning by building</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="section-rule flex items-center justify-between py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
          <span>01 — the short version</span>
          <span className="hidden md:block">scroll to read between the lines <ChevronDown size={13} className="ml-2 inline text-primary" /></span>
          <span>© 2026</span>
        </div>
      </div>

      <section id="about" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div className="reveal">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">02 / about me</p>
            <h2 className="mt-6 max-w-[420px] text-5xl leading-[.92] tracking-[-0.055em] md:text-7xl">A little about me.</h2>
            <MediaPlaceholder
              item={{ id: 'about-photo', label: 'Vy Vu', caption: 'A personal moment from Atlanta, Georgia.', alt: 'Vy Vu standing outdoors in Atlanta at night', src: personalPhoto }}
              className="mt-10 max-w-[350px]"
              onOpen={setLightboxItem}
            />
          </div>
          <div className="reveal reveal-delay-1">
            <p className="max-w-[760px] text-2xl leading-[1.15] tracking-[-0.03em] md:text-[2.65rem] md:leading-[1.08]">
              I&apos;m a sophomore at Georgia State University studying Computer Information Systems with concentrations in Data Analytics and Application Development.
            </p>
            <div className="mt-10 grid gap-8 border-t border-foreground/15 pt-7 sm:grid-cols-2">
              <p className="text-sm leading-[1.7] text-foreground/65">
                What interests me most is the intersection of data, technology, and business. I enjoy understanding how information can uncover patterns, explain behavior, and support better decisions.
              </p>
              <p className="text-sm leading-[1.7] text-foreground/65">
                Outside of my technical coursework, I enjoy organizing projects, working with people, writing, reading, and turning ideas into something useful.
              </p>
            </div>
            <p className="mt-8 max-w-[730px] text-sm leading-[1.7] text-foreground/65">
              I&apos;m currently strengthening my skills in Python, SQL, Excel, data analysis, and application development while building hands-on projects and exploring opportunities in data analytics and market data.
            </p>
            <div className="mt-12 grid gap-4 border-t border-foreground/15 pt-6 sm:grid-cols-2">
              <div className="border border-foreground/15 bg-card p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Georgia State University</p>
                <p className="mt-3 text-lg tracking-[-0.02em]">Computer Information Systems</p>
                <p className="mt-2 text-sm text-foreground/55">Honors College</p>
              </div>
              <div className="border border-foreground/15 bg-card p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Academic milestone</p>
                <p className="mt-3 text-lg tracking-[-0.02em]">President&apos;s List</p>
                <p className="mt-2 text-sm text-foreground/55">3 semesters</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="border-y border-foreground/15 bg-secondary/20 scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-10 md:py-32">
          <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">03 / what I&apos;m building</p>
              <h2 className="mt-5 max-w-[660px] text-5xl leading-[.9] tracking-[-0.055em] md:text-8xl">What I&apos;m<br /><span className="font-display font-normal italic">building.</span></h2>
            </div>
            <p className="max-w-[270px] text-sm leading-[1.5] text-foreground/60 md:pb-2">I&apos;m developing the skills, experiences, and point of view to do meaningful work with data and technology.</p>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {building.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.number} className={`reveal reveal-delay-${index + 1} border border-foreground/15 bg-card p-7 transition-transform duration-500 hover:-translate-y-1 md:min-h-[295px] md:p-8`} data-testid={`card-building-${item.number}`}>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] text-primary">{item.number}</span>
                    <Icon size={20} strokeWidth={1.4} className="text-foreground/45" />
                  </div>
                  <div className="mt-16">
                    <h3 className="text-2xl tracking-[-0.035em]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-[1.65] text-foreground/62">{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40">
          <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">04 / selected work</p>
              <h2 className="mt-5 text-5xl leading-[.9] tracking-[-0.055em] md:text-8xl">Work in<br /><span className="font-display font-normal italic">progress.</span></h2>
            </div>
            <p className="max-w-[290px] text-sm leading-[1.6] text-foreground/60 md:pb-2">Experiences that have helped me practice leadership, communication, coordination, and analytical thinking.</p>
          </div>

          <div className="mt-16 space-y-5">
            {work.map((project, index) => (
              <article
                key={project.number}
                className={`reveal reveal-delay-${(index % 3) + 1} group relative grid gap-8 border p-6 transition-transform duration-500 hover:-translate-y-1 md:grid-cols-[100px_1fr_1.05fr] md:gap-10 md:p-9 ${project.tone === 'ink' ? 'border-foreground/15 bg-foreground text-background' : project.tone === 'blue' ? 'border-foreground/15 bg-[#d7e4eb]' : 'border-foreground/15 bg-card'} ${project.featured ? 'border-primary/60 shadow-[6px_6px_0_hsl(var(--primary)/.16)]' : ''}`}
                data-testid={`card-project-${project.number}`}
              >
                {project.featured && (
                  <div className="absolute right-5 top-5 flex items-center gap-2 bg-primary px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-primary-foreground md:right-9 md:top-9" data-testid="badge-featured-project">
                    <Sparkles size={11} /> Featured project
                  </div>
                )}
                <div className="flex items-start justify-between md:block">
                  <span className={`font-mono text-[10px] ${project.tone === 'ink' ? 'text-primary' : 'text-primary'}`}>{project.number}</span>
                  <MoveUpRight size={18} className="text-primary md:mt-10" />
                </div>
                <div>
                  <MediaPlaceholder item={project.media[0]} className="mb-6" onOpen={setLightboxItem} />
                  <p className={`font-mono text-[9px] uppercase tracking-[0.15em] ${project.tone === 'ink' ? 'text-background/55' : 'text-foreground/50'}`}>{project.role}</p>
                  <h3 className="mt-4 max-w-[420px] text-3xl leading-[.96] tracking-[-0.045em] md:text-5xl">{project.title}</h3>
                  {project.award && (
                    <div className="mt-5 inline-flex items-center gap-2 border border-primary/45 bg-primary/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-primary" data-testid="text-project-award">
                      <Sparkles size={12} /> {project.award}
                    </div>
                  )}
                  <p className={`mt-5 text-sm leading-[1.5] ${project.tone === 'ink' ? 'text-background/60' : 'text-foreground/60'}`}>{project.organization}</p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className={`text-sm leading-[1.7] ${project.tone === 'ink' ? 'text-background/70' : 'text-foreground/65'}`}>{project.description}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span key={skill} className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] ${project.tone === 'ink' ? 'border-background/20 text-background/65' : 'border-foreground/15 text-foreground/55'}`}>{skill}</span>
                    ))}
                  </div>
                  {project.featured && (
                    <div className="mt-7 flex flex-wrap gap-2" data-testid="project-actions">
                      <ProjectAction label="Live Demo" url={project.liveDemo} />
                      <ProjectAction label="GitHub" url={project.github} />
                    </div>
                  )}
                  <button type="button" onClick={() => setActiveProject(project)} className="mt-7 inline-flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.13em] text-primary" data-testid={`button-project-${project.number}`}>
                    View project <ArrowUpRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <article className="reveal mt-5 grid gap-8 overflow-hidden border border-primary/35 bg-primary p-7 text-primary-foreground md:grid-cols-[.8fr_1.2fr] md:p-10" data-testid="card-project-vivu-notes">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary-foreground/65">04 / personal publication</p>
              <h3 className="mt-5 font-display text-5xl italic leading-[.9] md:text-7xl">ViVu Notes</h3>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.13em] text-primary-foreground/72">Notes on books, data, and becoming.</p>
              <MediaPlaceholder
                item={{ id: 'vivu-notes-cover', label: 'Publication cover', caption: 'Upload a Substack screenshot or article cover image.', alt: 'ViVu Notes cover placeholder' }}
                className="mt-8 max-w-[360px]"
                onOpen={setLightboxItem}
              />
            </div>
            <div className="flex flex-col justify-between">
              <p className="max-w-[560px] text-xl leading-[1.2] tracking-[-0.02em]">
                My personal publication where I write about books, lessons from studying abroad, personal growth, data, and ideas I&apos;m learning along the way.
              </p>
              <a href={linkTarget(links.notes)} className="mt-8 inline-flex items-center gap-3 self-start border border-primary-foreground/35 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.13em] transition-colors hover:bg-primary-foreground hover:text-primary" data-testid="link-vivu-notes-work">
                Read ViVu Notes <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="data-projects" className="border-y border-foreground/15 bg-secondary/20 scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-36">
          <div className="reveal max-w-[700px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">05 / data projects</p>
            <h2 className="mt-5 text-5xl leading-[.9] tracking-[-0.055em] md:text-8xl">Questions worth<br /><span className="font-display font-normal italic">exploring.</span></h2>
            <p className="mt-8 max-w-[620px] text-lg leading-[1.6] text-foreground/65">This is where I document projects that show how I approach questions, work with data, and communicate insights.</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {dataProjects.map((project, index) => (
              <article key={project.title} className={`reveal reveal-delay-${index + 1} flex min-h-[430px] flex-col justify-between border border-dashed border-foreground/25 bg-background p-5 md:p-6`} data-testid={`card-data-project-${index + 1}`}>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">Future case study / 0{index + 1}</span>
                  <MediaPlaceholder item={project.media[0]} className="mt-5" onOpen={setLightboxItem} />
                  <h3 className="mt-8 text-2xl leading-[1] tracking-[-0.035em]">{project.title}</h3>
                  <p className="mt-4 text-sm leading-[1.6] text-foreground/60">{project.description}</p>
                </div>
                <div className="mt-8">
                  <div className="flex items-center justify-between border-t border-foreground/15 pt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground/45">
                    <span>Problem · dataset · tools</span>
                    <span>To be documented</span>
                  </div>
                  <button type="button" onClick={() => setActiveProject(project)} className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-primary" data-testid={`button-data-project-${index + 1}`}>
                    Open project <ArrowUpRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="writing" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
          <div className="reveal">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">06 / writing & ideas</p>
            <h2 className="mt-5 text-5xl leading-[.9] tracking-[-0.055em] md:text-7xl">A place to<br /><span className="font-display font-normal italic">think out loud.</span></h2>
            <p className="mt-8 max-w-[430px] text-lg leading-[1.6] text-foreground/65">
              I started ViVu Notes as a place to document what I am learning through books, college, data, and life as an international student.
            </p>
            <p className="mt-5 max-w-[430px] text-sm leading-[1.7] text-foreground/60">
              Instead of simply reviewing what I read or experience, I want to understand what it teaches me and how I can apply those ideas to my own growth.
            </p>
            <a href={linkTarget(links.notes)} className="mt-8 inline-flex items-center gap-3 bg-foreground px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.13em] text-background transition-colors hover:bg-primary" data-testid="link-writing-notes">
              Visit ViVu Notes <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="reveal reveal-delay-1">
            <div className="mb-6 flex items-center justify-between border-b border-foreground/15 pb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">Recent notes</span>
              <BookOpen size={17} className="text-primary" />
            </div>
            <div>
              {articles.map((article, index) => (
                <article key={article.title} className="group border-b border-foreground/15 py-7 first:pt-2" data-testid={`card-article-${index + 1}`}>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-primary">{article.date}</p>
                      <h3 className="mt-3 max-w-[450px] text-2xl leading-[1] tracking-[-0.035em] transition-colors group-hover:text-primary">{article.title}</h3>
                      <p className="mt-3 max-w-[470px] text-sm leading-[1.6] text-foreground/60">{article.description}</p>
                    </div>
                    <ArrowUpRight size={18} className="mt-1 shrink-0 text-foreground/35 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <a href={linkTarget(links.notes)} className="mt-5 inline-block font-mono text-[9px] uppercase tracking-[0.13em] text-foreground/50 transition-colors hover:text-primary" data-testid={`link-article-${index + 1}`}>
                    Read article
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="border-y border-foreground/15 bg-foreground text-background scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div className="reveal">
              <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">07 / a few milestones</p>
              <h2 className="mt-5 text-5xl leading-[.9] tracking-[-0.055em] md:text-7xl">Early steps,<br /><span className="font-display font-normal italic">clear direction.</span></h2>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="grid gap-0 border-y border-background/20 sm:grid-cols-2">
                <div className="border-b border-background/20 py-7 sm:border-b-0 sm:border-r sm:pr-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">University</p>
                  <p className="mt-5 text-2xl tracking-[-0.03em]">Georgia State University</p>
                  <p className="mt-2 text-sm text-background/60">Honors College</p>
                </div>
                <div className="py-7 sm:pl-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Academic recognition</p>
                  <p className="mt-5 text-2xl tracking-[-0.03em]">President&apos;s List</p>
                  <p className="mt-2 text-sm text-background/60">3 semesters</p>
                </div>
              </div>
              <div className="border-b border-background/20 py-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Concentrations</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {['Data Analytics', 'Application Development', 'Computer Information Systems'].map((item) => (
                    <span key={item} className="border border-background/25 px-3 py-2 text-sm text-background/75">{item}</span>
                  ))}
                </div>
              </div>
              <div className="mt-7">
                <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-background/45">
                  <FileText size={15} className="text-primary" /> Certificates and awards
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {certificates.slice(0, showAchievements ? certificates.length : 3).map((certificate) => (
                    <MediaPlaceholder key={certificate.id} item={certificate} className="bg-background" onOpen={setLightboxItem} />
                  ))}
                </div>
                <button type="button" onClick={() => setShowAchievements((visible) => !visible)} className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-primary transition-colors hover:text-background" data-testid="button-view-achievements">
                  {showAchievements ? 'Show fewer achievements' : 'View achievements'} <ArrowDownRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-28 md:px-10 md:py-36">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">08 / tools & skills</p>
            <h2 className="mt-5 text-5xl leading-[.9] tracking-[-0.055em] md:text-8xl">Still<br /><span className="font-display font-normal italic">building.</span></h2>
          </div>
          <p className="max-w-[300px] text-sm leading-[1.6] text-foreground/60 md:pb-2">These are skills I&apos;m actively developing through coursework, projects, leadership, and practice.</p>
        </div>
        <div className="mt-14 grid border-t border-foreground/15 md:grid-cols-2">
          {skills.map((category, index) => (
            <div key={category.title} className={`reveal reveal-delay-${(index % 3) + 1} border-b border-foreground/15 py-7 md:p-8 ${index % 2 === 0 ? 'md:border-r' : ''}`} data-testid={`skills-${category.title.toLowerCase()}`}>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">{category.title}</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                {category.items.map((item) => <span key={item} className="text-lg tracking-[-0.02em] text-foreground/75">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-foreground/15 bg-secondary/20">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
          <div className="reveal">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">09 / currently</p>
            <h2 className="mt-5 text-5xl leading-[.9] tracking-[-0.055em] md:text-7xl">A living<br /><span className="font-display font-normal italic">list.</span></h2>
          </div>
          <div className="reveal reveal-delay-1 grid gap-0 border-t border-foreground/15 sm:grid-cols-2">
            {[
              ['Learning', 'SQL, Python, and data analysis'],
              ['Building', 'My data portfolio and ViVu Notes'],
              ['Exploring', 'Data analytics, market data, and business technology'],
              ['Reading', 'Add current book here later'],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-foreground/15 py-5 sm:px-6 first:sm:pl-0 even:sm:border-l">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">{label}</p>
                <p className="mt-2 text-lg leading-[1.25] tracking-[-0.02em] text-foreground/75">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-28 md:px-10 md:py-40">
        <div className="reveal relative overflow-hidden border border-foreground/15 bg-card px-6 py-16 md:px-16 md:py-24">
          <div className="absolute -right-10 -top-24 h-80 w-80 rounded-full border border-primary/25 md:h-[480px] md:w-[480px]" />
          <div className="absolute -right-2 -top-16 h-64 w-64 rounded-full border border-primary/15 md:h-[380px] md:w-[380px]" />
          <div className="relative max-w-[760px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">10 / let&apos;s connect</p>
            <h2 className="mt-6 text-6xl leading-[.85] tracking-[-0.065em] md:text-8xl">Keep the<br /><span className="font-display font-normal italic">conversation going.</span></h2>
            <p className="mt-8 max-w-[590px] text-base leading-[1.65] text-foreground/65">
              I&apos;m always happy to connect with students, professionals, mentors, and people working across data, technology, and business.
            </p>
            <p className="mt-4 max-w-[590px] text-base leading-[1.65] text-foreground/65">
              I&apos;m currently interested in internship opportunities where I can continue learning, contribute to meaningful work, and gain hands-on experience.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={linkTarget(links.linkedin)} className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" data-testid="link-contact-linkedin">
                <Linkedin size={14} /> LinkedIn
              </a>
              <button type="button" onClick={copyPlaceholder} className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" data-testid="button-contact-email">
                {copied ? <Check size={14} /> : <Mail size={14} />} {copied ? 'Email copied' : 'Email'}
              </button>
              <a href={linkTarget(links.notes)} className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" data-testid="link-contact-notes">
                <BookOpen size={14} /> ViVu Notes
              </a>
              <a href={linkTarget(links.resume)} className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" data-testid="link-contact-resume">
                <FileText size={14} /> Resume
              </a>
            </div>
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/40">Links and contact details can be added when ready.</p>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1280px] flex-col gap-4 border-t border-foreground/15 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/50 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <span data-testid="text-footer-copyright">Vy Vu — built with curiosity and always evolving.</span>
        <div className="flex gap-5">
          <a href="#top" className="transition-colors hover:text-primary" data-testid="link-footer-top">Back to top ↑</a>
          <a href="#contact" className="transition-colors hover:text-primary" data-testid="link-footer-contact">Connect</a>
        </div>
      </footer>

      {activeProject && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-foreground/75 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} project details`}
          onClick={() => setActiveProject(null)}
          data-testid="project-detail-overlay"
        >
          <div className="mx-auto min-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <div className="border border-foreground/15 bg-background p-5 shadow-2xl md:p-10">
              <div className="flex items-start justify-between gap-6 border-b border-foreground/15 pb-6">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Project detail / {activeProject.number}</p>
                  <h2 className="mt-4 max-w-[760px] text-4xl leading-[.92] tracking-[-0.05em] md:text-7xl">{activeProject.title}</h2>
                  <p className="mt-4 text-sm text-foreground/55">{activeProject.organization}</p>
                   {activeProject.award && (
                     <div className="mt-5 inline-flex items-center gap-2 border border-primary/45 bg-primary/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-primary" data-testid="detail-project-award">
                       <Sparkles size={12} /> {activeProject.award}
                     </div>
                   )}
                </div>
                <button type="button" onClick={() => setActiveProject(null)} className="flex h-10 w-10 shrink-0 items-center justify-center border border-foreground/20 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" aria-label="Close project details" data-testid="button-close-project">
                  <X size={18} />
                </button>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Overview</p>
                    <p className="mt-3 text-sm leading-[1.7] text-foreground/70">{activeProject.description}</p>
                  </div>
                  {(activeProject.liveDemo !== undefined || activeProject.github !== undefined) && (
                    <div className="flex flex-wrap gap-2">
                      <ProjectAction label="Live Demo" url={activeProject.liveDemo} />
                      <ProjectAction label="GitHub" url={activeProject.github} />
                    </div>
                  )}
                  <div className="grid gap-5 border-y border-foreground/15 py-5 sm:grid-cols-2 lg:grid-cols-1">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">My role</p>
                      <p className="mt-2 text-base">{activeProject.role}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">What I did</p>
                      <p className="mt-2 text-sm leading-[1.6] text-foreground/70">{activeProject.description}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">Tools</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeProject.skills.map((skill) => <span key={skill} className="border border-foreground/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-foreground/60">{skill}</span>)}
                      </div>
                    </div>
                    {activeProject.award && (
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">Award</p>
                        <p className="mt-2 text-sm leading-[1.6] text-foreground/70">{activeProject.award}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Gallery</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-foreground/40">Contributions photos</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {activeProject.media.map((item) => <MediaPlaceholder key={item.id} item={item} onOpen={setLightboxItem} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxItem?.src && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.alt}
          onClick={() => setLightboxItem(null)}
          data-testid="media-lightbox"
        >
          <button type="button" onClick={() => setLightboxItem(null)} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-background/30 text-background transition-colors hover:bg-background hover:text-foreground" aria-label="Close full-size image">
            <X size={18} />
          </button>
          <figure className="max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <img src={lightboxItem.src} alt={lightboxItem.alt} className="max-h-[82vh] w-auto max-w-full object-contain" />
            <figcaption className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.13em] text-background/70">{lightboxItem.caption}</figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}

export default App;
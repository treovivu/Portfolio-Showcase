import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Database,
  FileText,
  Github,
  Linkedin,
  Mail,
  Maximize2,
  Menu,
  MoveUpRight,
  Sparkles,
  Trophy,
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
import auraBeatCover from '@assets/aurabeat-cover.png';
import auraBeatTwoModes from '@assets/aurabeat-two-modes.png';
import auraBeatInAction from '@assets/aurabeat-in-action.png';
import nsdcScavengerHunt from '@assets/nsdc-sql-scavenger-hunt.png';
import nsdcWorkshop from '@assets/nsdc-workshop.png';
import nsdcKickoff from '@assets/nsdc-kickoff-2026.png';
import nsdcCocaColaVisit from '@assets/nsdc-coca-cola-visit.png';
import { CreativeSide } from '@/components/creative-side';
import { HeroStage } from '@/components/hero-stage';
import { external, links } from '@/lib/site';

type MediaItem = {
  id: string;
  label: string;
  caption: string;
  alt: string;
  src?: string;
};

type ProjectLink = {
  label: string;
  url: string;
};

type ProjectDetail = {
  number: string;
  title: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  skills: string[];
  tone: 'blue' | 'paper' | 'ink';
  media: MediaItem[];
  featured?: boolean;
  award?: string;
  links?: ProjectLink[];
};

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Creative', href: '#creative' },
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
    title: 'AuraBeat — Hacklanta ’26',
    role: 'Hackathon project · Team Codezilla · 36 hours',
    organization: 'Hacklanta ’26 · Georgia State University',
    period: 'October 2026',
    description:
      'An accessible concert experience built so Deaf and hard-of-hearing fans get the whole show, not a reduced version of it. AuraBeat translates music into synchronized stage light, live lyrics, and Apple Watch haptics across two concert modes, with Nova, an ElevenLabs voice agent, adjusting the experience through natural conversation.',
    highlights: [
      'Developed 2 interactive concert modes using React, TypeScript, and Python: an At-home Concert driven by the performance video’s clock, and a Live Concert that analyzes real music from a microphone.',
      'Implemented 5 music-responsive Apple Watch haptic cue types (beat, bass, build, chorus, and drop), connecting real-time audio analysis with a watchOS application.',
      'Integrated Nova, an ElevenLabs AI voice agent that controls concert lighting, visual intensity, and sensory preferences such as reduced motion through natural-language commands.',
    ],
    skills: ['React', 'TypeScript', 'Python', 'watchOS / Swift', 'ElevenLabs', 'Accessibility'],
    tone: 'ink',
    featured: true,
    links: [
      { label: 'GitHub', url: 'https://github.com/treovivu/AuraBeat/tree/nova-elevenlabs' },
      { label: 'Devpost', url: 'https://devpost.com/software/aurabeat' },
      { label: 'Demo Video', url: 'https://www.youtube.com/watch?v=0fEBo2NEh4E' },
    ],
    media: [
      { id: 'aurabeat-cover', label: 'Project cover', caption: 'AuraBeat — a multisensory concert companion, live and at home.', alt: 'AuraBeat title slide reading “A multisensory concert companion: live and at home” beside a laptop showing a concert crowd', src: auraBeatCover },
      { id: 'aurabeat-two-modes', label: 'Two concert modes', caption: 'Live Concert and At-home Concert: one rhythm, two experiences.', alt: 'Slide comparing AuraBeat’s Live Concert mode, with audio-reactive lighting, captions and haptics, and its At-home mode, with recorded playback and timed lyrics, shown on two phone screens', src: auraBeatTwoModes },
      { id: 'aurabeat-in-action', label: 'AuraBeat in action', caption: 'The At-home Concert with a “Get ready” cue, live lyrics, and beat-timing feedback.', alt: 'Two AuraBeat At-home Concert screens showing a Get Ready prompt, synchronized lyrics, and an on-beat score', src: auraBeatInAction },
    ],
  },
  {
    number: '02',
    title: 'HerBuddy — HackHERS 2026',
    role: 'Hackathon project',
    organization: 'HackHERS 2026 · Georgia State University',
    period: 'September 2026',
    description:
      'A campus safety app for students with buddy matching, walking navigation, and destination-based safety alerts, secured with GSU email sign-in through Auth0.',
    highlights: [
      'Independently developed a functional campus safety application featuring buddy matching, walking navigation, and destination-based safety alerts.',
      'Implemented Auth0 OAuth authentication for GSU email-based sign-in and integrated Google Maps APIs to calculate walking-time estimates and support safety workflows.',
      'Integrated ElevenLabs AI voice assistance, designed customizable UI themes, and used Git/GitHub to merge independently developed features with teammates’ contributions.',
    ],
    skills: ['Auth0 (OAuth)', 'Google Maps API', 'ElevenLabs', 'JavaScript', 'HTML/CSS', 'Git/GitHub'],
    tone: 'blue',
    featured: true,
    award: 'MLH Best Use of Auth0 Winner',
    links: [
      { label: 'Live Demo', url: 'https://her-buddy.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/1Cazarez/HerBuddy' },
      { label: 'Devpost', url: 'https://devpost.com/software/her-buddy' },
    ],
    media: [
      { id: 'herbuddy-cover', label: 'Project screenshot', caption: 'HerBuddy campus support dashboard with safety and wellness tools.', alt: 'HerBuddy campus support dashboard showing route matching, wellness summary, and safety check-in', src: herBuddyCover },
      { id: 'herbuddy-contributions', label: 'Contributions photos', caption: 'The HerBuddy team during HackHERS 2026.', alt: 'Vy Vu with three HerBuddy teammates at HackHERS 2026', src: herBuddyContributions },
      { id: 'herbuddy-buddy-match', label: 'Feature detail · Buddy Match', caption: 'Peer matching for walking, studying, and campus activities.', alt: 'HerBuddy Buddy Match screen showing a verified student profile and match percentage', src: herBuddyBuddyMatch },
      { id: 'herbuddy-campus-map', label: 'Feature detail · Campus Map', caption: 'Campus safety zones, lit walkways, and live group routes.', alt: 'HerBuddy Campus Map screen showing a secure zone, active groups, and walk routes', src: herBuddyCampusMap },
      { id: 'herbuddy-wellness', label: 'Feature detail · Wellness Dashboard', caption: 'Student health, activity goals, and campus support resources.', alt: 'HerBuddy Wellness Dashboard showing activity goals, peer support, and emergency contact', src: herBuddyWellness },
    ],
  },
  {
    number: '03',
    title: 'VIMF Website & Partnerships',
    role: 'Strategic Partnerships & Website Designer',
    organization: 'OMG Events Management Co., Ltd. · Ho Chi Minh City',
    period: 'August 2023 – March 2024',
    description:
      'Designed and built the Squarespace website for the Vietnam Industrial & Manufacturing Fair (VIMF), an international industrial exhibition connecting machinery, equipment, and technology suppliers with manufacturers in Vietnam. I also produced its promotional videos and supported speaker outreach.',
    highlights: [
      'Independently designed and developed a 5-page Squarespace website for VIMF, featuring 10 manufacturing industry categories and 3 downloadable business resources to support exhibition marketing.',
      'Structured the site around how exhibitors decide: an overview of OMG and VIMF, featured product areas (3D printing, automation, robotics), why to exhibit, and pre-registration and mailing-list sign-up.',
      'Produced 2 promotional videos (introduction and recap) and presented the website to business representatives in Albuquerque, New Mexico.',
      'Conducted outreach to approximately 10 prospective speakers, documenting company information, presentation topics, and business interests to support exhibition planning.',
    ],
    skills: ['Squarespace', 'Web Design', 'Video Production', 'Stakeholder Outreach', 'Presentation'],
    tone: 'paper',
    links: [{ label: 'Website', url: 'https://porpoise-star-y6kf.squarespace.com/' }],
    media: [
      { id: 'vimf-cover', label: 'VIMF cover image', caption: 'Vietnam Industrial & Manufacturing Fair promotional banner.', alt: 'Vietnam Industrial and Manufacturing Fair promotional banner with manufacturing event dates and robotics imagery', src: vimfCover },
    ],
  },
  {
    number: '04',
    title: 'Virtual Halloween Event',
    role: 'Event Leader',
    organization: 'Viet Anh Light House · Ho Chi Minh City',
    period: 'October 2022 – November 2022',
    description:
      'Led a 30-member team to plan and run a virtual Halloween event built around 100 interactive PowerPoint slides.',
    highlights: [
      'Led a 30-member event team and developed an Excel-based tracking system to coordinate responsibilities, monitor assignments, and manage virtual event preparation.',
      'Directed the collaborative creation and testing of 100 interactive PowerPoint slides featuring Morse code challenges, scavenger hunts, and music quizzes.',
    ],
    skills: ['Microsoft Excel', 'Leadership', 'Team Coordination', 'Presentation Design', 'Event Planning'],
    tone: 'blue',
    media: [],
  },
  {
    number: '05',
    title: 'National Student Data Corps',
    role: 'Event Coordinator',
    organization: 'National Student Data Corps · Georgia State University',
    period: 'January 2025',
    description:
      'Coordinated campus events for NSDC, from publishing them on the Panther Involvement Network to tracking logistics and student communication.',
    highlights: [
      'Managed NSDC’s Panther Involvement Network (PIN) page, publishing and coordinating approximately 5 campus events, including event descriptions and promotional content.',
      'Developed an Excel-based event tracker and coordinated room reservation requests, event logistics, and student-facing communications.',
    ],
    skills: ['Event Coordination', 'Microsoft Excel', 'Communication', 'Logistics'],
    tone: 'paper',
    media: [
      { id: 'nsdc-scavenger-hunt', label: 'SQL Scavenger Hunt', caption: '“Where is NSDC Trophy??” — a SQL scavenger hunt event.', alt: 'Group photo of NSDC members in front of a screen reading “Where is NSDC Trophy?? SQL Scavenger Hunt”', src: nsdcScavengerHunt },
      { id: 'nsdc-workshop', label: 'Workshop', caption: 'Students working through a hands-on NSDC session.', alt: 'Students working on laptops at classroom tables during an NSDC session', src: nsdcWorkshop },
      { id: 'nsdc-kickoff', label: 'NSDC ’26 Kickoff', caption: 'Members at the NSDC ’26 Kickoff.', alt: 'Two group photos of NSDC members in front of a screen reading “NSDC ’26 Kickoff”', src: nsdcKickoff },
      { id: 'nsdc-coca-cola', label: 'Company visit', caption: 'NSDC members on a company visit to Coca-Cola.', alt: 'Group of students holding Coca-Cola tote bags in front of a vintage Coca-Cola delivery truck', src: nsdcCocaColaVisit },
    ],
  },
];

const certificates: MediaItem[] = [
  { id: 'presidents-list-1', label: 'President’s List · Spring 2026', caption: 'Georgia State University President’s List certificate.', alt: 'Vy Vu Georgia State University President’s List certificate for Spring 2026', src: presidentsListSpring2026 },
  { id: 'presidents-list-2', label: 'President’s List · Fall 2025', caption: 'Georgia State University President’s List certificate.', alt: 'Vy Vu Georgia State University President’s List certificate for Fall 2025', src: presidentsListFall2025 },
  { id: 'presidents-list-3', label: 'President’s List · Spring 2025', caption: 'Georgia State University President’s List certificate.', alt: 'Vy Vu Georgia State University President’s List certificate for Spring 2025', src: presidentsListSpring2025 },
];

const skills = [
  { title: 'Programming', items: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'React', 'HTML/CSS', 'Java'] },
  { title: 'Platforms & APIs', items: ['Git/GitHub', 'Auth0 (OAuth)', 'Google Maps API', 'ElevenLabs', 'watchOS/Swift', 'Squarespace'] },
  { title: 'Data & Business', items: ['Microsoft Excel', 'Data Analysis', 'Stakeholder Outreach', 'Project Coordination'] },
  { title: 'Certification', items: ['Microsoft Office Specialist (MOS)'] },
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
  if (!item.src) return null;

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

function ProjectAction({
  label,
  url,
  tone = 'paper',
}: {
  label: string;
  url: string;
  tone?: ProjectDetail['tone'];
}) {
  return (
    <a
      href={url}
      {...external}
      className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.11em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground ${tone === 'ink' ? 'border-background/25' : 'border-foreground/20'}`}
      data-testid={`link-project-${label.toLowerCase().replaceAll(' ', '-')}`}
    >
      {label} <ArrowUpRight size={13} />
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

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

  const copyEmail = async () => {
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
            href={links.resume}
            {...external}
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
              href={links.resume}
              {...external}
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex items-center justify-between bg-foreground px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-background"
              data-testid="link-mobile-resume"
            >
              View resume <FileText size={14} />
            </a>
          </div>
        )}
      </nav>

      <HeroStage />

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
              I&apos;m a sophomore at Georgia State University studying Computer Information Systems with concentrations in Artificial Intelligence Analytics and Application Development.
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
                <p className="mt-2 text-sm text-foreground/55">3 semesters · GPA 4.05</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CreativeSide />

      <section id="approach" className="border-y border-foreground/15 bg-secondary/20 scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-5 py-24 md:px-10 md:py-32">
          <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">04 / what I&apos;m building</p>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">05 / selected work</p>
              <h2 className="mt-5 text-5xl leading-[.9] tracking-[-0.055em] md:text-8xl">Work in<br /><span className="font-display font-normal italic">progress.</span></h2>
            </div>
            <p className="max-w-[290px] text-sm leading-[1.6] text-foreground/60 md:pb-2">Products I&apos;ve built and experiences that taught me to lead, coordinate, and ship.</p>
          </div>

          <div className="mt-16 space-y-5">
            {work.map((project, index) => (
              <article
                key={project.number}
                className={`reveal reveal-delay-${(index % 3) + 1} group relative grid gap-8 border p-6 transition-transform duration-500 hover:-translate-y-1 md:grid-cols-[100px_1fr_1.05fr] md:gap-10 md:p-9 ${project.tone === 'ink' ? 'border-foreground/15 bg-foreground text-background' : project.tone === 'blue' ? 'border-foreground/15 bg-[#d7e4eb]' : 'border-foreground/15 bg-card'} ${project.featured ? 'border-primary/60 shadow-[6px_6px_0_hsl(var(--primary)/.16)]' : ''}`}
                data-testid={`card-project-${project.number}`}
              >
                <div className="flex items-start justify-between md:block">
                  <span className={`font-mono text-[10px] ${project.tone === 'ink' ? 'text-primary' : 'text-primary'}`}>{project.number}</span>
                  <MoveUpRight size={18} className="text-primary md:mt-10" />
                </div>
                <div>
                  {project.media[0] && <MediaPlaceholder item={project.media[0]} className="mb-6" onOpen={setLightboxItem} />}
                  <p className={`font-mono text-[9px] uppercase tracking-[0.15em] ${project.tone === 'ink' ? 'text-background/55' : 'text-foreground/50'}`}>{project.role}</p>
                  <h3 className="mt-4 max-w-[420px] text-3xl leading-[.96] tracking-[-0.045em] md:text-5xl">{project.title}</h3>
                  {project.award && (
                    <div className="mt-5 inline-flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground shadow-[4px_4px_0_hsl(var(--foreground)/.12)]" data-testid="text-project-award">
                      <Trophy size={20} strokeWidth={1.6} className="shrink-0" />
                      <span>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-primary-foreground/70">Winner</span>
                        <span className="block text-base font-medium leading-tight tracking-[-0.01em]">{project.award.replace(/ Winner$/, '')}</span>
                      </span>
                    </div>
                  )}
                  <p className={`mt-5 text-sm leading-[1.5] ${project.tone === 'ink' ? 'text-background/60' : 'text-foreground/60'}`}>{project.organization}</p>
                  <p className={`mt-1 font-mono text-[9px] uppercase tracking-[0.12em] ${project.tone === 'ink' ? 'text-background/45' : 'text-foreground/45'}`}>{project.period}</p>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    {project.featured && (
                      <div className="mb-5 inline-flex items-center gap-2 bg-primary px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-primary-foreground" data-testid="badge-featured-project">
                        {project.award ? <><Trophy size={11} /> Award winner</> : <><Sparkles size={11} /> Featured project</>}
                      </div>
                    )}
                    <p className={`text-sm leading-[1.7] ${project.tone === 'ink' ? 'text-background/70' : 'text-foreground/65'}`}>{project.description}</p>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span key={skill} className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] ${project.tone === 'ink' ? 'border-background/20 text-background/65' : 'border-foreground/15 text-foreground/55'}`}>{skill}</span>
                    ))}
                  </div>
                  {project.links && project.links.length > 0 && (
                    <div className="mt-7 flex flex-wrap gap-2" data-testid="project-actions">
                      {project.links.map((link) => <ProjectAction key={link.label} label={link.label} url={link.url} tone={project.tone} />)}
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
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary-foreground/65">06 / personal publication</p>
              <h3 className="mt-5 font-display text-5xl italic leading-[.9] md:text-7xl">ViVu Notes</h3>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.13em] text-primary-foreground/72">Notes on books, data, and becoming.</p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="max-w-[560px] text-xl leading-[1.2] tracking-[-0.02em]">
                My personal publication where I write about books, lessons from studying abroad, personal growth, data, and ideas I&apos;m learning along the way.
              </p>
              <a href={links.notes} {...external} className="mt-8 inline-flex items-center gap-3 self-start border border-primary-foreground/35 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.13em] transition-colors hover:bg-primary-foreground hover:text-primary" data-testid="link-vivu-notes-work">
                Read ViVu Notes <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
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
            <a href={links.notes} {...external} className="mt-8 inline-flex items-center gap-3 bg-foreground px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.13em] text-background transition-colors hover:bg-primary" data-testid="link-writing-notes">
              Visit ViVu Notes <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="reveal reveal-delay-1">
            <div className="mb-6 flex items-center justify-between border-b border-foreground/15 pb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">On Substack</span>
              <BookOpen size={17} className="text-primary" />
            </div>
            <a href={links.notes} {...external} className="group block border-b border-foreground/15 py-7 pt-2" data-testid="link-writing-substack">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-primary">vivunote.substack.com</p>
                  <h3 className="mt-3 max-w-[450px] text-2xl leading-[1] tracking-[-0.035em] transition-colors group-hover:text-primary">Books, college, data, and life as an international student.</h3>
                  <p className="mt-3 max-w-[470px] text-sm leading-[1.6] text-foreground/60">Every note is published on Substack. Subscribe there to get new ones as they come out.</p>
                </div>
                <ArrowUpRight size={18} className="mt-1 shrink-0 text-foreground/35 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </a>
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
                  <p className="mt-2 text-sm text-background/60">3 semesters · GPA 4.05</p>
                </div>
              </div>
              <a href="https://devpost.com/software/her-buddy" {...external} className="group flex items-center gap-5 border-b border-background/20 py-7" data-testid="link-achievement-award">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <Trophy size={22} strokeWidth={1.6} />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Hackathon award · HackHERS 2026</span>
                  <span className="mt-2 block text-2xl tracking-[-0.03em] transition-colors group-hover:text-primary">MLH Best Use of Auth0 Winner</span>
                  <span className="mt-1 block text-sm text-background/60">HerBuddy, a campus safety app</span>
                </span>
                <ArrowUpRight size={18} className="shrink-0 text-background/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </a>
              <div className="border-b border-background/20 py-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Concentrations</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {['Artificial Intelligence Analytics', 'Application Development', 'Computer Information Systems'].map((item) => (
                    <span key={item} className="border border-background/25 px-3 py-2 text-sm text-background/75">{item}</span>
                  ))}
                </div>
              </div>
              <div className="mt-7">
                <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-background/45">
                  <FileText size={15} className="text-primary" /> Certificates and awards
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {certificates.map((certificate) => (
                    <MediaPlaceholder key={certificate.id} item={certificate} className="bg-background" onOpen={setLightboxItem} />
                  ))}
                </div>
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
          <p className="max-w-[300px] text-sm leading-[1.6] text-foreground/60 md:pb-2">Tools I&apos;ve used in coursework, hackathons, and work, and keep sharpening.</p>
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
              ['Building', 'AI-powered apps and ViVu Notes'],
              ['Exploring', 'Business analytics and application development'],
              ['Working toward', 'AI product engineering'],
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
              <a href={links.linkedin} {...external} className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" data-testid="link-contact-linkedin">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href={links.github} {...external} className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" data-testid="link-contact-github">
                <Github size={14} /> GitHub
              </a>
              <button type="button" onClick={copyEmail} className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" data-testid="button-contact-email">
                {copied ? <Check size={14} /> : <Mail size={14} />} {copied ? 'Email copied' : 'Copy email'}
              </button>
              <a href={links.notes} {...external} className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" data-testid="link-contact-notes">
                <BookOpen size={14} /> ViVu Notes
              </a>
              <a href={links.resume} {...external} className="inline-flex items-center gap-2 border border-foreground/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" data-testid="link-contact-resume">
                <FileText size={14} /> Resume
              </a>
            </div>
            <a href={`mailto:${links.email}`} className="mt-5 inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/55 transition-colors hover:text-primary" data-testid="link-contact-mailto">{links.email}</a>
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
                  <p className="mt-4 text-sm text-foreground/55">{activeProject.organization} · {activeProject.period}</p>
                   {activeProject.award && (
                     <div className="mt-5 inline-flex items-center gap-2 bg-primary px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-primary-foreground" data-testid="detail-project-award">
                       <Trophy size={13} /> {activeProject.award}
                     </div>
                   )}
                </div>
                <button type="button" onClick={() => setActiveProject(null)} className="flex h-10 w-10 shrink-0 items-center justify-center border border-foreground/20 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground" aria-label="Close project details" data-testid="button-close-project">
                  <X size={18} />
                </button>
              </div>

              <div className={`mt-8 grid gap-8 ${activeProject.media.length > 0 ? 'lg:grid-cols-[.75fr_1.25fr]' : 'max-w-[760px]'}`}>
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Overview</p>
                    <p className="mt-3 text-sm leading-[1.7] text-foreground/70">{activeProject.description}</p>
                  </div>
                  {activeProject.links && activeProject.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {activeProject.links.map((link) => <ProjectAction key={link.label} label={link.label} url={link.url} />)}
                    </div>
                  )}
                  <div className="grid gap-5 border-y border-foreground/15 py-5 sm:grid-cols-2 lg:grid-cols-1">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">My role</p>
                      <p className="mt-2 text-base">{activeProject.role}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">What I did</p>
                      <ul className="mt-2 space-y-2.5">
                        {activeProject.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2.5 text-sm leading-[1.6] text-foreground/70">
                            <span className="mt-[0.6em] h-1 w-1 shrink-0 bg-primary" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
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

                {activeProject.media.length > 0 && (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Gallery</p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-foreground/40">{activeProject.media.length} {activeProject.media.length === 1 ? 'image' : 'images'}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeProject.media.map((item) => <MediaPlaceholder key={item.id} item={item} onOpen={setLightboxItem} />)}
                    </div>
                  </div>
                )}
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
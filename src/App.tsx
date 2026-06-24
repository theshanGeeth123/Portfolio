import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  Eye,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Palette,
  Rocket,
  Send,
  Sparkles,
  Sun,
  TerminalSquare,
  X,
  Zap
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion';

type ProjectCategory = 'Full Stack' | 'Java' | 'Android' | 'Frontend';
type SkillType = 'Frontend' | 'Backend' | 'Database' | 'Mobile' | 'Tools' | 'Design' | 'Programming';

type Project = {
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  image: string;
  icon: string;
  stack: string[];
  highlights: string[];
  links: { label: string; href: string }[];
};

type CursorVariant = 'default' | 'hover' | 'view';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' }
];

const stats = [
  { value: 6, suffix: '+', label: 'Completed Projects' },
  { value: 16, suffix: '+', label: 'Technologies' },
  { value: 4, suffix: '', label: 'Core Domains' }
];

const skills: Array<{ name: string; icon: string; type: SkillType; note: string }> = [
  { name: 'HTML', icon: '/src/png/htmllogo.png', type: 'Frontend', note: 'Semantic structure' },
  { name: 'CSS', icon: '/src/png/csslogo.png', type: 'Frontend', note: 'Responsive layouts' },
  { name: 'JavaScript', icon: '/src/png/jslogo.png', type: 'Frontend', note: 'Browser logic' },
  { name: 'Tailwind', icon: '/src/png/tailwind.png', type: 'Frontend', note: 'Utility styling' },
  { name: 'React', icon: '/src/png/reactlogo.png', type: 'Frontend', note: 'Component systems' },
  { name: 'Next.js', icon: '/src/png/nextlogo.png', type: 'Frontend', note: 'Modern web apps' },
  { name: 'Node.js', icon: '/src/png/node.png', type: 'Backend', note: 'Server APIs' },
  { name: 'MongoDB', icon: '/images-new/mongodb.svg', type: 'Database', note: 'NoSQL models' },
  { name: 'MySQL', icon: '/images-new/mysql-logo-png-image-11660514413jvwkcjh4av-removebg-preview.png', type: 'Database', note: 'Relational data' },
  { name: 'Java', icon: '/images-new/java2-removebg-preview.png', type: 'Backend', note: 'OOP projects' },
  { name: 'Kotlin', icon: '/images-new/Kotlin_Icon-removebg-preview.png', type: 'Mobile', note: 'Android screens' },
  { name: 'GitHub', icon: '/src/png/githublogo.png', type: 'Tools', note: 'Version control' },
  { name: 'Git', icon: '/src/png/gitlogo.png', type: 'Tools', note: 'Source workflow' },
  { name: 'Figma', icon: '/src/png/figmalogo.png', type: 'Design', note: 'UI planning' },
  { name: 'C', icon: '/src/png/clogo.png', type: 'Programming', note: 'Programming basics' },
  { name: 'C++', icon: '/src/png/cpplogo.png', type: 'Programming', note: 'Problem solving' }
];

const services = [
  {
    icon: <Layers3 size={22} />,
    title: 'Full-Stack Product Builds',
    description: 'MERN applications with protected routes, dashboards, database workflows, APIs and role-friendly management screens.'
  },
  {
    icon: <Zap size={22} />,
    title: 'Interactive UI Engineering',
    description: 'Responsive interfaces with meaningful animation, hover feedback, micro-interactions and clean visual hierarchy.'
  },
  {
    icon: <Palette size={22} />,
    title: 'Design-to-Code Execution',
    description: 'Converting ideas and UI references into polished, maintainable frontend experiences that feel presentation-ready.'
  },
  {
    icon: <Briefcase size={22} />,
    title: 'Professional Documentation',
    description: 'README files, setup guides, architecture explanations and portfolio-ready project summaries for academic and real work.'
  }
];

const projects: Project[] = [
  {
    title: 'Camera Studio Management System',
    category: 'Full Stack',
    year: '2026',
    description:
      'A full-stack web application designed to streamline camera studio operations with customer handling, bookings, packages, and business management workflows.',
    image: '/images-new/camera-studio-project.png',
    icon: '/images-new/mern_logo.png',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    highlights: ['Studio operations dashboard', 'Customer and package workflows', 'Modern MERN project structure'],
    links: [{ label: 'GitHub', href: 'https://github.com/theshanGeeth123/MERN-Y2S2-PROJECT.git' }]
  },
  {
    title: 'SkillFusion - Skill Management System',
    category: 'Full Stack',
    year: '2026',
    description:
      'A skill and project allocation platform for managing personnel, skill profiles, projects and automated best-fit member matching.',
    image: '/images-new/SkillFusion.png',
    icon: '/images-new/mern_logo.png',
    stack: ['MySQL', 'Docker', 'Express.js', 'React', 'Node.js'],
    highlights: ['Skill matching workflow', 'Project allocation features', 'Container-ready backend setup'],
    links: [{ label: 'GitHub', href: 'https://github.com/theshanGeeth123/skillmatch---Project.git' }]
  },
  {
    title: 'Eventify Java Project',
    category: 'Java',
    year: '2025',
    description:
      'A complete Java web application with dynamic user interactions, data handling and full-stack event management features.',
    image: '/images-new/Evntify.png',
    icon: '/images-new/java2-removebg-preview.png',
    stack: ['Java', 'HTML', 'CSS', 'JavaScript'],
    highlights: ['Java backend flow', 'Dynamic UI screens', 'Event-focused data modules'],
    links: [{ label: 'GitHub', href: 'https://github.com/theshanGeeth123/JAVA-WEB-PROJECT' }]
  },
  {
    title: 'TMDB Movie Project',
    category: 'Frontend',
    year: '2025',
    description:
      'A movie discovery application using the TMDB API where users can browse popular movies, search titles and view detailed movie information.',
    image: '/images-new/tmdb-movieP.png',
    icon: '/images-new/tmdb logo.png',
    stack: ['TMDB API', 'JavaScript', 'HTML', 'CSS'],
    highlights: ['Movie search and discovery', 'API-driven content', 'Clean details experience'],
    links: [{ label: 'GitHub', href: 'https://github.com/theshanGeeth123/movie-app-tmdb/tree/main' }]
  },
  {
    title: 'ShopEase Android UI Project',
    category: 'Android',
    year: '2025',
    description:
      'A modern Android shopping UI built for a smooth mobile commerce experience using Android Studio, Kotlin and XML.',
    image: '/images-new/ShopEase2.png',
    icon: '/images-new/Android_Studio_Logo_2024.svg-removebg-preview.png',
    stack: ['Android Studio', 'Kotlin', 'XML', 'Figma'],
    highlights: ['Mobile-first shopping flow', 'Reusable UI screens', 'Figma community design'],
    links: [
      { label: 'Figma', href: 'https://www.figma.com/community/file/1539127084554643436' },
      { label: 'GitHub', href: 'https://github.com/theshanGeeth123/Shop-Ease-Android-Project.git' }
    ]
  },
  {
    title: 'WellnessFlow Android Project',
    category: 'Android',
    year: '2025',
    description:
      'A feature-rich fitness tracking Android application that helps users monitor and improve health, workout and routine progress.',
    image: '/images-new/WellnessFlow.png',
    icon: '/images-new/Android_Studio_Logo_2024.svg-removebg-preview.png',
    stack: ['Android Studio', 'Kotlin', 'XML'],
    highlights: ['Fitness tracking UI', 'Health routine screens', 'Mobile app architecture'],
    links: [{ label: 'GitHub', href: 'https://github.com/theshanGeeth123/WellnessFlow-Android-App.git' }]
  }
];

const timeline = [
  {
    title: 'Software Engineering Undergraduate',
    date: 'Current',
    description: 'Learning software engineering through structured academic work, personal projects and team-based development.'
  },
  {
    title: 'Full-Stack Project Builder',
    date: 'MERN / Java',
    description: 'Building real-world applications with dashboards, authentication, APIs, databases and responsive user interfaces.'
  },
  {
    title: 'Mobile UI Explorer',
    date: 'Android',
    description: 'Designing Kotlin/XML Android interfaces with focus on clean screens, usability and user-friendly flows.'
  }
];

const categories: Array<'All' | ProjectCategory> = ['All', 'Full Stack', 'Java', 'Android', 'Frontend'];
const skillFilters: Array<'All' | SkillType> = ['All', 'Frontend', 'Backend', 'Database', 'Mobile', 'Tools', 'Design', 'Programming'];
const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

function randomChar() {
  return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
}

function ScrambleIn({ text, delay = 0, triggered = true }: { text: string; delay?: number; triggered?: boolean }) {
  const [display, setDisplay] = useState(triggered ? '' : '\u00A0');

  useEffect(() => {
    if (!triggered) {
      setDisplay('\u00A0');
      return;
    }

    let frame = 0;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        const revealCursor = frame * 0.55;
        const value = text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < revealCursor) return char;
            if (index < revealCursor + 3) return randomChar();
            return '';
          })
          .join('');
        setDisplay(value);
        frame += 1;
        if (revealCursor >= text.length) {
          window.clearInterval(interval);
          setDisplay(text);
        }
      }, 25);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [text, delay, triggered]);

  return <>{display}</>;
}

function ScrambleText({ text, className = '' }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const handleEnter = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    let frame = 0;
    intervalRef.current = window.setInterval(() => {
      const next = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          return index < frame / 3 ? char : randomChar();
        })
        .join('');
      setDisplay(next);
      frame += 1;
      if (frame / 3 > text.length) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, 25);
  };

  return (
    <span onMouseEnter={handleEnter} onMouseLeave={() => setDisplay(text)} className={className}>
      {display}
    </span>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      className="section-label"
    >
      <span />
      {children}
    </motion.div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="preloader-mark"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
      >
        <span />
      </motion.div>
      <p>Loading interactive portfolio</p>
    </motion.div>
  );
}

function CustomCursor({ variant }: { variant: CursorVariant }) {
  const cursor = useRef<HTMLDivElement | null>(null);
  const follower = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      cursor.current?.style.setProperty('--x', `${event.clientX}px`);
      cursor.current?.style.setProperty('--y', `${event.clientY}px`);
      follower.current?.animate({ left: `${event.clientX}px`, top: `${event.clientY}px` }, { duration: 420, fill: 'forwards' });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div ref={cursor} className={`cursor-dot ${variant}`} />
      <div ref={follower} className={`cursor-ring ${variant}`}>{variant === 'view' ? 'View' : ''}</div>
    </>
  );
}

function useInteractiveCursor() {
  const [variant, setVariant] = useState<CursorVariant>('default');

  useEffect(() => {
    const enterHover = () => setVariant('hover');
    const enterView = () => setVariant('view');
    const leave = () => setVariant('default');

    const hoverTargets = document.querySelectorAll('a, button, .skill-card, .service-card, .architecture-layers div');
    const viewTargets = document.querySelectorAll('.project-card, .hero-card');

    hoverTargets.forEach((item) => {
      item.addEventListener('mouseenter', enterHover);
      item.addEventListener('mouseleave', leave);
    });
    viewTargets.forEach((item) => {
      item.addEventListener('mouseenter', enterView);
      item.addEventListener('mouseleave', leave);
    });

    return () => {
      hoverTargets.forEach((item) => {
        item.removeEventListener('mouseenter', enterHover);
        item.removeEventListener('mouseleave', leave);
      });
      viewTargets.forEach((item) => {
        item.removeEventListener('mouseenter', enterView);
        item.removeEventListener('mouseleave', leave);
      });
    };
  });

  return variant;
}

function ThemeToggle({ light, onToggle }: { light: boolean; onToggle: () => void }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");

    const update = () => {
      setCompact(query.matches);
    };

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  const glowX = light ? (compact ? 0 : 72) : 4;

  return (
    <motion.button
      type="button"
      className="theme-button"
      onClick={onToggle}
      aria-label="Toggle light and dark theme"
      aria-pressed={light}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="theme-icon">
        {light ? <Sun size={16} /> : <Moon size={16} />}
      </span>

      <span className="theme-label">
        {light ? "Light" : "Dark"}
      </span>

      <motion.span
        className="theme-glow"
        layout
        animate={{ x: glowX }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      />
    </motion.button>
  );
}

function Navbar({ light, toggleTheme }: { light: boolean; toggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.45 });

  useEffect(() => {
    const observers = navItems.map((item) => {
      const section = document.querySelector(item.href);
      if (!section) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item.href.replace('#', ''));
        },
        { threshold: 0.35, rootMargin: '-12% 0px -52% 0px' }
      );
      observer.observe(section);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <motion.header
      className="navbar"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
    >
      <motion.div className="nav-progress" style={{ scaleX: progress }} />

      <motion.a href="#home" className="brand-pill" aria-label="Go to home" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <img src="./images-new/Img2.png" alt="Theshan avatar" />
        <span>Theshan</span>
        <i>Portfolio</i>
      </motion.a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const key = item.href.replace('#', '');
          return (
            <motion.a key={item.href} href={item.href} className={active === key ? 'active' : ''} whileHover={{ y: -1 }}>
              {active === key && <motion.span className="nav-active-bg" layoutId="nav-active-bg" />}
              <ScrambleText text={item.label} />
            </motion.a>
          );
        })}
      </nav>

      <div className="nav-actions">
        <ThemeToggle light={light} onToggle={toggleTheme} />
        <motion.a className="download-pill" href="./Theshan-Geethanjana-CV.pdf" download whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
          <Download size={16} />
          <span>CV</span>
        </motion.a>
        <motion.button className="mobile-menu-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" whileTap={{ scale: 0.94 }}>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-panel"
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.045 }}
              >
                <span>{item.label}</span>
                <ArrowRight size={16} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MagneticButton({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a ref={ref} href={href} className={className} onMouseMove={handleMove} onMouseLeave={reset} style={{ x: springX, y: springY }} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.a>
  );
}

function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    ref.current?.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
    ref.current?.style.setProperty('--my', `${event.clientY - bounds.top}px`);
  };

  return (
    <div ref={ref} className={`spotlight-card ${className}`} onMouseMove={handleMove}>
      {children}
    </div>
  );
}

function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18, mass: 0.5 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={reset} style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}>
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 900;
    const started = performance.now();
    let frame = 0;
    const tick = (time: number) => {
      const progress = Math.min((time - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref}>{String(count).padStart(value < 10 ? 2 : 0, '0')}{suffix}</span>;
}

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 20, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 20, mass: 0.7 });
  const spotlight = useMotionTemplate`radial-gradient(760px circle at ${smoothX}px ${smoothY}px, rgba(139, 92, 246, 0.26), transparent 42%)`;

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  return (
    <section className="hero-section" id="home" onMouseMove={handleMove}>
      <motion.div className="hero-spotlight" style={{ background: spotlight }} />
      <div className="dot-grid" />
      <motion.div
        className="hero-watermark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.13 }}
        transition={{ delay: 1, duration: 1.4 }}
      >
        DEVELOPER
      </motion.div>

      <div className="hero-content">
        {/* <motion.div
          className="hero-chip"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          <Sparkles size={16} /> Interactive portfolio / React + TypeScript + Framer Motion
        </motion.div> */}

        <div className="hero-grid">
          <div className="hero-copy">
            <motion.div className="availability-badge" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
              <span /> Available for internships, collaborations & project work
            </motion.div>
            <h1>
              <span><ScrambleIn text="Theshan" delay={200} /></span>
              <span><ScrambleIn text="Geethanjana" delay={520} /></span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            >
              Software engineering undergraduate building polished full-stack web applications, Android interfaces,
              dashboards and clean digital products with strong presentation value.
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.28, duration: 0.7 }}
            >
              <MagneticButton href="#projects" className="primary-button">
                Explore Projects <ArrowUpRight size={18} />
              </MagneticButton>
              <MagneticButton href="mailto:theshangeethanjana@gmail.com" className="secondary-button">
                Contact Me <Mail size={18} />
              </MagneticButton>
            </motion.div>

            <motion.div
              className="hero-social-row"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.42, duration: 0.7 }}
              aria-label="Portfolio social links"
            >
              <a href="https://www.linkedin.com/in/theshan-geethanjana-6b6a58375" target="_blank" rel="noreferrer">
                <Linkedin size={17} /> LinkedIn
              </a>
              <a href="https://github.com/theshanGeeth123" target="_blank" rel="noreferrer">
                <Github size={17} /> GitHub
              </a>
              <a href="mailto:theshangeethanjana@gmail.com">
                <Mail size={17} /> Email
              </a>
              <a href="./Theshan-Geethanjana-CV.pdf" download>
                <Download size={17} /> Download CV
              </a>
            </motion.div>
          </div>

          <TiltCard className="hero-card-wrap">
            <motion.div
              className="hero-card"
              initial={{ opacity: 0, scale: 0.94, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="avatar-orbit">
                <img src="./images-new/Img1.png" alt="Theshan Geethanjana portrait" />
                <span className="orbit one" />
                <span className="orbit two" />
              </div>
              <div className="hero-card-footer">
                <span>Full-Stack Developer</span>
                <strong>MERN / Java / Android</strong>
              </div>
              <div className="floating-code-card one">
                <Code2 size={15} /> clean UI
              </div>
              <div className="floating-code-card two">
                <Rocket size={15} /> project ready
              </div>
            </motion.div>
          </TiltCard>
        </div>

        <motion.div
          className="stats-row"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 1.5 } } }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.65 }}
            >
              <SpotlightCard className="stat-card">
                <strong><AnimatedCounter value={stat.value} suffix={stat.suffix} /></strong>
                <span>{stat.label}</span>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.a className="scroll-cue" href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.75 }}>
          <span /> Scroll to explore
        </motion.a>
      </div>
    </section>
  );
}

function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 15, damping: 32, mass: 1.8 });
  const rotate = useTransform(smooth, [0, 1], [14, -10]);
  const y = useTransform(smooth, [0, 1], [70, -70]);

  return (
    <section className="about-section" id="about" ref={ref}>
      <SectionLabel>About Me</SectionLabel>
      <motion.div className="about-statement" style={{ rotateX: rotate, y }}>
        I build practical software with a designer&apos;s eye — combining clean interfaces, strong project structure and
        interactive details that make the experience feel professional.
      </motion.div>

      <div className="about-grid">
        <motion.div
          className="about-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <h2>From idea to interface, I focus on clarity.</h2>
          <p>
            I&apos;m a software engineering undergraduate focused on improving my skills through real project work. My
            current focus is full-stack web development, Android UI development, dashboards and professional project
            presentation.
          </p>
          <p>
            I enjoy building management systems and user-friendly applications where structure, design and usability work
            together.
          </p>
          <div className="about-mini-grid">
            <span><BadgeCheck size={16} /> Responsive first</span>
            <span><BadgeCheck size={16} /> Clean code flow</span>
            <span><BadgeCheck size={16} /> Presentation ready</span>
          </div>
        </motion.div>

        <motion.div
          className="service-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {services.map((service) => (
            <motion.article
              className="service-card"
              key={service.title}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
            >
              <SpotlightCard>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ArrowUpRight className="card-arrow" size={18} />
              </SpotlightCard>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const [filter, setFilter] = useState<'All' | SkillType>('All');
  const visibleSkills = useMemo(() => (filter === 'All' ? skills : skills.filter((skill) => skill.type === filter)), [filter]);

  return (
    <section className="skills-section" id="skills">
      <SectionLabel>Tech Stack</SectionLabel>
      <div className="section-title-row">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          Tools I use to build modern experiences.
        </motion.h2>
        <motion.div
          className="stack-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p>A balanced stack across frontend, backend, databases, mobile development and design tools.</p>
          <div className="skill-filter-row">
            {skillFilters.map((item) => (
              <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div layout className="skills-grid">
        <AnimatePresence mode="popLayout">
          {visibleSkills.map((skill) => (
            <motion.article
              layout
              className="skill-card"
              key={skill.name}
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
              transition={{ duration: 0.38 }}
            >
              <span className="skill-glow" />
              <img src={skill.icon} alt={`${skill.name} logo`} />
              <div>
                <strong>{skill.name}</strong>
                <span>{skill.note}</span>
              </div>
              <small>{skill.type}</small>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState<'All' | ProjectCategory>('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const visibleProjects = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [filter]
  );

  return (
    <section className="projects-section" id="projects">
      <SectionLabel>Selected Work</SectionLabel>
      <div className="section-title-row projects-title-row">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          Featured projects with polished interactions and real screens.
        </motion.h2>
        <motion.div
          className="filter-row"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {categories.map((category) => (
            <button key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <TiltCard key={project.title} className="project-tilt">
              <motion.article
                layout
                className="project-card"
                initial={{ opacity: 0, y: 34, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.96 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
              >
                <div className="project-image-wrap">
                  <img src={project.image} alt={`${project.title} screenshot`} />
                  <span>{project.category}</span>
                  <button className="quick-view" onClick={() => setSelected(project)} aria-label={`View details for ${project.title}`}>
                    <Eye size={18} />
                  </button>
                </div>
                <div className="project-content">
                  <div className="project-heading-row">
                    <img src={project.icon} alt="Project technology icon" />
                    <small>{project.year}</small>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="stack-row">
                    {project.stack.slice(0, 4).map((stack) => (
                      <span key={stack}>{stack}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <button onClick={() => setSelected(project)}>View Details</button>
                    {project.links[0] && (
                      <a href={project.links[0].href} target="_blank" rel="noreferrer">
                        <Github size={16} /> Repo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </TiltCard>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
      <motion.div
        className="project-modal"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.35 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close project details">
          <X size={20} />
        </button>
        <div className="modal-image-wrap">
          <img className="modal-image" src={project.image} alt={`${project.title} screenshot`} />
        </div>
        <div className="modal-copy">
          <span className="modal-kicker">{project.category} / {project.year}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="modal-highlights">
            {project.highlights.map((item) => (
              <div key={item}>
                <CheckCircle2 size={17} />
                {item}
              </div>
            ))}
          </div>
          <div className="stack-row modal-stack">
            {project.stack.map((stack) => (
              <span key={stack}>{stack}</span>
            ))}
          </div>
          <div className="modal-links">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label} <ExternalLink size={16} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Process() {
  const processSteps = [
    { title: 'Understand requirements', detail: 'Clarify the goal, users, modules and expected project outcome.' },
    { title: 'Design interface & data flow', detail: 'Plan screen structure, responsive behavior and backend communication.' },
    { title: 'Build reusable modules', detail: 'Create maintainable components, APIs, controllers and consistent UI patterns.' },
    { title: 'Test & document', detail: 'Validate flows, polish the interface and prepare setup instructions.' }
  ];

  return (
    <section className="process-section" id="process">
      <SectionLabel>Development Style</SectionLabel>
      <div className="architecture-card">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Plan clearly. Build carefully. Present professionally.</h2>
          <p>
            My workflow focuses on understanding the problem, designing the right structure, building reusable modules and
            documenting the final result so the project is easy to explain and maintain.
          </p>
        </motion.div>
        <div className="architecture-layers">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span>0{index + 1}</span>
              <strong>{step.title}</strong>
              <small>{step.detail}</small>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="timeline-section">
      <SectionLabel>Journey</SectionLabel>
      <div className="timeline-wrap">
        {timeline.map((item, index) => (
          <motion.article
            className="timeline-item"
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: index * 0.12 }}
          >
            <span>{item.date}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'theshangeethanjana@gmail.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-card">
        <SectionLabel>Contact</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          Let&apos;s build something clear, useful and memorable.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.12 }}
        >
          Open for internships, academic collaborations, portfolio projects and full-stack development work.
        </motion.p>
        <motion.div
          className="contact-actions"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.22 }}
        >
          <a href={`mailto:${email}`}>
            <Send size={18} /> Send Email
          </a>
          <button onClick={copyEmail}>
            <Copy size={18} /> {copied ? 'Copied' : 'Copy Email'}
          </button>
          <a href="https://github.com/theshanGeeth123" target="_blank" rel="noreferrer">
            <Github size={18} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/theshan-geethanjana-6b6a58375" target="_blank" rel="noreferrer">
            <Linkedin size={18} /> LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a href="#home" className="footer-brand">
        <TerminalSquare size={18} /> Theshan Geethanjana
      </a>
      <p>Learning, Living, and Leveling Up.</p>
      <span>© 2026. Built with React, TypeScript, Tailwind CSS and Framer Motion.</span>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const light = theme === 'light';
  const cursorVariant = useInteractiveCursor();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1050);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light-mode', light);
    root.classList.toggle('dark-mode', !light);
    document.body.classList.toggle('light-mode', light);
    document.body.classList.toggle('dark-mode', !light);
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem('portfolio-theme', theme);
  }, [light, theme]);

  const shellStyle = { fontFamily: '"Space Mono", monospace' } satisfies CSSProperties;

  return (
    <div className="app-shell" style={shellStyle}>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <CustomCursor variant={cursorVariant} />
      <div className="site-background" />
      <Navbar light={light} toggleTheme={() => setTheme((value) => (value === 'light' ? 'dark' : 'light'))} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

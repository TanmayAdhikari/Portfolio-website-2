import { useEffect, useRef, useState } from 'react'
import {
  HomeIcon, CodeIcon, ClockIcon, FolderIcon, SlidersIcon, ChatIcon, PinIcon,
  ListIcon, DownloadIcon, ChevronDownIcon, CheckIcon,
  MoonIcon, GearIcon, UserPlusIcon,
  LogoutIcon, MailIcon, LinkedInIcon, GitHubIcon, XIcon, ShareIcon,
} from './icons.jsx'

const EMAIL = 'tanmay.adhikari.work@gmail.com'
const LINKEDIN = 'https://linkedin.com/in/tanmay-adhikari-ttt'
const GITHUB = 'https://github.com/TanmayAdhikari'
const X_URL = 'https://x.com/' // TODO: replace with the real handle
const RESUME = '/Tanmay_Adhikari_Resume.pdf'
const VCARD = '/Tanmay_Adhikari.vcf'
// TODO: swap for a Calendly/Cal.com URL when there is one
const SCHEDULE_URL = `mailto:${EMAIL}?subject=${encodeURIComponent("Let's schedule a call")}`

const QUESTIONS = {
  projects: 'Tell me about his projects.',
  experience: 'Walk me through his experience.',
  skills: "What's his tech stack?",
  about: 'Who is Tanmay?',
  contact: 'How do I get in touch?',
}

const CONFETTI_COLORS = ['#D97757', '#f5bd4f', '#61c454', '#5b8def', '#e05c8a', '#8b5cf6']

function fireConfetti(e) {
  const r = e.currentTarget.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  for (let i = 0; i < 46; i++) {
    const p = document.createElement('div')
    const sz = 6 + Math.random() * 6
    p.style.cssText =
      `position:fixed;left:${cx}px;top:${cy}px;width:${sz}px;height:${sz * 0.6}px;` +
      `background:${CONFETTI_COLORS[i % CONFETTI_COLORS.length]};border-radius:2px;pointer-events:none;z-index:99999`
    document.body.appendChild(p)
    const ang = Math.random() * Math.PI * 2
    const vel = 130 + Math.random() * 190
    const dx = Math.cos(ang) * vel
    const dy = Math.sin(ang) * vel - 130
    p.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px,${dy + 280}px) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 },
      ],
      { duration: 900 + Math.random() * 600, easing: 'cubic-bezier(.2,.7,.3,1)' },
    ).onfinish = () => p.remove()
  }
}

function greetingNow() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

/* ---------- sidebar pieces ---------- */

function Socials() {
  const items = [
    { href: `mailto:${EMAIL}`, icon: <MailIcon />, label: 'Email', delay: '.02s', ext: false },
    { href: LINKEDIN, icon: <LinkedInIcon />, label: 'LinkedIn', delay: '.09s', ext: true },
    { href: GITHUB, icon: <GitHubIcon />, label: 'GitHub', delay: '.16s', ext: true },
    { href: X_URL, icon: <XIcon />, label: 'X (Twitter)', delay: '.23s', ext: true },
  ]
  return (
    <div className="socials">
      {items.map((it) => (
        <a
          key={it.label}
          className="soc"
          href={it.href}
          style={{ animationDelay: it.delay }}
          {...(it.ext ? { target: '_blank', rel: 'noopener' } : {})}
        >
          {it.icon}
          {it.label}
        </a>
      ))}
    </div>
  )
}

const THEME_MODES = [
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
  { key: 'system', label: 'Auto' },
]

function AccountMenu({ mode, setMode, onShortcuts, onLogout }) {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="menu">
      <div className="menu-email">{EMAIL}</div>
      <div className="mrow workspace">
        <div className="ws-chip me">TA</div>
        <span className="ws-name">Tanmay Adhikari</span>
        <span className="ws-plan">Pro</span>
        <CheckIcon style={{ marginLeft: 'auto', color: '#D97757' }} />
      </div>
      <div className="mrow workspace">
        <div className="ws-chip status"><span className="status-dot" /></div>
        <span className="ws-name">Open to opportunities</span>
      </div>
      <div className="menu-div" />
      <div className="mrow theme-row">
        <MoonIcon />Theme
        <div className="theme-seg">
          {THEME_MODES.map((m) => (
            <button
              key={m.key}
              className={mode === m.key ? 'on' : ''}
              onClick={() => setMode(m.key)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <button className="mrow" onClick={copyEmail}>
        <MailIcon size={17} />{copied ? 'Copied ✓' : 'Copy email'}
      </button>
      <a className="mrow" href={RESUME} download="Tanmay_Adhikari_Resume.pdf">
        <DownloadIcon />Download résumé (PDF)
      </a>
      <a className="mrow" href={VCARD} download="Tanmay_Adhikari.vcf">
        <UserPlusIcon />Save contact card
      </a>
      <a className="mrow" href={SCHEDULE_URL}>
        <ClockIcon />Schedule a call
      </a>
      <div className="menu-div" />
      <button className="mrow" onClick={onShortcuts}>
        <GearIcon />Shortcuts
        <span className="mrow-hint">Ctrl ,</span>
      </button>
      <div className="menu-div" />
      <button className="mrow" onClick={onLogout}>
        <LogoutIcon />Log out
      </button>
    </div>
  )
}

const SOCIAL_LINKS = [
  { href: `mailto:${EMAIL}`, icon: <MailIcon />, label: 'Email', ext: false },
  { href: LINKEDIN, icon: <LinkedInIcon />, label: 'LinkedIn', ext: true },
  { href: GITHUB, icon: <GitHubIcon />, label: 'GitHub', ext: true },
  { href: X_URL, icon: <XIcon />, label: 'X (Twitter)', ext: true },
]

function SocialsTab() {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  const open = pinned || hovered
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button className="sbtn socbtn" onClick={() => setPinned((p) => !p)} aria-expanded={open}>
        <ShareIcon />Socials
        <span className="socbtn-caret">
          <ChevronDownIcon className={`pill-caret${open ? ' open' : ''}`} />
        </span>
      </button>
      {open && (
        <div className="socicons">
          {SOCIAL_LINKS.map((s, i) => (
            <a
              key={s.label}
              className="socicon"
              href={s.href}
              title={s.label}
              aria-label={s.label}
              style={{ animationDelay: `${i * 0.06}s` }}
              {...(s.ext ? { target: '_blank', rel: 'noopener' } : {})}
            >
              {s.icon}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function Sidebar({ view, ask, menu, setMenu, mode, setMode, onShortcuts, onLogout }) {
  const notContact = view !== 'contact'
  const accountRef = useRef(null)

  useEffect(() => {
    if (!menu) return
    const onDown = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) setMenu(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [menu, setMenu])
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">✻</span>
        <span className="brand-label">Applied ML Engineer</span>
      </div>

      <div className="segwrap">
        <button className={`seg${view === 'home' ? ' on' : ''}`} onClick={() => ask('home')}>
          <HomeIcon />Home
        </button>
        <button className={`seg${view === 'contact' ? ' on' : ''}`} onClick={() => ask('contact')}>
          <CodeIcon />Reach out
        </button>
      </div>

      {notContact ? (
        <>
          <nav className="nav">
            <button className="sbtn" onClick={() => ask('experience')}><ClockIcon />Experience</button>
            <button className="sbtn" onClick={() => ask('projects')}><FolderIcon />Projects</button>
            <button className="sbtn" onClick={() => ask('skills')}><SlidersIcon />Skills</button>
            <SocialsTab />
          </nav>

          <div className="pinned-head">
            <span style={{ color: 'var(--muted)', display: 'flex' }}><PinIcon /></span>
            <span className="side-label">Pinned</span>
          </div>
          <div className="pinned-wrap">
            <button className="sbtn pinned" onClick={() => ask('projects')}>
              <ChatIcon style={{ color: '#D97757' }} />
              <span className="pinned-text">Conversational Data Analytics Platform</span>
            </button>
          </div>

          <div className="recents-head">
            <span className="side-label">Recents</span>
            <span style={{ color: 'var(--muted)', display: 'flex' }}><ListIcon /></span>
          </div>
          <div className="recents">
            <button className="sbtn recent" onClick={() => ask('projects')}>
              <ChatIcon style={{ color: 'var(--muted)' }} />His flagship projects
            </button>
            <button className="sbtn recent" onClick={() => ask('experience')}>
              <ChatIcon style={{ color: 'var(--muted)' }} />Intern → full-time in 4 months
            </button>
            <button className="sbtn recent" onClick={() => ask('skills')}>
              <ChatIcon style={{ color: 'var(--muted)' }} />Full AI/ML tech stack
            </button>
          </div>
        </>
      ) : (
        <Socials />
      )}

      <div className="account" ref={accountRef}>
        {menu && (
          <AccountMenu mode={mode} setMode={setMode} onShortcuts={onShortcuts} onLogout={onLogout} />
        )}
        <div className="account-row">
          <button className="pill" onClick={() => setMenu((m) => !m)}>
            <div className="avatar">TA</div>
            <span className="pill-name">Tanmay Adhikari</span>
            <span style={{ color: 'var(--muted)', display: 'flex' }}>
              <ChevronDownIcon className={`pill-caret${menu ? ' open' : ''}`} />
            </span>
          </button>
          <a className="dlbtn" href={RESUME} download="Tanmay_Adhikari_Resume.pdf" title="Download résumé">
            <DownloadIcon />
          </a>
        </div>
      </div>
    </aside>
  )
}

/* ---------- answers ---------- */

const PROJECTS = [
  {
    title: 'Conversational Data Analytics Platform',
    stack: 'Python · FastAPI · React 18 · MCP · MySQL · BM25 · SSE',
    bullets: [
      'Lets non-technical staff query a live 67-table ops database in plain English via a hybrid RAG pipeline routing across document / SQL / hybrid modes through a read-only MCP server — no schema hallucination.',
      'Blocked 100% of prompt-injection & mutation attempts with a defense-in-depth SQL safety layer (allow/deny-list, read-only 15s-timeout transactions, hard row caps).',
      'Multi-provider Gemini fallback, SSE token streaming, and 109 automated tests with no live dependencies.',
    ],
  },
  {
    title: 'Contactless Facial-Recognition Attendance',
    stack: 'Python · Flask · React 18 · ONNX Runtime · FAISS · MongoDB · SQLite',
    bullets: [
      'Sub-second worker ID at industrial recycling sites with a training-free SCRFD + ArcFace pipeline on ONNX Runtime and in-memory FAISS cosine search.',
      'Adaptive matching that fuses per-user vector scores with detection confidence, adjusting thresholds by brightness, sharpness & pose.',
      'Unified single-process Flask + React deploy behind nginx with PIN-protected enrollment and live analytics + CSV export.',
    ],
  },
]

const EXPERIENCE = [
  {
    role: 'Applied AI/ML Engineer · OneStep Greener (TCI Group)',
    dates: 'Nov 2024 – Present',
    current: true,
    bullets: [
      'Cut document search to under 2s for 500+ employees with an enterprise RAG platform, deployed group-wide at TCI.',
      'Eliminated 24/7 manual dock monitoring with a real-time CV system on live RTSP streams via edge inference.',
      '95%+ waste-segmentation accuracy on live conveyor feeds (CircularNet-aligned).',
    ],
  },
  {
    role: 'AI/ML Intern · OneStep Greener (TCI Group)',
    dates: 'Jul 2024 – Nov 2024',
    bullets: [
      '+20% fleet utilization via driver-allocation logic on capacity & estimated waste volume.',
      'Optimized citywide Delhi waste routing with K-Means + Google Distance Matrix API.',
    ],
  },
  {
    role: 'GenAI & ML Intern · Genpact',
    dates: 'Jan 2024 – Jun 2024',
    bullets: [
      'Reduced delivery costs up to 15% with last-mile route optimization for a Fortune 500 client.',
    ],
  },
]

const SKILLS = [
  { head: 'AI / ML', tags: ['RAG', 'LangChain', 'LangGraph', 'MCP', 'OpenAI / Gemini / Qwen3', 'FAISS · ChromaDB', 'BM25', 'YOLOv8', 'ONNX Runtime', 'ArcFace'] },
  { head: 'Engineering', tags: ['Python', 'SQL', 'FastAPI', 'Flask', 'React 18', 'MySQL · MongoDB · SQLite', 'REST · SSE', 'pytest', 'Docker'] },
  { head: 'Analytics', tags: ['Linear Programming', 'K-Means', 'Route Optimization'] },
]

const STATS = [
  { num: '<2s', label: 'RAG retrieval' },
  { num: '95%+', label: 'CV accuracy' },
  { num: '500+', label: 'employees served' },
  { num: 'B.Tech', label: 'CSE · Graphic Era Hill' },
]

function ProjectsAnswer() {
  return (
    <>
      <div>Tanmay ships AI systems end-to-end. Two of his standout builds:</div>
      <div className="cards">
        {PROJECTS.map((p) => (
          <div className="card" key={p.title}>
            <div className="card-title">{p.title}</div>
            <div className="card-stack">{p.stack}</div>
            <ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        ))}
      </div>
    </>
  )
}

function ExperienceAnswer() {
  return (
    <>
      <div>
        Here's the path — from intern to full-time in 4 months, now shipping across
        OneStep Greener and its Fortune 500 logistics sister company, TCI.
      </div>
      <div className="timeline">
        {EXPERIENCE.map((job) => (
          <div className={`tnode${job.current ? ' current' : ''}`} key={job.role}>
            <div className="tdot" />
            <div className="tnode-role">{job.role}</div>
            <div className="tnode-dates">{job.dates}</div>
            <ul>{job.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        ))}
      </div>
    </>
  )
}

function SkillsAnswer() {
  return (
    <>
      <div>He works across the full applied-AI stack — model to production:</div>
      <div className="skill-groups">
        {SKILLS.map((g) => (
          <div key={g.head}>
            <div className="skill-head">{g.head}</div>
            <div className="tags">{g.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </>
  )
}

function AboutAnswer() {
  return (
    <>
      <div>
        Tanmay Adhikari is an <b>Applied AI/ML Engineer</b> with 1.5+ years building production
        Generative AI, RAG, agentic, and Computer Vision systems at OneStep Greener and its
        Fortune 500 logistics sister company, TCI — converted from intern to full-time within 4 months.
      </div>
      <div className="about-p">
        He's delivered sub-2-second RAG retrieval, 95% CV detection accuracy, and up to 25% cost
        reduction through LangChain, LLM APIs, MCP, and YOLOv8-based pipelines shipped end-to-end
        from prototype to production.
      </div>
      <div className="stats">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </>
  )
}

const EMPTY_FORM = { name: '', email: '', message: '' }

function ContactAnswer() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const send = (e) => {
    if (sent) return
    fireConfetti(e)
    setForm(EMPTY_FORM)
    setSent(true)
    setTimeout(() => setSent(false), 2200)
  }

  return (
    <>
      <div>
        Happy to connect — the fastest way to reach Tanmay is email, or drop a note below
        and it'll land in his inbox.
      </div>
      <div className="contact-list">
        <a href={`mailto:${EMAIL}`} className="contact-card">
          <div className="contact-icon"><MailIcon size={18} /></div>
          <div>
            <div className="contact-title">Email</div>
            <div className="contact-sub">{EMAIL}</div>
          </div>
        </a>
        <div className="contact-pair">
          <a href={LINKEDIN} target="_blank" rel="noopener" className="contact-mini">
            <div className="contact-icon"><LinkedInIcon /></div>
            <div className="contact-mini-name">LinkedIn</div>
          </a>
          <a href={GITHUB} target="_blank" rel="noopener" className="contact-mini">
            <div className="contact-icon"><GitHubIcon /></div>
            <div className="contact-mini-name">GitHub</div>
          </a>
        </div>
        <div className="form-card">
          <div className="form-title">Send a message</div>
          <div className="form-row">
            <input className="finput" placeholder="Your name" aria-label="Your name" value={form.name} onChange={update('name')} />
            <input className="finput" placeholder="Your email" aria-label="Your email" value={form.email} onChange={update('email')} />
          </div>
          <textarea className="finput ftext" placeholder="What would you like to talk about?" aria-label="Message" value={form.message} onChange={update('message')} />
          <div className="form-actions">
            <button className={`btnp${sent ? ' sent' : ''}`} onClick={send}>
              {sent ? 'Sent ✓' : 'Send ↑'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const ANSWERS = {
  projects: ProjectsAnswer,
  experience: ExperienceAnswer,
  skills: SkillsAnswer,
  about: AboutAnswer,
  contact: ContactAnswer,
}

/* ---------- main pane ---------- */

function Home({ ask }) {
  return (
    <div className="home">
      <div className="home-mark">✻</div>
      <div className="greeting">
        {greetingNow()}. Let's talk<br />about Tanmay's work.
      </div>
      <div className="home-composer">
        <div className="home-placeholder">Ask about his projects, experience, or skills…</div>
        <div className="home-send-row"><div className="send-btn">↑</div></div>
      </div>
      <div className="home-chips">
        <button className="chip" onClick={() => ask('projects')}>🛠 See his projects</button>
        <button className="chip" onClick={() => ask('experience')}>💼 Experience</button>
        <button className="chip" onClick={() => ask('skills')}>⚡ Tech stack</button>
        <button className="chip" onClick={() => ask('about')}>👋 Who is he?</button>
      </div>
    </div>
  )
}

function Conversation({ view, ask }) {
  const Answer = ANSWERS[view]
  return (
    <>
      <div className="chat-scroll">
        <div className="chat-body">
          <div className="user-bubble">{QUESTIONS[view]}</div>
          <div className="ans" key={view}>
            <div className="ans-avatar">✻</div>
            <div className="ans-body">
              <Answer />
              <div className="followups">
                <button className="chip small" onClick={() => ask('projects')}>Projects</button>
                <button className="chip small" onClick={() => ask('experience')}>Experience</button>
                <button className="chip small" onClick={() => ask('skills')}>Tech stack</button>
                <button className="chip small clay" onClick={() => ask('contact')}>Get in touch ↗</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="composer">
        <div className="composer-inner">
          <span className="composer-placeholder">Reply to Tanmay…</span>
          <span className="send-btn">↑</span>
        </div>
      </div>
    </>
  )
}

/* ---------- shortcuts overlay ---------- */

const SHORTCUTS = [
  { keys: ['1'], action: 'Home' },
  { keys: ['2'], action: 'Projects' },
  { keys: ['3'], action: 'Experience' },
  { keys: ['4'], action: 'Skills' },
  { keys: ['5'], action: 'About' },
  { keys: ['6'], action: 'Contact' },
  { keys: ['D'], action: 'Toggle dark mode' },
  { keys: ['Ctrl', ','], action: 'Show shortcuts' },
  { keys: ['Esc'], action: 'Close' },
]

function ShortcutsOverlay({ onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sc-card" onClick={(e) => e.stopPropagation()}>
        <div className="sc-title">Keyboard shortcuts</div>
        {SHORTCUTS.map((s) => (
          <div className="sc-row" key={s.action}>
            <span>{s.action}</span>
            <span className="sc-keys">
              {s.keys.map((k) => <kbd className="kbd" key={k}>{k}</kbd>)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- app ---------- */

const VIEW_KEYS = { 1: 'home', 2: 'projects', 3: 'experience', 4: 'skills', 5: 'about', 6: 'contact' }

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

// flip to the opposite of whatever the current mode resolves to
const toggledMode = (mode) => {
  const isDark = mode === 'dark' || (mode === 'system' && systemDark())
  return isDark ? 'light' : 'dark'
}

export default function App() {
  const [view, setView] = useState('home')
  const [menu, setMenu] = useState(false)
  const [shortcuts, setShortcuts] = useState(false)
  const [toast, setToast] = useState(null)
  const [sysDark, setSysDark] = useState(systemDark)
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('themeMode') || localStorage.getItem('theme')
    return saved === 'light' || saved === 'dark' ? saved : 'system'
  })
  const dark = mode === 'dark' || (mode === 'system' && sysDark)

  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => setSysDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.key === ',') {
        e.preventDefault()
        setShortcuts((s) => !s)
        return
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.target.closest('input, textarea')) return
      if (e.key === 'Escape') {
        setShortcuts(false)
        setMenu(false)
      } else if (VIEW_KEYS[e.key]) {
        setView(VIEW_KEYS[e.key])
      } else if (e.key.toLowerCase() === 'd') {
        setMode(toggledMode)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const onLogout = (e) => {
    fireConfetti(e)
    setToast('Nice try — Tanmay never logs off.')
  }

  return (
    <div className="app" data-theme={dark ? 'dark' : 'light'}>
      <Sidebar
        view={view}
        ask={setView}
        menu={menu}
        setMenu={setMenu}
        mode={mode}
        setMode={setMode}
        onShortcuts={() => setShortcuts(true)}
        onLogout={onLogout}
      />
      <main className="main">
        {view === 'home' ? <Home ask={setView} /> : <Conversation view={view} ask={setView} />}
      </main>
      {shortcuts && <ShortcutsOverlay onClose={() => setShortcuts(false)} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

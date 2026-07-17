const Stroke = ({ size = 17, sw = 1.7, style, children }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    {children}
  </svg>
)

const Fill = ({ size = 16, style, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    {children}
  </svg>
)

export const HomeIcon = () => (
  <Stroke size={15} sw={1.8}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></Stroke>
)

export const CodeIcon = () => (
  <Stroke size={16} sw={1.8}><path d="m9 8-4 4 4 4" /><path d="m15 8 4 4-4 4" /></Stroke>
)

export const ClockIcon = () => (
  <Stroke><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Stroke>
)

export const FolderIcon = () => (
  <Stroke><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></Stroke>
)

export const SlidersIcon = () => (
  <Stroke><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></Stroke>
)

export const ChatIcon = ({ style }) => (
  <Stroke size={15} style={{ flex: 'none', ...style }}>
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
  </Stroke>
)

export const PinIcon = () => (
  <Fill size={13}><path d="M14 4v5l2 3v2h-4v6l-1 1-1-1v-6H6v-2l2-3V4z" /></Fill>
)

export const ListIcon = () => (
  <Stroke size={15}><path d="M8 4v7M8 15v5M16 4v5M16 13v7" /><circle cx="8" cy="13" r="2" /><circle cx="16" cy="11" r="2" /></Stroke>
)

export const DownloadIcon = ({ size = 17 }) => (
  <Stroke size={size} sw={1.8}><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></Stroke>
)

export const ChevronDownIcon = ({ className }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ChevronRightIcon = ({ style }) => (
  <Stroke size={15} sw={1.8} style={style}><path d="m9 6 6 6-6 6" /></Stroke>
)

export const CheckIcon = ({ style }) => (
  <Stroke size={15} sw={2} style={style}><path d="m20 6-11 11-5-5" /></Stroke>
)

export const MoonIcon = () => (
  <Stroke><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></Stroke>
)

export const GearIcon = () => (
  <Stroke>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.17V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15H4.5a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 6 9.4l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 11 3.6V3.5a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 19 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.4 9v.09" />
  </Stroke>
)

export const GlobeIcon = () => (
  <Stroke><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></Stroke>
)

export const HelpIcon = () => (
  <Stroke><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 2.5" /><path d="M12 17h.01" /></Stroke>
)

export const BarChartIcon = () => (
  <Stroke><path d="M4 18v-6M10 18V8M16 18v-3M4 9V6M10 5V3M16 12V3" /></Stroke>
)

export const UserPlusIcon = () => (
  <Stroke><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M17 8h5M19.5 5.5v5" /></Stroke>
)

export const InfoIcon = () => (
  <Stroke><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></Stroke>
)

export const LogoutIcon = () => (
  <Stroke><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></Stroke>
)

export const ShareIcon = () => (
  <Stroke>
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <path d="m8.7 10.7 6.6-4.2M8.7 13.3l6.6 4.2" />
  </Stroke>
)

export const MailIcon = ({ size = 16 }) => (
  <Stroke size={size} style={{ flex: 'none' }} sw={size >= 18 ? 1.8 : 1.7}>
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 6 10 7 10-7" />
  </Stroke>
)

export const LinkedInIcon = ({ size = 16 }) => (
  <Fill size={size} style={{ flex: 'none' }}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.06 3.77-2.06C20.5 8.64 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9z" />
  </Fill>
)

export const GitHubIcon = ({ size = 16 }) => (
  <Fill size={size} style={{ flex: 'none' }}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
  </Fill>
)

export const XIcon = () => (
  <Fill size={14} style={{ flex: 'none' }}>
    <path d="M18.9 2H22l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.7l7.9-9.1L1 2h7l4.8 6.4L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z" />
  </Fill>
)

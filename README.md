# Tanmay Adhikari — Portfolio

Personal portfolio for Tanmay Adhikari (Applied AI/ML Engineer), styled as a
Claude-app-like chat interface. Implemented in React 18 + Vite from the
Claude Design handoff (`Portfolio.dc.html`).

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## Structure

- `src/App.jsx` — the whole app: sidebar (nav, Socials tab, pinned, recents),
  home/conversation views, the five answer blocks (projects / experience /
  skills / about / contact), account menu, theme handling, keyboard
  shortcuts, toasts, confetti.
- `src/icons.jsx` — inline Lucide-style SVG icons from the design.
- `src/index.css` — design tokens (light + dark via `data-theme`) and all
  component styles.
- `public/Tanmay_Adhikari_Resume.pdf` — résumé, linked from the sidebar
  download button and the account menu.
- `public/Tanmay_Adhikari.vcf` — contact card, linked from the account menu.

## Account menu

All rows are functional: Light/Dark/Auto theme control (persisted to
`localStorage`, Auto follows `prefers-color-scheme` live), Copy email
(clipboard + "Copied ✓" feedback), Download résumé (PDF), Save contact
card (.vcf), Schedule a call (mailto for now — swap `SCHEDULE_URL` for a
Calendly/Cal.com link), Shortcuts (overlay, also on `Ctrl+,`), and a
Log out easter egg. Keyboard: `1–6` switch views, `D` toggles theme,
`Esc` closes menu/overlay.

## Open items (from the design handoff)

- **X/Twitter link** is a placeholder (`https://x.com/`) — set the real handle
  in `src/App.jsx` (`X_URL`).
- **Schedule a call** uses a `mailto:` fallback — replace `SCHEDULE_URL`
  with a real booking link when available.
- **Contact form** inputs are functional but not wired to a backend/email
  service; Send currently fires the confetti burst only.

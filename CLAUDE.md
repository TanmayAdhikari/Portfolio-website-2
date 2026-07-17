# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for Tanmay Adhikari (Applied AI/ML Engineer) styled as a Claude-app-like
chat interface. React 18 + Vite, JavaScript (no TypeScript), no test suite, no linter.
The visual spec lives in [DESIGN.md](DESIGN.md) — consult it before changing any styling;
colors/spacing/typography are exact values from a high-fidelity design handoff, not
approximations to tweak freely.

## Commands

```sh
npm run dev      # dev server on http://localhost:5173
npm run build    # production bundle -> dist/
npm run preview  # serve the built bundle
```

## Verifying UI changes

There is no chromium-cli on this machine, but system Chrome exists. The established pattern:
start `npm run dev` in the background, then drive it with a `playwright-core` script
(`chromium.launch({ channel: 'chrome', headless: true })`) installed in the session
scratchpad — navigate, screenshot, and check `console` errors. Screenshots of answer views
right after a click are caught mid `fadeUp` animation (semi-transparent); wait ~500ms for
settled shots.

## Architecture

Single-page, single state machine, no routing, no data fetching. All content is static.

- `src/App.jsx` — the entire app. One `view` state (`'home' | 'projects' | 'experience' |
  'skills' | 'about' | 'contact'`) drives everything: sidebar highlights, Home vs.
  Conversation pane, which of the five answer blocks renders, and the sidebar swap
  (primary nav/pinned/recents are hidden and replaced by social links when
  `view === 'contact'`). Content lives in top-level constants (`PROJECTS`, `EXPERIENCE`,
  `SKILLS`, `STATS`, `QUESTIONS`, `SOCIAL_LINKS`) — edit copy there, not in JSX.
  Contact/link constants (`EMAIL`, `LINKEDIN`, `GITHUB`, `X_URL`, `RESUME`, `VCARD`,
  `SCHEDULE_URL`) are at the top of the file.
- `src/index.css` — all styling. Design tokens are CSS custom properties on `.app`,
  re-scoped by `.app[data-theme="dark"]`. Class names, not CSS modules. The user-bubble +
  answer block re-animate on view change via `key={view}` on `.ans`.
- `src/icons.jsx` — inline Lucide-style SVGs built on two local wrappers (`Stroke`, `Fill`).
  Add new icons here using those wrappers; paths come from the design (see DESIGN.md).
- `public/` — served verbatim: `Tanmay_Adhikari_Resume.pdf` (download button + menu),
  `Tanmay_Adhikari.vcf` (contact card). `resume.pdf` at the repo root is the user's source
  copy, not served — the app uses the `public/` copy.

Theme is a three-way `mode` (`'light' | 'dark' | 'system'`) persisted to
`localStorage.themeMode`; `system` tracks `prefers-color-scheme` live. The resolved boolean
sets `data-theme` on the app root. Keyboard shortcuts (keys `1–6` switch views, `D` toggles
theme, `Ctrl+,` shortcuts overlay, `Esc` closes) are a single window keydown listener in
`App` that ignores events from `input`/`textarea`.

Transient UI (confetti on Send/Log out, toast, "Sent ✓" button state, "Copied ✓" menu row)
is all local component state with `setTimeout` reverts; confetti is direct DOM + Web
Animations API in `fireConfetti`, not a library.

## Design source

The design was imported from a Claude Design project ("Portfolio.dc.html" prototype +
handoff README). The `.dc.html` format (`<x-dc>`, `{{ }}`, `<sc-if>`) is a design reference
only — never ship or imitate it; DESIGN.md is the distilled spec.

## Known placeholders

`X_URL` (real X handle pending) and `SCHEDULE_URL` (mailto fallback until a Calendly/Cal.com
link exists). The contact form clears + shows "Sent ✓" but is not wired to a backend.

# DESIGN.md

Design spec for the portfolio, distilled from the Claude Design handoff
(`Portfolio.dc.html`, high-fidelity). These values are exact — reproduce them, don't
approximate. Implementation lives in `src/index.css` (tokens + components) and
`src/App.jsx` (structure + behavior).

## Concept

A single-screen portfolio that looks and feels like the Claude desktop app: a persistent
left sidebar (nav, pinned chat, recents, account) and a main pane that switches between a
**Home** greeting screen and **conversation** views. Clicking a suggestion chip or sidebar
item "asks" a question; the assistant's answer is the résumé content. One `view` state
drives everything: `'home' | 'projects' | 'experience' | 'skills' | 'about' | 'contact'`.

## Color tokens

| Token | Light | Dark (`[data-theme="dark"]`) | Use |
|---|---|---|---|
| `--bg` | `#F5F4EE` | `#211F1D` | app canvas / main pane |
| `--panel` | `#F0EEE6` | `#191817` | sidebar, chips, user bubble |
| `--card` | `#FFFFFF` | `#2B2A27` | cards, composer, popover |
| `--border` | `#E6E4D9` | `#39372F` | all hairline borders |
| `--hover` | `#E7E4DA` | `#35332E` | hover fills, toggle track, pinned |
| `--text` | `#262624` | `#F4F2EC` | primary text |
| `--text2` | `#4A4944` | `#D3D0C7` | body / bullets |
| `--muted` | `#8A8984` | `#95928A` | secondary / labels / placeholder |

Fixed accents (same in both themes):

- **Clay** `#D97757` — brand mark `✻`, active states, avatars, links, primary buttons.
  Hover `#C15F3C`.
- Timeline past-dot `#CBB9A8` (current dot is clay).
- Success green `#61C454` — status dot, "Sent ✓" button state.
- Dark-mode active segmented button: bg `#4B473F`, text `#F7F5EF`.
- Confetti palette: `#D97757 #f5bd4f #61c454 #5b8def #e05c8a #8b5cf6`.

## Typography

- **Display serif**: `Newsreader` 400 — greeting (40px, line-height 1.15,
  letter-spacing −.01em), stat numerals (26px).
- **UI/body sans**: `Hanken Grotesk` 400/500/600/700, system-ui fallback.
- Key sizes: answer body 15px/1.62; user bubble 15px/1.5; sidebar nav 13.5px;
  recents/socials 13px; labels 11.5–12.5px; tag chips 12.5px; card bullets 13.5px/1.55.
- Google Fonts import (in `index.html`):
  `Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400` +
  `Hanken+Grotesk:wght@400;500;600;700`.

## Spacing / radius / shadow

- Sidebar width **250px**, padding `14px 12px`. Main pane is full-viewport flex.
- Radii: buttons/rows 7–9px; cards/inputs 12px; composer/popover 14px; home input 16px;
  chips 16–20px; segmented track 11px (buttons 9px); avatars 50%.
- Shadows: home composer `0 4px 16px rgba(0,0,0,.05)`; convo composer
  `0 2px 10px rgba(0,0,0,.04)`; popover `0 14px 44px rgba(0,0,0,.24)`; active segmented
  `0 1px 3px rgba(0,0,0,.08)`.
- Conversation body: max-width 680px, centered, `0 28px` padding, 26px message gap.
  Home composer max-width 620px.

## Motion

- `fadeUp` keyframe: `opacity 0→1`, `translateY(8px)→0`.
  - Assistant answer `.ans`: `.4s ease`, re-triggered per view via `key={view}`.
  - Contact socials: `.34s cubic-bezier(.2,.7,.3,1)`, staggered delays
    `.02 / .09 / .16 / .23s`. Socials-tab icons: `.3s`, `i * 0.06s` stagger.
- Transitions: segmented `.18s` (bg/color/shadow); sidebar buttons/chips/socials `.15s`
  (bg/color); Send button `transform .12s` + `filter .15s` + `background .3s`
  (hover `brightness(1.06)`, active `scale(.93)`); menu caret `transform .2s`
  (rotates 180° open).
- Confetti (Send, Log out): ~46 fixed-position rects (6–12px, 0.6 aspect) from the
  button center; random angle, velocity 130–320px, upward bias (−130 then +280 fall),
  rotation ±360°, opacity 1→0, 900–1500ms, `cubic-bezier(.2,.7,.3,1)`; nodes removed
  on finish. Web Animations API, no library.
- Status dot: 2s pulsing box-shadow ring. Toast: slides up at bottom center, auto-clears
  ~2.6s.

## Components

- **Segmented toggle** (Home / Reach out): pill track `--hover`, active button `--card`
  + shadow. "Reach out" keeps the code-brackets icon deliberately.
- **Sidebar swap**: `view === 'contact'` hides primary nav/pinned/recents and shows the
  stagger-animated socials list; otherwise the reverse.
- **Socials tab** (under Skills, added post-handoff): opens on hover, pins on click,
  chevron rotates; row of 28px icon squares, muted → clay on hover.
- **User bubble**: right-aligned, `--panel`, radius `16px 16px 4px 16px`.
- **Assistant block**: 28px clay `✻` avatar (radius 7px) + answer body.
- **Answer blocks**: projects = two cards with clay stack lines + bullets; experience =
  left-border timeline with 11px dots (clay = current, `#CBB9A8` = past, 2px `--bg` ring);
  skills = clay group headings + tag chips (`--card`, radius 7, `5px 10px`); about = two
  paragraphs + Newsreader stat row; contact = email/LinkedIn/GitHub cards + message form.
- **Follow-up chips** after every answer: Projects / Experience / Tech stack + filled clay
  "Get in touch ↗".
- **Account menu** (popover above the pill, radius 14, all rows functional): email label,
  workspace row, "Open to opportunities" status, Light/Dark/Auto theme segmented,
  Copy email ("Copied ✓" 2s), Download résumé (PDF), Save contact card (.vcf),
  Schedule a call, Shortcuts (`Ctrl ,`), Log out (confetti + toast easter egg).
  Closes on outside click and Esc.
- **Composers are decorative** (home + conversation reply box) — placeholder text + clay
  `↑` button, not real inputs. The contact form's inputs ARE real (controlled), clear on
  send, and the Send button transitions to green "Sent ✓" for ~2.2s.
- **Icons**: inline Lucide-style SVGs — stroke `currentColor`, width 1.7–1.8, round
  caps/joins, 13–18px. Brand marks (LinkedIn, GitHub, X) are filled paths.
- **No raster images.** Identity is the clay "TA" initials avatar; the `✻` asterisk is a
  text glyph.

## Behavior notes

- Greeting from browser clock: `<12` "Good morning", `<18` "Good afternoon", else
  "Good evening".
- Theme: `mode` `'light' | 'dark' | 'system'` in `localStorage.themeMode`; system mode
  follows `prefers-color-scheme` live; resolved value sets `data-theme` on `.app`.
- Keyboard: `1–6` → views, `D` → toggle theme, `Ctrl+,` → shortcuts overlay, `Esc` →
  close menu/overlay. Ignored while typing in inputs.
- The design's mock browser-window chrome (traffic lights, `tanmayadhikari.ai` URL pill)
  was intentionally dropped — production is full-viewport.

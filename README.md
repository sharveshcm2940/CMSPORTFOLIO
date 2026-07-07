# C.M. Sharvesh — Portfolio

A single-page React + Vite portfolio built around one idea: the whole
page reads like a continuous diagnostic scan (a nod to HAILMARY, the
TB-detection project) — a fixed side readout tracks scroll progress,
sections wipe into view like a scan reveal, and projects are framed as
expandable "reports."

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for deployment

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy to Vercel,
Netlify, GitHub Pages, or any static host.

## Structure

```
src/
  components/   Hero, About, Skills, Experience, Projects,
                Certifications, Contact, Nav, ScanRail, Reveal
  hooks/        useReveal, useScanProgress, useTypewriter
  index.css     design tokens + global styles
```

## Customizing

- **Colors / type** — edit the CSS variables at the top of `src/index.css`.
- **Content** — each section's copy and data lives at the top of its
  own component file (e.g. `PROJECTS` array in `Projects.jsx`,
  `STACK` array in `Skills.jsx`).
- **Sections shown in the side rail / nav** — edit the `SECTIONS`
  array in `ScanRail.jsx` and `LINKS` in `Nav.jsx` together so the ids
  match.

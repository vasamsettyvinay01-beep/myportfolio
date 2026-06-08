# Vinay Vasamsetty — AI Operational Ecosystem

An immersive AI-native operational experience — not a traditional portfolio.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Three.js + React Three Fiber + Drei
- GSAP (installed for future scroll choreography)
- lucide-react
- JetBrains Mono + Geist

## Run

```bash
npm install   # if needed
npm run dev   # http://localhost:3000
```

## Experience architecture

| Zone | Component | Purpose |
|------|-----------|---------|
| Core | `AISystemCore` + `SystemCoreScene` | 3D operational brain with hoverable nodes |
| Systems | `SystemsUniverse` + `ExplodedArchitecture` | Immersive modules with exploded software architecture |
| Terminal | `BuildLogTerminal` | Live ops terminal with scanlines |
| AI Lab | `AILabExperience` | Classified R&D environment |
| Intel | `IntelPanel` | Case study intelligence reports |
| Shell | `ExperienceShell` | Scroll depth, parallax, live ops feed, custom cursor |

## Customize

Edit `lib/data.ts`:

- `CORE_NODES`, `LIVE_OPS_FEED`, `TERMINAL_LOG`
- `SYSTEMS`, `EXPLODED_LAYERS`, `CASE_STUDIES`
- `CONTACT_LINKS`

## New dependencies

```bash
npm install three @react-three/fiber @react-three/drei gsap
npm install -D @types/three
```

# CCNAQuest

A gamified CCNA study app built with Expo + React Native. Dark theme, offline-first, spaced repetition (SM-2 algorithm), journey-style lesson path, and a wizard frog mascot.

## Stack

| Layer | Tech |
|---|---|
| Framework | Expo SDK 54 / React Native 0.81.5 |
| Routing | expo-router v6 (file-based) |
| State | Zustand + AsyncStorage (versioned schema v6) |
| Animations | react-native-reanimated + Animated API |
| Spaced Repetition | Custom SM-2 implementation (`lib/sm2.ts`) |
| Error Tracking | Sentry (disabled in dev) |

## Running locally

```bash
npm install --legacy-peer-deps
npx expo start --web --port 8081
```

> Use `--legacy-peer-deps` for all installs — React 19.1.0 causes peer conflicts.

## Project structure

```
app/            Expo Router screens
  index.tsx     Home — module journey cards + frog mascot
  module/[id]   Module screen — topic card list
  section/[id]  Section screen — Duolingo-style path nodes
  quiz/[id]     Quiz screen — MCQ, TF, fill, word-bank, teach
  result.tsx    Lesson result screen
data/           Static CCNA content (modules, sections, lessons)
lib/
  sm2.ts        Spaced repetition algorithm
  store.ts      Zustand store (XP, hearts, streak, SM-2 state)
  theme.ts      Design tokens (colours, spacing, radius)
  types.ts      TypeScript interfaces
components/     Shared UI (BackButton, HeroPill, PrimaryButton, SectionDivider)
assets/
  animations/frog/   Frog mascot PNGs (idle, celebrate, incorrect, thinking, perfect, streak)
docs/           Architecture, design, QA, and role documents
```

## Content

All CCNA content lives in `data/`. Sections are split into `data/sections/section1.ts`, `section2.ts` etc. Run `npx ts-node scripts/validate.ts` to validate content integrity.

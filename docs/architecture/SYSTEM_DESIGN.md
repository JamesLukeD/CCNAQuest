# CCNAQuest — System Design Blueprint

> Last updated: May 2026 — reflects codebase after W2, W5, W11, W12 fixes and full UI token/component refactor (16 violations resolved).  
> See also: [`docs/ui/UI_AUDIT.md`](../ui/UI_AUDIT.md) · [`docs/visual/VISUAL_STYLE_GUIDE.md`](../visual/VISUAL_STYLE_GUIDE.md) · [`docs/ux/UX_FLOW_AUDIT.md`](../ux/UX_FLOW_AUDIT.md)

---

## 1. Architecture Overview

CCNAQuest is a **static-bundle, offline-first mobile/web study app** built on Expo. There is no backend, no server, and no API. All CCNA content is compiled directly into the JavaScript bundle. State is persisted client-side via AsyncStorage under a single versioned JSON key.

```
┌──────────────────────────────────────────────────────────────┐
│                   Expo Runtime (RN + Web)                    │
│                                                              │
│  ┌──────────────┐   ┌───────────────┐   ┌────────────────┐  │
│  │   UI Layer   │   │  State Layer  │   │   Data Layer   │  │
│  │ Expo Router  │◄──│    Zustand    │◄──│  Static TS     │  │
│  │   Screens    │   │ + AsyncStore  │   │  Content       │  │
│  └──────────────┘   └───────────────┘   └────────────────┘  │
│                            │                                 │
│             ┌──────────────┴─────────────┐                  │
│             │      Algorithm Layer        │                  │
│             │  SM-2 pure fns (lib/sm2.ts) │                  │
│             └────────────────────────────┘                  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Dev / Build Layer                                   │   │
│  │  lib/validateContent.ts  ←  scripts/validate.ts      │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                    No network I/O at runtime
```

**Runtime targets:** iOS, Android (Expo Go / native build), Web (react-native-web).

---

## 2. Module / Component Breakdown

### Routing — `app/` (Expo Router file-based)

| File                  | Role                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `_layout.tsx`         | Root shell — `SafeAreaProvider`, `StatusBar`, `Stack` navigator. Triggers `loadState()` and `warnIfInvalid()` (dev only) on mount      |
| `index.tsx`           | **HomeScreen** — module journey cards with XP/streak/hearts HUD, floating frog mascot                                                  |
| `module/[id].tsx`     | **ModuleScreen** — section cards for a module, progress bar + SM-2 due count per section                                               |
| `section/[id].tsx`    | **SectionScreen** — Duolingo-style wave path with lesson nodes, frog mascot beside active node, `▶ CONNECT / ▶ CONTINUE` callout label |
| `quiz/[lessonId].tsx` | **QuizScreen** — full question engine: all question types, SM-2 grading, celebrate/incorrect frog overlay                              |
| `result.tsx`          | **ResultScreen** — end-of-lesson summary, XP gained, frog reaction, confetti                                                           |

### Library — `lib/`

| File                 | Role                                                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `types.ts`           | All shared TypeScript interfaces — `Question` discriminated union, `Lesson`, `Section`, `Module`, `SM2Card`, `AppState`                                                    |
| `store.ts`           | Zustand store — single source of mutable truth. Contains `SCHEMA_VERSION`, `migrate()`, and all named store actions                                                        |
| `sm2.ts`             | Pure SM-2 algorithm — `updateCard`, `isDue`, `getDueCount`, `getLessonDueCount`, `buildReviewLesson`. No React deps, no side effects                                       |
| `theme.ts`           | Single source of truth for all design tokens — `BG`, `SURFACE_1/2`, `BORDER`, `MUTED`, `MUTED_HERO`, `SPACING`, `RADIUS`, `FONT`                                           |
| `validateContent.ts` | W2/W12 validator — checks MCQ/WordBank/Fill/Teach/Match/CLI answer consistency and module→section referential integrity. Exports `validateContent()` and `warnIfInvalid()` |

### Shared UI Components — `components/`

| File                 | Role                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| `BackButton.tsx`     | Hero-screen back nav (`← Back`, `MUTED_HERO` colour)                         |
| `SectionDivider.tsx` | Horizontal line + label divider used in home and module screens              |
| `PrimaryButton.tsx`  | CTA button with primary/secondary variants — uses `RADIUS.md`, `FONT` tokens |
| `HeroPill.tsx`       | `HeroPill` chip and `HeroProgressBar` used in module/section hero banners    |

### Scripts — `scripts/`

| File          | Role                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `validate.ts` | Standalone CI entry point — calls `validateContent()`, prints issues, exits 1 on failure. Run via `npm run validate` |

### Content — `data/`

| Path                             | Role                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| `modules.ts`                     | 4 `Module` objects (id, title, color, `sections: string[]`)                                |
| `sections/index.ts`              | Barrel — imports all 37 section files, exports `ALL_SECTIONS: Section[]`                   |
| `sections/[N.topic]/[N.slug].ts` | Individual section definitions — each exports a typed `Section` with lessons and questions |

### Assets — `assets/`

- `animations/frog/` — 4 PNGs: `celebrate`, `idle`, `incorrect`, `thinking`
- `animations/celebrate.json` — Lottie animation (native confetti, guarded by `Platform.OS !== 'web'`)

---

## 3. Data Flow

### App Boot

```
_layout.tsx mounts
  → loadState()
      → AsyncStorage.getItem('ccna_quest_v3')
      → JSON.parse
      → migrate(raw)          ← strips _v, applies any upgrade blocks, fills DEFAULT_STATE gaps
      → set(migratedState)    → Zustand
  → if (__DEV__) warnIfInvalid()
      → validateContent()     ← checks all 37 sections + module refs
      → console.warn() on any issue
```

### Navigation

```
HomeScreen
  → module card press  →  /module/[id]
      → ModuleScreen   reads ALL_MODULES + ALL_SECTIONS (static, no fetch)
        → section card press  →  /section/[id]
            → SectionScreen  reads section from ALL_SECTIONS
              → lesson node press  →  /quiz/[sectionId]:[lessonId]
                  → QuizScreen splits param, finds lesson in ALL_SECTIONS
```

### Quiz Session

```
QuizScreen
  ├─ builds question queue from lesson.questions
  ├─ per question: user answers
  │    ├─ CORRECT (first attempt)  → updateSM2(key, 4)
  │    ├─ CORRECT (after re-queue) → updateSM2(key, 3)
  │    └─ WRONG                    → loseHeart() + re-queue
  │                                 → updateSM2(key, 1) on final wrong
  └─ end of lesson
       → completeLesson(lessonId, perfect)
       → router.replace('/result?score=...&xp=...')
```

### SM-2 Key Scheme

```
key = "[lessonId]:[originalQuestionIndex]"
  e.g. "l1:2"  →  lesson l1, 3rd question
```

### Persistence

```
Any store mutation
  → _persist(state)
  → AsyncStorage.setItem('ccna_quest_v3',
      JSON.stringify({ _v: 4, xp, streak, hearts, lastPlayed, completed, sm2 })
    )
    ← fire-and-forget, errors silently swallowed
```

### SM-2 Review Flow

```
SectionScreen: getDueCount(sm2, section) > 0  →  shows ReviewNode
  → press ReviewNode  →  buildReviewLesson(sm2, section)
      → collects due questions across all lessons (capped at 20)
      → serialises to JSON  →  router.push('/quiz/...?reviewData=...')
          → QuizScreen detects reviewData param, JSON.parse()s it
```

---

## 4. External Dependencies

| Package                                           | Purpose                           | Risk                                              |
| ------------------------------------------------- | --------------------------------- | ------------------------------------------------- |
| `expo ~54`                                        | Build tooling, native APIs        | Low                                               |
| `expo-router ~6`                                  | File-based routing                | Low                                               |
| `zustand ^5`                                      | Global state                      | Low                                               |
| `@react-native-async-storage/async-storage 2.2.0` | Local persistence                 | Low                                               |
| `expo-linear-gradient ~15`                        | Hero/card gradients               | Low                                               |
| `lottie-react-native ~7.3.1`                      | Native confetti on result screen  | Medium — native module; web uses pure-JS fallback |
| `@lottiefiles/dotlottie-react ^0.19.2`            | Web Lottie player                 | Low                                               |
| `react-native-safe-area-context ~5.6`             | Inset-aware layouts               | Low                                               |
| `react-native-screens ~4.16`                      | Native screen containers          | Low                                               |
| `react-native-web ^0.21`                          | Web target renderer               | Low                                               |
| `tsx ^4.19` _(devDep)_                            | Run TypeScript scripts (validate) | Low                                               |

> `react-native-reanimated` and `react-native-worklets` have been **removed** — they were installed but never imported anywhere in the source.

---

## 5. Design Patterns Used

**Content as Code** — All 37 sections and their lessons live as typed TypeScript constants compiled into the bundle. Zero network dependency; zero CMS.

**Zustand Command Store** — All state mutations are named actions (`completeLesson`, `loseHeart`, `updateSM2`). Components never mutate state directly. Mirrors the Command pattern.

**Discriminated Union / Strategy** — `Question` is a tagged union (`type: 'mcq' | 'tf' | 'fill' | 'wordbank' | 'match' | 'cli' | 'topology' | 'teach'`). `QuizScreen` switches on `q.type` to select the renderer. New question types require only a union extension and a new case — open/closed principle holds.

**Factory Function** — `buildReviewLesson()` constructs a virtual `Lesson` at runtime from due SM-2 cards, structurally identical to a static lesson so `QuizScreen` requires no special handling.

**Observer / Selector subscriptions** — Components subscribe to specific Zustand slices (`useStore(s => s.completed)`). Only re-render on the slice they care about.

**`useLoop` custom hook** — Encapsulates a repeating `Animated.sequence` loop. Used by PathNode, SectionScreen, HomeScreen to prevent animation setup duplication.

**ND (Native Driver) guard** — `const ND = Platform.OS !== 'web'` constant used app-wide to safely toggle `useNativeDriver`, since the web renderer only supports a subset of animated properties.

**Versioned Migration Runner** — `migrate(raw)` in `store.ts` reads `raw._v` (defaults to 3 for legacy saves), applies sequential `if (version < N)` upgrade blocks, then spreads into `DEFAULT_STATE` to guarantee all fields are present regardless of save age.

---

## 6. Weaknesses & Risks

### Resolved

| #   | Status   | Notes                                                                                                                                           |
| --- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| W2  | ✅ Fixed | `lib/validateContent.ts` + `npm run validate` catches answer/choices mismatches, empty fields, etc. Runs in dev on every boot.                  |
| W3  | ✅ N/A   | `unlockAfter` is live. `isSectionUnlocked()` in `module/[id].tsx` reads it and gates sections behind predecessor completion. Doc was wrong.     |
| W5  | ✅ Fixed | `SCHEMA_VERSION = 4`, `_v` written to every save, `migrate()` runner in `store.ts`. Future shape changes are a single `if (version < N)` block. |
| W6  | ✅ Fixed | `completeLesson` returns `boolean`; `QuizScreen` captures it and passes `streakUp` param; `ResultScreen` shows streak banner when truthy.       |
| W9  | ✅ Fixed | `pendingReview: Lesson \| null` in Zustand; never URL-serialised; cleared on quiz unmount.                                                      |
| W11 | ✅ Fixed | `react-native-reanimated` and `react-native-worklets` uninstalled.                                                                              |
| W12 | ✅ Fixed | `validateContent()` checks every section ID in `modules.ts` against `ALL_SECTIONS` and flags orphaned or duplicate-claimed sections.            |

### Open

**W1 — No content update path.**
All 37 sections are baked into the JS bundle. Any content fix requires a full app release. No CMS, no feature flags, no hot-patch channel.

**W4 — Full-state overwrite on every mutation.**
`_persist()` serialises the entire `AppState` on every store action. As the `sm2` map grows (37 sections × multiple questions each), this becomes a costly synchronous JSON.stringify + AsyncStorage write on every answer tap.

**W7 — Simplified SM-2 quality scale.**
Standard SM-2 uses quality 0–5. This implementation uses only `1 | 3 | 4`. The granularity loss reduces long-term scheduling precision, particularly for "barely correct" answers.

**W8 — Review lesson capped at 20, unordered.**
`buildReviewLesson` slices to 20 with no prioritisation (overdue-first, hardest-first, etc.). As cards accumulate the fixed cap becomes increasingly arbitrary.

**W10 — No test suite.**
Zero unit, integration, or snapshot tests. The SM-2 algorithm, streak logic, migration runner, and all 37 content files have no automated verification beyond the runtime dev-mode validator.

**W13 — No account or sync layer.**
Progress is device-local only. Reinstalling the app or switching devices silently wipes all history. No cloud backup, no cross-device continuity.

---

## 7. File Map

```
CCNAQuest/
├── app/
│   ├── _layout.tsx          Root stack + boot hooks (loadState, warnIfInvalid)
│   ├── index.tsx            HomeScreen
│   ├── result.tsx           ResultScreen
│   ├── module/[id].tsx      ModuleScreen
│   ├── section/[id].tsx     SectionScreen (wave path)
│   └── quiz/[lessonId].tsx  QuizScreen (question engine)
│
├── lib/
│   ├── types.ts             All shared interfaces
│   ├── store.ts             Zustand store + migration runner
│   ├── sm2.ts               SM-2 algorithm (pure)
│   └── validateContent.ts   W2/W12 content + integrity validator
│
├── scripts/
│   └── validate.ts          CI entry point → exits 1 on issues
│
├── data/
│   ├── modules.ts           4 module definitions
│   └── sections/
│       ├── index.ts         Barrel (ALL_SECTIONS)
│       ├── 1.fundamentals/  10 section files
│       ├── 2.routing-switching/  14 section files
│       ├── 3.security-services/   9 section files
│       └── 4.modern-networking/   4 section files
│
├── assets/animations/frog/  celebrate / idle / incorrect / thinking PNGs
└── SYSTEM_DESIGN.md
```

---

## Summary

CCNAQuest has a clean three-layer separation (static content / reactive state / UI), no network dependencies, and a well-bounded algorithm layer (SM-2) that is fully decoupled from React. Recent hardening rounds closed the four most actionable risks: content validation at dev-boot and CI (W2), module→section referential integrity (W12), schema versioning with a migration runner (W5), and dead bundle weight removal (W11).

The remaining open risks fall into two tiers. **Near-term priorities** are W4 (persist writes scale poorly) and W10 (no tests — the migration runner and SM-2 logic are untested). **Longer-term** are W1 (content locked in bundle) and W13 (no account layer), which require architectural decisions beyond the current scope.

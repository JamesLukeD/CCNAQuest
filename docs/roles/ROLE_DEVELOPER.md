# CCNAQuest — Developer Brief

**Date:** 19 May 2026
**Role:** Developer
**Status:** Active — primary contributor

---

## Where Things Stand

The codebase is in a solid state. All 11 bugs from the QA audit are closed, all UX edge states are implemented, Sentry is wired, and the project compiles clean with no TypeScript errors.

**70% launch-ready.** The remaining 30% is almost entirely outside the codebase — assets, legal, and the App Store setup. Your job now shifts from building to integrating as other workstreams deliver.

---

## What You Have Done

| Area                                                       | Status                                |
| ---------------------------------------------------------- | ------------------------------------- |
| All 11 QA bugs (BUG-001–011)                               | ✅ Closed                             |
| All UX edge states (H5, M3, Q1, R5 + all P1–P3)            | ✅ Implemented                        |
| `_persist()` error handling (Sentry + console.error)       | ✅ Done                               |
| `@sentry/react-native` installed + wired                   | ✅ Done (DSN placeholder — see below) |
| `eas.json` created, EAS CLI 18.13.1 installed              | ✅ Done                               |
| `app.json` build-ready (bundleId, scheme, version, colors) | ✅ Done                               |
| 17 SVG icons in `assets/icons/`                            | ✅ Done                               |
| SM-2 spaced repetition functional                          | ✅ Done                               |
| Schema v5 + migration                                      | ✅ Done                               |

---

## Immediate Next Actions

### 1. Sentry DSN — replace placeholder

`_layout.tsx` has `dsn: 'REPLACE_WITH_YOUR_SENTRY_DSN'`. Create a project at [sentry.io](https://sentry.io), copy the DSN, and replace it. Do this before any TestFlight build — without it, production crashes are invisible.

```typescript
// app/_layout.tsx
Sentry.init({
  dsn: "https://YOUR_REAL_KEY@YOUR_ORG.ingest.sentry.io/YOUR_PROJECT_ID",
  debug: __DEV__,
  enabled: !__DEV__,
  tracesSampleRate: 0.2,
});
```

### 2. Apple Developer Program — enrol

- URL: [developer.apple.com/programs/enroll/](https://developer.apple.com/programs/enroll/)
- Cost: $99/yr
- Unblocks: Every iOS build, TestFlight, and App Store submission

### 3. First EAS build (after Apple account is active)

```bash
# From project root
eas login                          # expo.dev account
eas build:configure                # links project, writes projectId to app.json
eas build --platform ios --profile preview
```

The `.ipa` from the preview build goes straight to TestFlight. Watch the build log for `lottie-react-native` native dependency issues — it's the most likely failure point.

### 4. Asset integration (as Illustrator delivers)

When the illustrator delivers files, place them in `assets/animations/frog/` and update these files:

| Asset                  | File to update                                            | Change                                                 |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| `perfect.png`          | `app/result.tsx`                                          | Replace `celebrate.png` fallback on R1 (perfect score) |
| `pointing.png`         | `app/onboarding/mechanics.tsx`, `app/onboarding/path.tsx` | Replace placeholder frog on screens 2 and 3            |
| `streak.png`           | `app/index.tsx`                                           | Replace frog in H4 milestone modal                     |
| `icon.png` (1024×1024) | `app.json` → `"icon"` field                               | Remove placeholder, point to real asset                |
| `adaptive-icon.png`    | `app.json` → `android.adaptiveIcon.foregroundImage`       | Android home screen icon                               |

### 5. Privacy policy hosting (coordinate with Legal)

Once Legal delivers the privacy policy document, host it at a live URL. Options:

- **GitHub Pages** (zero cost, works immediately — create a `gh-pages` branch or a `/docs` folder in a public repo)
- **Netlify / Vercel** (one-click deploy of a static HTML file)
- **Notion** (public page — acceptable but not ideal as it can go behind a login)

The URL gets added to two places:

1. `app.json` → `"privacyPolicyUrl"` field (for Expo)
2. App Store Connect → App Privacy section

### 6. SME content corrections (ongoing)

When the CCNA SME flags corrections, you'll receive them as a review spreadsheet (section ID, field, current value, corrected value). Apply changes to the corresponding files in `data/1.fundamentals/`, `data/2.routing-switching/`, `data/3.security-services/`, `data/4.modern-networking/`. No build steps required — content is static TypeScript.

---

## Key Technical Notes

### npm install flag

Due to `lottie-react-native@7.3.8` / `@lottiefiles/dotlottie-react@0.19.2` peerOptional conflict, always use `--legacy-peer-deps` when installing new packages:

```bash
npm install <package> --legacy-peer-deps
```

### Bundle identifier

Current: `com.cawarden.ccnaquest` in `app.json`. Change this before the first build if your Apple Developer account uses a different reverse-domain.

### Sentry is silent in dev

`enabled: !__DEV__` is intentional — Sentry only reports in production builds. Use `console.error` during development.

### Design tokens

All colours, spacing, and border radius come from `lib/theme.ts`. Do not hardcode values in new components.

---

## Pending Code Work (Post-Asset Delivery)

| Task                                      | Trigger                       | Effort   |
| ----------------------------------------- | ----------------------------- | -------- |
| Integrate `perfect.png` into `result.tsx` | Illustrator delivers asset    | 10 min   |
| Integrate `pointing.png` into onboarding  | Illustrator delivers asset    | 10 min   |
| Integrate `streak.png` into `index.tsx`   | Illustrator delivers asset    | 10 min   |
| Update `app.json` icon fields             | Illustrator delivers icon PNG | 5 min    |
| Add `privacyPolicyUrl` to `app.json`      | Legal delivers live URL       | 2 min    |
| Implement batch 1 content corrections     | SME delivers spreadsheet      | Variable |
| Implement batch 2 content corrections     | SME delivers spreadsheet      | Variable |

---

## Files Reference

| File                      | Purpose                                  |
| ------------------------- | ---------------------------------------- |
| `app/_layout.tsx`         | Root layout, Sentry init, auth redirect  |
| `app/index.tsx`           | HomeScreen                               |
| `app/module/[id].tsx`     | Module detail screen                     |
| `app/section/[id].tsx`    | Section / lesson path screen             |
| `app/quiz/[lessonId].tsx` | Quiz engine                              |
| `app/result.tsx`          | Result screen                            |
| `lib/store.ts`            | Zustand store, all state + actions       |
| `lib/sm2.ts`              | SM-2 spaced repetition algorithm         |
| `lib/theme.ts`            | Design tokens                            |
| `lib/types.ts`            | All TypeScript interfaces                |
| `data/modules.ts`         | Module definitions                       |
| `data/sections/`          | Section and lesson content (37 sections) |
| `eas.json`                | EAS build profiles                       |
| `app.json`                | Expo app config                          |

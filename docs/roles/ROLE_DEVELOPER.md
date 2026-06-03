# CCNAQuest — Developer Brief

**Last updated:** 2 June 2026 — verified from codebase
**Status:** 99% complete — remaining tasks are infrastructure, hosting, and SME integration

---

## What Is Done (verified in code)

| Area | Status |
|---|---|
| All 11 QA bugs (BUG-001–011) | ✅ Closed |
| All UX edge states | ✅ Implemented |
| Schema v6 + migration | ✅ Done |
| Incremental heart refill (30 min, `nextHeartAt`) | ✅ Done |
| SM-2 spaced repetition (`_origIdx` stamping) | ✅ Done |
| Quiz escape button (× via `QuizHeader`) | ✅ Done |
| Correct answer reveal on wrong MCQ/TF | ✅ Done |
| XP bar redesign (16 px, full-width, pulse) | ✅ Done |
| Sentry real DSN in `_layout.tsx` | ✅ Done — do not overwrite |
| `app.json` fully configured (bundleId, scheme, icon, splash, EAS projectId) | ✅ Done |
| `eas.json` with dev/preview/production profiles | ✅ Done |
| All 37 sections written (~1,400 questions, all 4 modules) | ✅ Done |
| All assets: icon, adaptive-icon, splash-icon, 7 frog PNGs, 17 SVG icons | ✅ Done |
| `privacy.html` written (GDPR-compliant, 212 lines) | ✅ Done — needs hosting |

---

## Immediate Tasks (in priority order)

### 1. Fix 2 TypeScript errors

```
app/quiz/[lessonId].tsx(128,55): error TS18047: 'lesson' is possibly 'null'
app/quiz/[lessonId].tsx(137,24): error TS18047: 'lesson' is possibly 'null'
```

Both are inside the `advance()` function. `lesson` is `Lesson | null` and TypeScript doesn't narrow it through the early-return guard into the closure. Add a guard at the top of `advance()`:

```typescript
function advance() {
  if (!lesson) return;   // ← add this line
  if (qIndex + 1 >= questions.length) {
    ...
```

Verify: `npx tsc --noEmit` → 0 errors.

---

### 2. Host `privacy.html` and wire it into `app.json`

The privacy policy HTML is complete at `privacy.html` in the project root. It needs to be at a live, stable URL before App Store submission.

**Fastest option — GitHub Pages:**
1. Push `privacy.html` to a public GitHub repo (or the existing project repo) in a `docs/` folder or `gh-pages` branch
2. Enable GitHub Pages in Settings → Pages
3. URL format: `https://USERNAME.github.io/REPO/privacy.html`

**Once the URL is live, add to `app.json`:**
```json
"privacyPolicyUrl": "https://your-url/privacy.html"
```
Add this inside the `"expo"` object.

---

### 3. Fix Sentry source map upload in production

`eas.json` has `SENTRY_DISABLE_AUTO_UPLOAD: "true"` in both `preview` and `production` profiles. This means production crashes will show obfuscated stack traces.

Remove the flag from the `production` profile (keeping it in `preview` is acceptable):

```json
"production": {
  "autoIncrement": true
}
```

---

### 4. Apple Developer paid tier ($99/yr)

If not yet enrolled: [developer.apple.com/programs/enroll](https://developer.apple.com/programs/enroll/)
- Enrol as Individual (faster — no D-U-N-S number)
- This gates all iOS builds, TestFlight, and App Store Connect

---

### 5. First EAS build

Once Apple Developer account is active:

```bash
eas login                           # expo.dev account
eas build:configure                 # writes projectId to app.json if not set (already set)
eas build --platform ios --profile preview
```

Watch the build log for `lottie-react-native` native dependency failures — most likely single failure point.

The preview `.ipa` goes directly to TestFlight for internal testing.

---

### 6. Accessibility minimum pass

Zero accessibility props exist anywhere in the app. Apple checks VoiceOver during review. Minimum required before submission:

- Add `accessibilityLabel` to all interactive `Pressable` elements
- Add `accessibilityRole="button"` to pressable elements
- Replace hardcoded `fontSize` values in `StyleSheet` with values from `lib/theme.ts` `FONT` tokens so Dynamic Type is respected
- Check touch targets are ≥ 44×44 pt on small screens (iPhone SE)

---

### 7. Implement SME content corrections (ongoing)

When the CCNA SME delivers a corrections spreadsheet, apply changes to the relevant files in:
- `data/sections/1.fundamentals/`
- `data/sections/2.routing-switching/`
- `data/sections/3.security-services/`
- `data/sections/4.modern-networking/`

No build steps required — content is static TypeScript. Run `npx tsc --noEmit` after any data file edits to catch type errors.

---

## Technical Notes

### Install flag
Always use `--legacy-peer-deps` due to `lottie-react-native` / `@lottiefiles/dotlottie-react` peer conflict:
```bash
npm install <package> --legacy-peer-deps
```

### Sentry in dev
`enabled: !__DEV__` — Sentry is silent in development. Use `console.error` during dev. Sentry DSN is real — do not replace it.

### Bundle identifier
`com.cawarden.ccnaquest` — set in `app.json` `ios.bundleIdentifier` and `android.package`. Do not change unless you registered a different identifier with Apple.

### Schema version
`SCHEMA_VERSION = 6` in `lib/store.ts`. Bump this and add a migration case in `migrate()` whenever `AppState` shape changes.

### Question types (active)
`'teach' | 'mcq' | 'tf' | 'fill' | 'wordbank'` — TypeScript `never` exhaustive check in quiz renderer catches any new unhandled type at compile time.

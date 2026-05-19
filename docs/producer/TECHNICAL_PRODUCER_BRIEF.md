# CCNAQuest — Technical Producer Brief

**Date:** 19 May 2026
**Role:** Technical Producer
**Input:** Decisions from PRODUCT_DIRECTOR_BRIEF.md
**Audience:** Solo indie developer, limited hours per day

---

## PRELIMINARY AUDIT RESULT — Action Required Before Starting

> **Decision 4 is already closed.**
> Grep across all 37 section data files finds zero uses of `type: 'match'`, `type: 'cli'`, or `type: 'topology'`.
> These types exist in `lib/types.ts` but no content uses them.
>
> **Action:** Remove `'match'`, `'cli'`, and `'topology'` from the `QuestionType` union in `lib/types.ts` before the SME starts adding content. This is a 5-minute task. Do it today.

---

## 1. THIS WEEK'S TASK LIST

### TODAY (Day 1) — External setup + quick code cleanup

---

#### TASK 1.1 — Remove dead question types from `lib/types.ts`
- **Who:** Developer
- **Time:** 5 minutes
- **Unblocks:** SME safety — prevents them adding questions that silently break
- **Done when:** `lib/types.ts` `QuestionType` union contains only: `'teach' | 'mcq' | 'tf' | 'fill' | 'wordbank'`
- **Action:**
  ```
  In lib/types.ts, change QuestionType to:
  export type QuestionType = 'teach' | 'mcq' | 'tf' | 'fill' | 'wordbank';
  Remove the MatchQuestion, CLIQuestion, TopologyQuestion interfaces and their entries
  from the AnyQuestion union type.
  Run: npx tsc --noEmit  →  must pass with 0 errors
  ```

---

#### TASK 1.2 — Create sentry.io account and get DSN
- **Who:** Developer
- **Time:** 15 minutes
- **Unblocks:** Sentry configuration brief (Section 3 of this document)
- **Done when:** You have a DSN string that looks like `https://abc123@oXXX.ingest.sentry.io/YYY`
- **Action:**
  1. Go to https://sentry.io/signup/ — sign up with GitHub OAuth
  2. Create organisation: `cawarden` (or your preferred slug)
  3. New Project → React Native → name it `ccnaquest`
  4. Copy the DSN from the setup screen (also findable at: Settings → Projects → ccnaquest → Client Keys (DSN))
  5. Note the **org slug** and **project slug** — needed for EAS secrets in Task 2.1

---

#### TASK 1.3 — Engage legal advisor (privacy policy + trademark)
- **Who:** Developer (external commission)
- **Time:** 30 minutes to brief and send
- **Unblocks:** App Store Connect setup, privacy nutrition labels, confirmed app name
- **Done when:** Legal advisor has confirmed receipt and given a delivery date ≤ Day 5
- **Action:**
  - Option A (free, self-serve): Go to https://app.termly.io or https://app.iubenda.com → Privacy Policy generator → answer the questions using the data in `docs/roles/ROLE_LEGAL.md` → publish at a free URL → takes 20 minutes
  - Option B (paid, thorough): Post a brief on Contra.com or Toptal with the `docs/roles/ROLE_LEGAL.md` document attached — budget $200–400, turnaround 3–5 days
  - **Trademark shortcut:** Post the trademark question to https://www.reddit.com/r/legaladvice or email a local IP solicitor with the specific question from `docs/roles/ROLE_LEGAL.md §Deliverable 2`

---

#### TASK 1.4 — Commission illustrator for app icon
- **Who:** Developer (external commission)
- **Time:** 30 minutes to brief and post
- **Unblocks:** App Store submission, splash screen, `app.json` icon fields
- **Done when:** Illustrator has confirmed brief and given a delivery date
- **Action:**
  1. Open `docs/roles/ROLE_ILLUSTRATOR.md` — full brief is written
  2. Post on Fiverr / Contra / Dribbble Hiring with these specs from the brief:
     - App icon: 1024×1024px PNG, Network Wizard Frog on dark `#0a1628` background
     - Deliverables: `icon.png` (1024×1024), `adaptive-icon.png` (1024×1024, safe zone centred), `perfect.png`, `streak.png`, `pointing.png`
  3. Budget: $150–300 for all five assets from one illustrator
  4. Reference: `docs/visual/icon-preview.html` — send this URL as visual reference

---

#### TASK 1.5 — Apply for Apple Developer Program
- **Who:** Developer
- **Time:** 20 minutes to apply; 24–48 hours for Apple to approve
- **Unblocks:** iOS EAS build, TestFlight, App Store Connect
- **Done when:** Email from Apple confirms enrolment is active
- **Action:**
  1. Go to https://developer.apple.com/programs/enroll/
  2. Sign in with your Apple ID
  3. Enrol as Individual (not Organisation — faster approval, no D-U-N-S number needed)
  4. Pay $99/year
  5. Come back to Task 3.3 (iOS EAS build profile) once active

---

#### TASK 1.6 — Set up Google Play Console
- **Who:** Developer
- **Time:** 30 minutes
- **Unblocks:** Android submission
- **Done when:** App record created in Play Console with bundle ID `com.cawarden.ccnaquest`
- **Action:**
  1. Go to https://play.google.com/console → sign in → pay $25 one-time registration
  2. Create app → App name: `CCNAQuest` → Default language: English (United Kingdom) → App or game: App → Free or paid: Free
  3. Complete the mandatory declarations (content rating, target audience, data safety)
  4. Create an **Internal Testing** track — this is where you upload the first APK
  5. Note: Data Safety form needs privacy policy URL (from Task 1.3) — you can save as draft and come back

---

### TOMORROW (Day 2) — Sentry wired up + store IAP scaffolding

---

#### TASK 2.1 — Add Sentry credentials as EAS secrets
- **Who:** Developer
- **Time:** 10 minutes
- **Prerequisite:** Task 1.2 done (you have DSN, org slug, project slug)
- **Done when:** `eas secret:list` shows three secrets set for the project
- **Action:**
  ```bash
  export EXPO_TOKEN=jl4983UjGMLaQ56wis4XYwdw_4pYQaJ2hVBnXDdw

  # Get your Sentry auth token from: https://sentry.io/settings/account/api/auth-tokens/
  # Create token with: project:releases, org:read scopes

  eas secret:create --scope project --name SENTRY_AUTH_TOKEN --value "YOUR_AUTH_TOKEN"
  eas secret:create --scope project --name SENTRY_ORG --value "cawarden"
  eas secret:create --scope project --name SENTRY_PROJECT --value "ccnaquest"
  ```

---

#### TASK 2.2 — Update `_layout.tsx` DSN (already set — verify only)
- **Who:** Developer
- **Time:** 2 minutes
- **Done when:** DSN in `_layout.tsx` line 12 matches the one from sentry.io exactly
- **Note:** The DSN `https://9f196e8397ae01ba65bff40afa5e4df2@o4511417131335680.ingest.de.sentry.io/4511417154928720` is already set in `_layout.tsx`. If this DSN was generated during this session, it is real and correct — no change needed. If it was a placeholder, replace it now.

---

#### TASK 2.3 — Enable Sentry source map upload in `eas.json`
- **Who:** Developer
- **Time:** 5 minutes
- **Done when:** `SENTRY_DISABLE_AUTO_UPLOAD` is removed from both `preview` and `production` env blocks in `eas.json`
- **Action:** See Section 3 (Sentry Configuration Brief) for the exact file change

---

#### TASK 2.4 — Create `sentry.properties` file
- **Who:** Developer
- **Time:** 5 minutes
- **Done when:** File exists at project root and EAS build can read it
- **Action:** See Section 3 (Sentry Configuration Brief)

---

#### TASK 2.5 — Add `expo-in-app-purchases` to the project
- **Who:** Developer
- **Time:** 15 minutes
- **Unblocks:** IAP implementation (Section 2)
- **Done when:** Package installed, no peer dep errors, `npx expo install` completes cleanly
- **Action:**
  ```bash
  cd /home/daggy/Documents/Cawarden/CCNA/CCNAQuest
  npx expo install expo-in-app-purchases
  ```
  Then add `"expo-in-app-purchases"` to the `plugins` array in `app.json`.

---

#### TASK 2.6 — Add `unlockedModules` field to Zustand store
- **Who:** Developer
- **Time:** 20 minutes
- **Unblocks:** IAP gate in ModuleScreen and HomeScreen
- **Done when:** `lib/store.ts` has `unlockedModules: string[]` in state, `unlockModule(id)` action exists, schema version bumped to 6
- **Action:** See Section 2 (IAP Implementation Brief) for exact spec

---

### REST OF WEEK (Days 3–5) — IAP implementation + Play Store prep

---

#### TASK 3.1 — Implement IAP gate in `app/module/[id].tsx` and `app/index.tsx`
- **Who:** Developer
- **Time:** 3–4 hours
- **Done when:** Modules 2–4 show a locked state on HomeScreen; tapping a locked module opens the purchase sheet; successful purchase unlocks the module and persists across app restarts
- **Action:** Follow IAP Implementation Brief (Section 2 of this document). Hand it to Copilot.

---

#### TASK 3.2 — Create IAP product IDs in App Store Connect and Google Play Console
- **Who:** Developer
- **Time:** 30 minutes each platform
- **Prerequisite:** Apple Developer account active (Task 1.5), Play Console set up (Task 1.6)
- **Done when:** Product ID `ccnaquest_modules_unlock` exists in both stores with price tier set to $4.99
- **Action:**
  - App Store Connect: App → In-App Purchases → + → Non-Consumable → Product ID: `ccnaquest_modules_unlock` → Price: $4.99
  - Play Console: App → Monetisation → Products → In-app products → Create → Product ID: `ccnaquest_modules_unlock` → Price: $4.99

---

#### TASK 3.3 — Build and submit to Google Play Internal Testing
- **Who:** Developer
- **Time:** 1 hour (EAS build ~20 minutes, upload ~10 minutes)
- **Prerequisite:** Sentry configured (Tasks 2.1–2.4), Google Play Console set up (Task 1.6)
- **Done when:** APK/AAB visible in Play Console Internal Testing track and at least one internal tester invited
- **Action:**
  ```bash
  export EXPO_TOKEN=jl4983UjGMLaQ56wis4XYwdw_4pYQaJ2hVBnXDdw
  # Build AAB for Play Store (AAB required for production, APK for internal testing is fine)
  eas build --platform android --profile production
  # Then: Play Console → Internal Testing → Create release → Upload AAB
  ```

---

#### TASK 3.4 — SME: brief on Modules 2–4 timeline
- **Who:** Developer (coordination task)
- **Time:** 15 minutes
- **Done when:** SME has confirmed a review schedule for Modules 2–4 (14 + 9 + 4 = 27 sections)
- **Action:** Send the SME `docs/roles/ROLE_SME.md` and ask for a section-by-section schedule. If the SME is you, block 45 minutes per section = 20 hours total across 2 weeks.

---

## 2. IAP IMPLEMENTATION BRIEF

> Hand this section to Copilot as a task brief.

### Decision: Use `expo-in-app-purchases`

**Why not `react-native-iap`:** `expo-in-app-purchases` is the Expo-maintained library, works cleanly with EAS builds, and has no extra native linking steps. `react-native-iap` is more feature-rich but adds complexity that isn't needed for a single non-consumable product.

**Product model:** One non-consumable product unlocks Modules 2, 3, and 4 simultaneously. Product ID: `ccnaquest_modules_unlock`. Price: $4.99. There is no per-module unlock — it is all-or-nothing.

---

### Store changes — `lib/store.ts`

**Add to `AppState` interface:**
```typescript
unlockedModules: string[];   // array of module IDs — 'fundamentals' always present
```

**Add to `DEFAULT_STATE`:**
```typescript
unlockedModules: ['fundamentals'],
```

**Add action:**
```typescript
unlockAllModules: () => void;
// Implementation: set({ unlockedModules: ALL_MODULES.map(m => m.id) }) then _persist()
```

**Bump `SCHEMA_VERSION` from `5` to `6`.**

**Add migration case in `migrate()` function:**
```typescript
case 5:
  state.unlockedModules = ['fundamentals'];
  state._version = 6;
  // fallthrough
```

---

### Navigation gate — `app/index.tsx` (HomeScreen)

The `ModuleCard` component already renders a locked visual state based on the `unlocked` prop passed from the module list. Extend this:

1. Read `unlockedModules` from the store in the `HomeScreen` component
2. For each module card, pass `isLocked = !unlockedModules.includes(mod.id)`
3. When a locked module is tapped, do **not** navigate — instead open the purchase modal

**Purchase modal behaviour:**
- Full-screen modal (not bottom sheet — keeps it simple)
- Shows: module unlock price (`$4.99`), list of what's included (Modules 2, 3, 4), a "Unlock All Modules" button, a "Restore Purchases" button, a close button
- "Unlock All Modules" triggers the `expo-in-app-purchases` purchase flow
- On successful purchase: call `unlockAllModules()` from the store, dismiss modal, navigate to the module
- On restore: call `getProductsAsync` + check purchase history, call `unlockAllModules()` if found
- On error: show inline error text — do not crash

---

### Navigation gate — `app/module/[id].tsx` (ModuleScreen)

On load, check if the module is in `unlockedModules`. If not:
- Render the module hero and section list but with all sections visually locked (already styled)
- Show a sticky bottom CTA: "Unlock All Modules — $4.99"
- Tapping CTA opens the same purchase modal as HomeScreen

This means a user can browse the locked module content structure but cannot enter any section.

---

### Purchase flow — `lib/iap.ts` (new file)

Create `lib/iap.ts` to encapsulate all IAP logic:

```
Functions to implement:
- initIAP(): connect to the store, set up purchase listener
- getUnlockProduct(): fetch the ccnaquest_modules_unlock product details
- purchaseUnlock(): initiate purchase, handle IAPErrorCode cases
- restorePurchases(): check existing purchase history
- cleanupIAP(): disconnect listener on unmount
```

Call `initIAP()` in `_layout.tsx` once on app start (after Sentry.init). Call `cleanupIAP()` in the layout's cleanup effect.

---

### Testing IAP in development

- iOS: Use Sandbox testers — add in App Store Connect → Users and Access → Sandbox Testers. Sign out of App Store on device, sign in with sandbox account.
- Android: Use Play Console licence testers — add your Google account under Setup → Licence Testing. Internal testing track APK must be installed (not sideloaded).
- Both: `expo-in-app-purchases` has `__DEV__` awareness — purchases in dev mode will be flagged as sandbox automatically.

---

### Done state

IAP is complete when:
- [ ] Module 1 accessible to all users with no paywall
- [ ] Tapping Module 2, 3, or 4 on a fresh install shows the purchase modal
- [ ] Completing a sandbox purchase unlocks all three modules
- [ ] Relaunching the app after purchase still shows all modules unlocked
- [ ] "Restore Purchases" on a fresh install after a sandbox purchase restores access
- [ ] TypeScript compiles with 0 errors after all changes

---

## 3. SENTRY CONFIGURATION BRIEF

> Sequential steps. Complete in order. Do not skip ahead.

### Step 1 — sentry.io account (Task 1.2 above — do this first)

Already covered in Task 1.2. You need: **DSN**, **org slug**, **project slug**, **auth token**.

Get the auth token at: https://sentry.io/settings/account/api/auth-tokens/
- Click "Create New Token"
- Scopes: `project:releases`, `org:read`, `project:read`
- Copy the token — it is shown only once

---

### Step 2 — Verify `_layout.tsx` DSN

`app/_layout.tsx` line 12 already contains:
```typescript
dsn: 'https://9f196e8397ae01ba65bff40afa5e4df2@o4511417131335680.ingest.de.sentry.io/4511417154928720',
```

If this DSN is the real one from your sentry.io account, no change needed.
If this is a placeholder, replace it with the DSN from: sentry.io → Settings → Projects → ccnaquest → Client Keys (DSN).

The rest of the Sentry init config in `_layout.tsx` is correct as-is:
```typescript
debug: __DEV__,          // logs to console in dev, silent in prod
enabled: !__DEV__,       // only reports to Sentry in production builds
tracesSampleRate: 0.2,   // 20% performance tracing — fine for v1
```

---

### Step 3 — Create `sentry.properties` at project root

Create file: `/home/daggy/Documents/Cawarden/CCNA/CCNAQuest/sentry.properties`

```properties
defaults.url=https://sentry.io/
defaults.org=cawarden
defaults.project=ccnaquest
auth.token=YOUR_SENTRY_AUTH_TOKEN
```

Replace `YOUR_SENTRY_AUTH_TOKEN` with the token from Step 1.

> ⚠️ Add `sentry.properties` to `.gitignore` — it contains your auth token.
> ```bash
> echo "sentry.properties" >> .gitignore
> ```

---

### Step 4 — Add EAS secrets (Task 2.1)

```bash
export EXPO_TOKEN=jl4983UjGMLaQ56wis4XYwdw_4pYQaJ2hVBnXDdw

eas secret:create --scope project --name SENTRY_AUTH_TOKEN --value "YOUR_AUTH_TOKEN"
eas secret:create --scope project --name SENTRY_ORG       --value "cawarden"
eas secret:create --scope project --name SENTRY_PROJECT   --value "ccnaquest"
```

Verify:
```bash
eas secret:list
# Should show: SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT
```

---

### Step 5 — Remove `SENTRY_DISABLE_AUTO_UPLOAD` from `eas.json`

Current `eas.json` has `SENTRY_DISABLE_AUTO_UPLOAD: "true"` in both `preview` and `production`. Remove these env blocks now that credentials are configured.

**File to change:** `eas.json`

**Before:**
```json
"preview": {
  "distribution": "internal",
  "ios": { "simulator": false },
  "env": { "SENTRY_DISABLE_AUTO_UPLOAD": "true" }
},
"production": {
  "autoIncrement": true,
  "env": { "SENTRY_DISABLE_AUTO_UPLOAD": "true" }
}
```

**After:**
```json
"preview": {
  "distribution": "internal",
  "ios": { "simulator": false }
},
"production": {
  "autoIncrement": true
}
```

---

### Step 6 — Verify `app.json` Sentry plugin config

`app.json` should have `"@sentry/react-native/expo"` in the plugins array with no options (the `uploadSourceMaps: false` override was added during the build failure debugging — remove it if present):

```json
"plugins": [
  "expo-router",
  "@sentry/react-native/expo"
]
```

If it currently reads `["@sentry/react-native/expo", { "uploadSourceMaps": false }]`, change it to just `"@sentry/react-native/expo"`.

---

### Step 7 — Test the configuration with a production build

```bash
export EXPO_TOKEN=jl4983UjGMLaQ56wis4XYwdw_4pYQaJ2hVBnXDdw
eas build --platform android --profile production
```

**Done when:**
- [ ] Build succeeds (no Gradle error about missing org slug)
- [ ] Build log shows `SentryUpload` task completing successfully (not SKIPPED and not FAILED)
- [ ] In sentry.io → Releases, a new release entry appears with the build version
- [ ] Trigger a test crash: in `_layout.tsx`, temporarily add `Sentry.captureException(new Error('test'))` inside `useEffect`, build, check sentry.io Issues tab — the error should appear with a readable stack trace

Remove the test crash line after confirming.

---

### Summary — Files changed by Sentry configuration

| File | Change |
|------|--------|
| `app/_layout.tsx` | Verify DSN is real (no code change if already set) |
| `eas.json` | Remove `SENTRY_DISABLE_AUTO_UPLOAD` from preview + production |
| `app.json` | Remove `uploadSourceMaps: false` option from Sentry plugin if present |
| `sentry.properties` | **Create** — org, project, auth token |
| `.gitignore` | Add `sentry.properties` |
| EAS secrets | Add `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` via CLI |

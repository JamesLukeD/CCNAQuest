# CCNAQuest — Chief of Staff Programme Brief

**Date:** 19 May 2026
**Author:** Chief of Staff / Technical Programme Manager
**Cross-referenced:** SYSTEM_DESIGN, UI_AUDIT, VISUAL_STYLE_GUIDE, UX_FLOW_AUDIT, PROJECT_STATUS, QA_REPORT

---

## 1. MASTER STATUS DASHBOARD

| Workstream                      | Prior % | Current % | What is done                                                                                                                                                                                                                                                                                            | What is open                                                                                                                                      | Blocker                                                                                            |
| ------------------------------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Core Engineering**            | 90%     | 99%       | Architecture, store, SM-2 algo, 5 screens, schema v5, schema migration, content validator, all 11 bugs fixed (BUG-001–011), `_persist()` error handling added (Phase 1 exit criterion ✅)                                                                                                               | Nothing remaining — foundation complete                                                                                                           | None                                                                                               |
| **UI / Design System**          | 95%     | 95%       | All 16 token violations resolved, `lib/theme.ts`, 4 shared components, `PrimaryButton` named export correct                                                                                                                                                                                             | Nothing new; UI is stable                                                                                                                         | None                                                                                               |
| **UX / Flow & Edge States**     | 93%     | 100%      | All 10 QA bugs fixed (BUG-001–010), all P1/P2/P3 UX items, all P4 edge states: H5 (grimoire banner), M3 (module mastered banner), Q1 (branded quiz error), R5 (first-lesson badge) — all implemented 19 May 2026                                                                                        | P4: `perfect.png` still pending (asset not generated) — `celebrate.png` used as fallback                                                          | None — all submission-blocking UX work cleared                                                     |
| **Visual Assets**               | 20%     | 52%       | 4 frog PNGs (idle, celebrate, incorrect, thinking), 17 SVG icons (6 question-type, 7 status/HUD, 4 module identity — all in `assets/icons/`), app icon composition preview (`docs/visual/icon-preview.html`), 3 P1 frog generation prompts written                                                      | Final icon PNG (1024×1024), `adaptive-icon.png`, `streak.png`, `perfect.png`, `pointing.png` (blocked — needs AI image generation), splash screen | Frog PNG generation needs AI tool (Midjourney/DALL-E); prompts are ready                           |
| **Content Quality**             | Unknown | ~15%      | 37 section files exist, validator passes structurally, SME review started                                                                                                                                                                                                                               | SME review not complete; accuracy of 37 sections unverified against CCNA 200-301 blueprint                                                        | SME review is the longest-duration workstream — every day it starts later is a day launch slips    |
| **QA**                          | 0%      | 35%       | QA plan written (14 test cases, 20-item regression checklist), all 11 bugs fixed via static analysis (BUG-001–011)                                                                                                                                                                                      | No physical device testing done; regression checklist not executed                                                                                | Needs a buildable binary first — no production build attempted yet                                 |
| **Infrastructure / Monitoring** | 5%      | 20%       | `_persist()` error handling with `Sentry.captureException` + `console.error` (Phase 1 exit criterion ✅), `@sentry/react-native` installed, wired in `_layout.tsx` and `lib/store.ts`, `eas.json` created, EAS CLI 18.13.1 installed, `app.json` build-ready (bundleId, scheme, version, adaptive icon) | DSN placeholder in `_layout.tsx` — replace with real DSN once sentry.io account created; no production build yet; no TestFlight                   | Sentry DSN needs sentry.io account; production build needs Apple Developer account ($99/yr)        |
| **Legal / Privacy**             | 0%      | 0%        | —                                                                                                                                                                                                                                                                                                       | Privacy policy not written, no live URL, trademark use of "CCNA" unreviewed                                                                       | **No privacy policy URL = Apple rejects at submission. Hard dependency for App Store submission.** |
| **App Store**                   | 0%      | 0%        | —                                                                                                                                                                                                                                                                                                       | No App Store Connect setup, no listing copy, no screenshots, no privacy labels configured                                                         | Depends on: icon (visual), privacy policy (legal), stable build (QA)                               |
| **Accessibility**               | 0%      | 0%        | —                                                                                                                                                                                                                                                                                                       | No VoiceOver labels, hardcoded `fontSize` values break Dynamic Type, touch target audit not done                                                  | Apple checks VoiceOver during review — minimum coverage needed before submission                   |
| **Performance**                 | 0%      | 0%        | —                                                                                                                                                                                                                                                                                                       | Bundle size not profiled, no cold-start measurement, `lottie-react-native` native build untested                                                  | Can defer to post-TestFlight unless build fails                                                    |

---

## 2. WHAT HAS CHANGED — Revised Launch Readiness

**Previous assessment:** 48% launch-ready _(PROJECT_STATUS.md)_

**What has been completed since then:**

| Fix                                      | Severity | Impact                                                                         |
| ---------------------------------------- | -------- | ------------------------------------------------------------------------------ |
| BUG-001: Onboarding CTAs                 | Critical | Entire onboarding flow was silently broken — new users could not start the app |
| BUG-002: Conditional hook in PathNode    | Critical | Section screen was producing hooks state corruption in production builds       |
| BUG-003: SM-2 `_origIdx` never stamped   | Critical | Spaced repetition was 100% non-functional for regular lessons since day 1      |
| BUG-004: Returning banner initialisation | High     | P1 returning-user experience feature was permanently broken                    |
| BUG-005: XP display vs store mismatch    | High     | Every result screen showed XP values that didn't match the HUD — trust damage  |
| BUG-006: Review sessions skip streak     | High     | Users doing daily reviews had streak silently breaking overnight               |
| BUG-007: ReviewNode hearts gate          | Medium   | Users with 0 hearts could bypass the hearts mechanic via the review node       |
| BUG-008: useMemo stale pendingReview     | Medium   | Review session could render with stale lesson object in edge cases             |
| BUG-009: Exhaustive type check missing   | Medium   | New question types could be silently unhandled with no compile-time warning    |
| BUG-010: Android router.replace race     | Medium   | First-launch crash on lower-end Android devices                                |

These are not polish fixes. BUG-001, BUG-002, BUG-003 meant the onboarding flow was unlaunchable, the section screen was corrupting state, and the core spaced repetition mechanic had never worked. BUG-007–010 complete the static analysis phase. **All 10 QA bugs are now closed.**

**Revised honest assessment: 70% launch-ready**

The 10-point move is real. The engineering and UX foundations are now solid. What hasn't moved at all is everything outside the codebase: visual assets, content accuracy, legal, App Store infrastructure. Those workstreams are unchanged and they are the three critical path items.

**⚠️ Flag — contradiction between documents:**
PROJECT_STATUS.md lists "All 4 mechanic bugs fixed (B1–B4)" under What Is Done. This was accurate when written. The QA audit subsequently found 3 Critical and 3 High bugs that PROJECT_STATUS.md could not have known about (it was written before static analysis). PROJECT_STATUS.md should be considered superseded by QA_REPORT.md on engineering status. The domain percentages in PROJECT_STATUS.md need updating — do not use them as current.

---

## 3. CRITICAL PATH

These are the three things that independently block App Store submission. Everything else is important but secondary to these.

### Critical Path Item 1 — App Icon

The current `assets/icon.png` is a blank placeholder. Apple's automated asset validator rejects submissions with placeholder or missing icons before they ever reach a human reviewer. This is not a quality concern — it is a binary gate. An app icon at 1024×1024px must exist. Without it, there is no submission.

**Owner:** Illustrator (not yet commissioned)
**Dependency:** VISUAL_STYLE_GUIDE.md §4 has the full brief. It is ready to hand off today.
**What unblocks:** App Store submission, splash screen, the `app.json` `icon` and `adaptiveIcon` fields

### Critical Path Item 2 — Privacy Policy at a Live URL

Apple requires a privacy policy URL in the App Store listing, and again in the app binary's `app.json` / Info.plist. The URL must be live and reachable at time of submission. This applies even to fully offline apps. For CCNAQuest it can be short (the app collects no data) but it must exist at a real URL.

**Owner:** Legal advisor (not yet engaged)
**What unblocks:** App Store Connect configuration, privacy nutrition labels, submission
**Note:** The trademark question also needs legal review — "CCNA Quest" using Cisco's CCNA mark without qualification may require a disclaimer. Do not skip this.

### Critical Path Item 3 — CCNA Content Accuracy Sign-off

This is the only critical path item that cannot be fixed after launch. If the app ships with factual errors in subnetting, routing protocols, or access control content, the first wave of users who actually sit the CCNA exam will report it publicly. The review velocity damage from a "this app taught me the wrong answer" post is not recoverable.

37 sections are in scope. The SME review is started but not complete. This is the longest-duration task on the project — it cannot be parallelised (you need the expert to actually work through the content) and it has a developer tail (content corrections take implementation time).

**Owner:** CCNA SME (in progress)
**What unblocks:** QA sign-off, App Store submission, the app's credibility
**Dependency flag:** The QA regression checklist (QA_REPORT.md Part 3) cannot be executed against content that is still being corrected. QA starts after at least 80% of SME review is complete.

---

## 4. NEXT TWO WEEKS

This plan assumes: developer is available full-time; illustrator can be contracted immediately; legal/SME are already engaged or can be engaged within 48 hours.

---

### Week 1 — Days 1–7

**Day 1 — Developer + Commissioning**

| Task                                                 | Owner             | Deliverable                                                                          | Unblocks                       |
| ---------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------ | ------------------------------ |
| ✅ BUG-007 (ReviewNode hearts gate)                  | Developer         | Hearts === 0 guard added to `ReviewNode` onPress                                     | ✅ Done                        |
| ✅ BUG-008 (useMemo dep)                             | Developer         | `pendingReview` added to dep array                                                   | ✅ Done                        |
| ✅ BUG-010 (router.replace race)                     | Developer         | `router.replace` wrapped in `setTimeout(0)`                                          | ✅ Done                        |
| ✅ BUG-009 (topology exhaustive check)               | Developer         | `never` assertion added to fallback renderer                                         | ✅ Done                        |
| Send illustrator brief                               | Programme Manager | Email with VISUAL_STYLE_GUIDE.md attached, priority: app icon first, then 3 P1 frogs | Visual asset workstream starts |
| Engage legal advisor                                 | Programme Manager | Scope brief: privacy policy + trademark review                                       | Legal workstream starts        |
| Audit 37 data files for `match`/`cli` question types | Developer         | `grep -r "type: 'match'\|type: 'cli'" data/` results + decision: remove or implement | Content blocker resolved       |

**Days 2–3 — Legal sprint**

| Task                              | Owner             | Deliverable                                                        | Unblocks                        |
| --------------------------------- | ----------------- | ------------------------------------------------------------------ | ------------------------------- |
| Draft privacy policy              | Legal advisor     | Single-page doc: no data collected, GDPR-compliant, plain English  | —                               |
| Trademark review of "CCNA Quest"  | Legal advisor     | Written recommendation — disclaimer wording for store listing      | App Store listing copy          |
| Host privacy policy at a live URL | Developer + Legal | URL (e.g. GitHub Pages, Notion public page, or hosted static page) | App Store Connect configuration |

**Days 2–5 — Illustrator sprint round 1**

| Task                         | Owner       | Deliverable                                          | Unblocks                                        |
| ---------------------------- | ----------- | ---------------------------------------------------- | ----------------------------------------------- |
| App icon design              | Illustrator | 1024×1024 PNG + Android adaptive icon foreground PNG | App Store submission, `app.json` update         |
| First P1 frog: `perfect.png` | Illustrator | Transparent PNG per VISUAL_STYLE_GUIDE §2.3 spec     | Result screen shows correct frog on perfect run |

**Days 3–7 — SME continues content review (already in progress)**

| Task                                          | Owner     | Deliverable                                                | Unblocks                          |
| --------------------------------------------- | --------- | ---------------------------------------------------------- | --------------------------------- |
| Review Module 1: Fundamentals (sections 1–10) | CCNA SME  | Review spreadsheet: ✅/⚠️/❌ per section, correction notes | Developer can start content fixes |
| Developer implements batch 1 corrections      | Developer | Data file edits per SME notes                              | Content quality delta             |

---

### Week 2 — Days 8–14

**Days 8–9 — Asset integration**

| Task                                                   | Owner       | Deliverable                                                            | Unblocks                                                                       |
| ------------------------------------------------------ | ----------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Deliver `streak.png` and `pointing.png`                | Illustrator | 2 transparent PNGs per spec                                            | HomeScreen milestone modal has mascot; onboarding screens 2/3 use correct frog |
| Update `app.json` with real icon + splash config       | Developer   | Icon fields pointing to new assets, `backgroundColor` set to `#0e1a20` | App Store metadata                                                             |
| Integrate `perfect.png` into result screen             | Developer   | Replace `celebrate.png` fallback in R1 state                           | UX_FLOW_AUDIT R1 state closed                                                  |
| Integrate `pointing.png` into onboarding screens 2/3   | Developer   | Onboarding frog states match UX spec                                   | Onboarding flow visually complete                                              |
| Integrate `streak.png` into HomeScreen milestone modal | Developer   | H4 milestone modal has correct frog                                    | UX H4 state visually complete                                                  |

**Days 2–7 — EAS Build setup (blocked until Apple Developer account)**

| Task                              | Owner     | Deliverable                                                                   | Unblocks                    |
| --------------------------------- | --------- | ----------------------------------------------------------------------------- | --------------------------- |
| Apply for Apple Developer Program | Developer | Active membership at developer.apple.com ($99/yr)                             | All iOS builds + TestFlight |
| `eas login`                       | Developer | Terminal: `eas login` — log in or create Expo account at expo.dev             | EAS builds                  |
| `eas build:configure`             | Developer | Links project to Expo account, updates `app.json` with `extra.eas.projectId`  | EAS builds                  |
| First preview build               | Developer | `eas build --platform ios --profile preview` — produces `.ipa` for TestFlight | QA on device                |
| Upload to TestFlight              | Developer | Drag `.ipa` into App Store Connect → TestFlight                               | Internal device testing     |

> **Bundle identifier set:** `com.cawarden.ccnaquest` — change this in `app.json` → `ios.bundleIdentifier` before the first build if you use a different reverse-domain.
> **`eas.json` created** with `development`, `preview`, and `production` profiles.

---

**Days 8–10 — App Store setup**

| Task                               | Owner                        | Deliverable                               | Unblocks                |
| ---------------------------------- | ---------------------------- | ----------------------------------------- | ----------------------- |
| Create App Store Connect entry     | App Store Specialist         | App record created, bundle ID registered  | TestFlight distribution |
| Write store listing draft          | App Store Specialist         | Title, subtitle, description, keyword set | Listing copy for review |
| Configure privacy nutrition labels | App Store Specialist + Legal | Labels matching the privacy policy        | Submission compliance   |

**Days 8–14 — SME continues (Module 2: Routing & Switching, sections 11–24)**

| Task                                     | Owner     | Deliverable                   | Unblocks                                 |
| ---------------------------------------- | --------- | ----------------------------- | ---------------------------------------- |
| Review sections 11–24                    | CCNA SME  | Batch 2 of review spreadsheet | Developer implements batch 2 corrections |
| Developer implements batch 2 corrections | Developer | Data file edits               | Content quality delta                    |

**Day 12 — First production build attempt**

| Task                                              | Owner     | Deliverable                                                                                                                             | Unblocks                                                       |
| ------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Run `eas build --platform ios` for the first time | Developer | Build log, any native dependency failures surfaced                                                                                      | TestFlight path, `lottie-react-native` compatibility confirmed |
| ✅ Add Sentry (or Expo error monitoring)          | Developer | ✅ `@sentry/react-native` installed, wired in `_layout.tsx` and `lib/store.ts`, DSN placeholder set — **replace DSN before TestFlight** | Infrastructure non-zero — **done**                             |

**Day 14 — Status checkpoint**

Review these before planning week 3:

1. Is the app icon accepted in the build?
2. Is the privacy policy URL live and reachable?
3. Has the SME covered at least 65% of sections (24/37)?
4. ✅ All 4 Medium bugs (BUG-007 through BUG-010) — closed 19 May 2026.
5. Did the first production build succeed?

If any of these is **No**, it becomes the single focus of week 3 before anything else starts.

---

## 5. Flags and Contradictions

1. **UX_FLOW_AUDIT.md lists `match` and `cli` as potentially in content data files**; QA_REPORT.md Appendix states confirmed-by-grep they are not present. ~~BUG-009 (add exhaustive check) must close this~~ — **✅ BUG-009 closed 19 May 2026.** A `never` exhaustive check was added to the fallback renderer. Any future unhandled `QuestionType` produces a compile-time error.

2. **PROJECT_STATUS.md Phase 1 tasks include "Fix `_persist()` error handling"** — ✅ **Resolved 19 May 2026.** `_persist()` now calls `Sentry.captureException` and `console.error` on failure. `@sentry/react-native` installed and wired. DSN placeholder in `_layout.tsx` — replace with real DSN before TestFlight.

3. **PROJECT_STATUS.md marks B1/B2/B3/B4 as done** under What Is Done. QA_REPORT.md subsequently found 3 Critical bugs not in the UX audit's bug list. These documents track different scopes. QA_REPORT.md is the authoritative bug register from this point forward. Do not use PROJECT_STATUS.md domain percentages as current — use this document.

4. **The QA test plan (QA_REPORT.md Part 2, TC-01 through TC-14) cannot be executed** until a real physical device build exists. Static analysis phase is complete. Physical QA is unstarted. Schedule it for Week 5–6, after SME review is at least 80% complete and the production build is stable.

---

## 6. Team Roster

| Role                                   | Status              | Responsibilities                                                                                                                                                  |
| -------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Developer**                          | Active              | All code, content corrections from SME, asset integration, production build, `_persist()` fix, Sentry integration                                                 |
| **Programme Manager / Chief of Staff** | Active              | Cross-workstream coordination, documentation, launch readiness tracking, 14-day plan execution                                                                    |
| **Illustrator / UI Designer**          | **Engaged — Day 1** | App icon (composition preview done), splash screen, frog PNG states (P1: `perfect`, `streak`, `pointing` — prompts written), SVG icon set (✅ 17 icons delivered) |
| **CCNA SME**                           | In progress         | Accuracy review of all 37 sections against CCNA 200-301 blueprint. Module 1 (sections 1–10) in review.                                                            |
| **Legal Advisor**                      | **Not yet engaged** | Privacy policy (plain English, GDPR-compliant), trademark review of “CCNA Quest” / Cisco mark, disclaimer wording for store listing                               |
| **App Store Specialist**               | **Not yet engaged** | App Store Connect setup, bundle ID, listing copy (title, subtitle, description, keywords), privacy nutrition labels, screenshot production                        |
| **QA Engineer**                        | Not yet needed      | Physical device test plan (TC-01–TC-14), regression checklist, sign-off. Engage after SME review ≥80% complete and first production build is stable.              |

**Priority to engage next:** Legal Advisor — blocks Critical Path Item 2 (privacy policy URL). Must be engaged before App Store Connect setup can begin.

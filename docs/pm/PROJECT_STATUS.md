# CCNAQuest — Project Status Report

**Prepared:** May 2026
**Scope:** Assessment for App Store launch readiness based on SYSTEM_DESIGN.md, UI_AUDIT.md, VISUAL_STYLE_GUIDE.md, and UX_FLOW_AUDIT.md
**Update this doc** at the end of each phase or when major milestones change.

---

## 1. Project Status

### Honest Assessment: 65% Launch-Ready

> ⚠️ **This document has been superseded by `PROGRAMME_BRIEF.md` for current status.** The figures below have been updated to reflect work completed as of 19 May 2026, but PROGRAMME_BRIEF.md is the authoritative source.

The engineering foundation is strong. The architecture is clean, the data model is sound, and the recent sprint resolved every Priority 1 and Priority 2 item from the UX audit. What is left unfinished is not small — it falls into three categories that are each independently blocking: visual assets, content quality, and App Store infrastructure.

---

### What Is Done

**Architecture & Core Engineering — ~98% complete**

- Offline-first Expo app with correct RN + Zustand + AsyncStorage stack
- SM-2 spaced repetition algorithm implemented and integrated
- All 5 core screens built: Home, Module, Section, Quiz, Result
- 6 question types in the discriminated union engine (MCQ, TF, fill, word bank, match, CLI)
- Schema versioning with migration system at v5
- Dev-time content validator with CI entry point
- Content-as-code for all 37 sections (files exist)
- All 10 QA bugs fixed (BUG-001–010) — 19 May 2026

**UI & UX — ~93% complete**

- All 16 token violations resolved — design system is consistent
- 4 shared components extracted (BackButton, SectionDivider, PrimaryButton, HeroPill)
- All 4 mechanic bugs fixed (B1–B4): hearts refill, correct MAX_HEARTS, quiz gate, streak break detection
- All Priority 2 UX gaps closed: 3-screen onboarding, both crash guards, empty section state, fill shake guard
- All Priority 3 polish items done except P4: returning user banner, milestone modal, broken streak banner, locked toast, result screen copy
- All 10 QA report bugs fixed (BUG-001–010)

**Visual Assets — ~52% complete**

- 4 frog PNG states: `idle.png`, `celebrate.png`, `incorrect.png`, `thinking.png`
- 17 SVG icons delivered: `assets/icons/` (6 question-type, 7 status/HUD, 4 module identity)
- App icon composition preview: `docs/visual/icon-preview.html`
- 3 P1 frog generation prompts written (perfect, streak, pointing)

---

### What Is Not Done

**Visual Assets — ~20% complete**
The VISUAL_STYLE_GUIDE.md lists 3 P1 ("referenced by current screens") frog states that do not exist: `streak.png`, `perfect.png`, `pointing.png`. The app icon is a blank placeholder. The splash screen is not designed. The icon set for question types and module identities (12+ SVG files) has not been started. This is not a polish problem — a blank app icon fails App Store review and the missing `perfect.png` leaves the result screen in a known degraded state.

**Content Quality — Unknown**
37 TypeScript section files exist. What is not documented anywhere is whether these files contain sufficient, exam-relevant, pedagogically correct CCNA question content. The validator checks structural integrity (answer keys, field presence) but it does not check factual accuracy, question count adequacy, or whether the content matches the actual CCNA exam syllabus. An app that markets itself as CCNA preparation with wrong or thin content faces immediate 1-star reviews on launch day.

**Unimplemented UX States**
From the UX audit, these remain open:

- H5: All modules complete state (celebrated end state — meaningful for engagement)
- M3: Module mastered state in ModuleScreen hero
- Q1: Quiz "lesson not found" error needs branded treatment (still raw text)
- R1/R5: "First lesson ever" and result streak messaging — noted in UX doc, not implemented
- `match` and `cli` question types: present in the discriminated union but QuizScreen renders a fallback for both — any lesson using these types silently breaks

**Infrastructure — 0% complete**
No crash reporting. No analytics. `AsyncStorage` errors are silently swallowed — data loss is invisible. No production build has been attempted. No TestFlight distribution. No App Store Connect account setup documented. No privacy policy. No App Store metadata (title, description, keywords, screenshots).

---

### Status by Domain

| Domain              | Complete | Notes                                                               |
| ------------------- | -------- | ------------------------------------------------------------------- |
| Core engineering    | 98%      | All 10 QA bugs fixed; `_persist()` error handling still open        |
| UX & edge states    | 93%      | All QA bugs closed; H5, M3, Q1, R5 edge states still open           |
| Visual assets       | 52%      | 17 SVG icons delivered, icon preview done; frog PNGs pending AI gen |
| Content quality     | ~15%     | Files exist; accuracy unverified; SME review in progress            |
| App Store readiness | 0%       | Not started                                                         |
| QA & device testing | 30%      | All 10 static bugs fixed; no physical device testing done yet       |
| Accessibility       | 0%       | Not started                                                         |
| Legal / privacy     | 0%       | Not started — Legal Advisor not yet engaged                         |
| Crash monitoring    | 0%       | Not started                                                         |

---

## 2. Risk Register

### Risk 1 — Content Accuracy Liability ★★★★★

**What it is:** The app positions itself as preparation for a real Cisco certification exam. If the CCNA content contains factual errors — incorrect subnetting answers, wrong protocol behaviours, outdated exam objectives — users who fail their exam will leave public negative reviews and potentially request refunds.
**Likelihood:** High. 37 sections authored by one person without documented SME review is a quality risk by default.
**Impact:** Critical. A single viral "this app taught me wrong" post ends the launch.
**Mitigation:** Before submission, every section must be reviewed by a CCNA-certified subject matter expert against the current Cisco exam blueprint (CCNA 200-301). This is not optional and cannot be done in parallel with coding work.

---

### Risk 2 — App Store Review Rejection ★★★★☆

**What it is:** Apple's review team rejects approximately 40% of first submissions. Common rejection reasons include: missing privacy policy URL, missing or incorrect privacy nutrition labels, placeholder assets (the current blank `assets/icon.png` will trigger rejection), crashes during review, and content that mimics another app's brand without authorisation.
**Likelihood:** High if submitted in current state. Medium after proper preparation.
**Impact:** High — a rejection resets the launch timeline by 1–4 weeks per round trip.
**Mitigation:** App Store specialist must prep the submission. Privacy policy must be live at a URL before first submission attempt. All placeholder assets must be replaced.

---

### Risk 3 — Silent Data Loss in Production ★★★☆☆

**What it is:** `_persist()` calls `AsyncStorage.setItem(...).catch(() => {})` — errors are silently discarded. On low-storage devices or during iOS background-kill scenarios, persistence can fail with no user feedback, no retry logic, and no logging. A user could lose weeks of streak and XP data.
**Likelihood:** Medium — affects a subset of devices in specific conditions.
**Impact:** High user trust damage. Streak loss is the single most emotionally damaging failure in a streak-based app. Duolingo has had multiple PR incidents around this exact scenario.
**Mitigation:** Add Sentry or equivalent crash/error monitoring before launch. Replace the silent catch with a queued retry and, if three retries fail, surface a persistent "Your progress couldn't be saved" banner.

---

### Risk 4 — Missing Question Type Implementations ★★★☆☆

**What it is:** The `match` and `cli` question types are in the TypeScript discriminated union and may exist in content data files. But the QuizScreen renders a fallback `"Question type not supported"` for both. If any of the 37 sections contain lessons that use these types, those questions silently skip or block. The validator checks structural integrity but does not flag unsupported type renderers.
**Likelihood:** Medium — unknown without a content audit.
**Impact:** High — a lesson that hits an unsupported type makes that lesson non-completeable.
**Mitigation:** Audit all 37 section files for any `type: 'match'` or `type: 'cli'` questions before launch, and either implement those renderers or remove those question instances.

---

### Risk 5 — No Real Device QA ★★★☆☆

**What it is:** There is no documented QA process, no device test matrix, and no regression suite. The app has been developed primarily in Expo Go (simulator/web). Real iOS and Android devices have different font scaling, notch layouts, keyboard behaviour, and animation performance.
**Likelihood:** High that there are device-specific issues. Unknown which ones.
**Impact:** Medium-high — crashes or broken layouts on specific devices lead to 1-star reviews.
**Mitigation:** Full QA pass on minimum 3 physical devices (iPhone SE, iPhone 15 Pro, mid-range Android) before TestFlight. Focus on: keyboard interaction in fill inputs, safe area insets on all screen sizes, animation performance on lower-end hardware.

---

## 3. Specialist Roles Needed

### Role 1 — Illustrator / Character Artist

**What they do:** Create the 3 missing P1 frog states (`streak.png`, `perfect.png`, `pointing.png`), the app icon (1024×1024 + Android adaptive), the splash screen, and the question type icon set (6 SVGs). The VISUAL_STYLE_GUIDE.md provides complete briefs, AI generation prompts, and design DNA rules — this is well-prepared for a designer handoff.
**Deliverables:** 3 frog PNGs + 1024px app icon + adaptive icon + splash image + 6 question type SVGs + 4 module identity icons.
**When:** Week 1–2. Must begin immediately as icon production blocks App Store submission. P1 frog states unlock result screen and HomeScreen polish.

---

### Role 2 — CCNA Subject Matter Expert (Content Reviewer)

**What they do:** Work through all 37 section files, verify every question against the CCNA 200-301 exam blueprint, flag incorrect answers, flag outdated content (e.g. deprecated protocols), and assess question density (a section with 3 MCQs is not adequate preparation for that topic).
**Deliverables:** Content review spreadsheet mapping each section to: ✅ accurate / ⚠️ needs revision / ❌ incorrect. Minimum question count recommendations per section.
**When:** Week 2–5. This is the longest pole in the tent after visual assets. Content fixes will require developer time to implement, so it must start early.

---

### Role 3 — QA Tester

**What they do:** Execute a structured test plan across the full user journey on physical iOS and Android devices. Test every question type, every edge state documented in the UX audit, every error guard, the onboarding flow, the streak and hearts mechanics, AsyncStorage persistence across app kills, and the review session flow. Document bugs in a prioritised format.
**Deliverables:** Test plan document, bug report with severity ratings, sign-off certificate for submission.
**When:** Week 6–7, after content fixes are in and visual assets are integrated.

---

### Role 4 — App Store Specialist

**What they do:** Set up App Store Connect, configure the app entry, write the store listing (title, subtitle, description, keywords for ASO), produce the 5–10 required App Store screenshots at all required sizes, configure privacy nutrition labels, submit TestFlight builds, manage the review submission process, and handle any rejection responses.
**Deliverables:** Live App Store listing ready for review, TestFlight beta distribution, submission documentation.
**When:** Week 8–9. Can begin on listing copy and screenshots earlier; submission only after QA sign-off.

---

### Role 5 — Legal / Privacy Advisor

**What they do:** Write a GDPR-compliant privacy policy (required even for offline apps if distributed in the EU — the app collects nothing but the policy must say so explicitly). Advise on App Store privacy nutrition labels. Review any use of "CCNA" branding — Cisco is protective of this trademark and "CCNA Quest" must not imply official Cisco endorsement. Review terms of service.
**Deliverables:** Privacy policy (hosted at a URL), terms of service, trademark usage review, App Store privacy label recommendations.
**When:** Week 3–4. Privacy policy URL is required for App Store submission — it must be live before the first submission attempt.

---

### Role 6 — Accessibility Consultant

**What they do:** Audit the app against WCAG 2.1 AA and Apple Human Interface Guidelines for accessibility. Key areas: VoiceOver labelling on all interactive elements (the path nodes, quiz choices, heart icons), Dynamic Type support (the app uses hardcoded `fontSize` values throughout — all text will break at large accessibility sizes), minimum 44×44pt touch targets, and colour contrast ratios on the dark theme.
**Deliverables:** Accessibility audit report, ordered fix list.
**When:** Week 6–7, in parallel with QA. Can be done before or after content review.
**Note:** Apple requires apps to meet basic accessibility standards for App Store approval. VoiceOver support is checked during review.

---

### Role 7 — Performance Engineer _(optional but recommended)_

**What they do:** Profile the JavaScript bundle size (37 sections compiled into the bundle will be large), memory usage during long quiz sessions, animation frame rate on lower-end Android devices, and cold start time. The `lottie-react-native` dependency is a native module that has historically caused build issues.
**Deliverables:** Bundle size report, frame rate profile, list of optimisation recommendations.
**When:** Week 7–8, after QA.

---

## 4. Recommended Roadmap

### Phase 1 — Asset Sprint `Weeks 1–2`

**Goal:** Unblock every downstream dependency. The app cannot launch without an app icon; it cannot look finished without the missing frog states.

**Tasks:**

- Commission illustrator immediately (brief is ready in VISUAL_STYLE_GUIDE.md)
- Audit all 37 data files for `match`/`cli` question types — remove or implement them
- Implement `match` renderer in QuizScreen OR strip all `match`/`cli` questions from data
- Replace `assets/icon.png` placeholder, update `app.json` adaptive icon background colour
- Fix `_persist()` error handling — add logging at minimum

**Roles:** Illustrator (primary), developer
**Exit criteria:** App icon exists. All 3 P1 frog states exist. No unsupported question types remain in content.

---

### Phase 2 — Content Review `Weeks 3–5`

**Goal:** Every section has verified, accurate, exam-relevant content. This phase is the highest-risk and slowest by nature.

**Tasks:**

- CCNA SME works through all 37 sections in priority order (Fundamentals first, Modern Networking last)
- Developer implements content corrections in parallel as review batches are delivered
- Legal advisor produces privacy policy and trademark review — host policy at a live URL
- Implement remaining open UX states: H5 (all complete), M3 (module mastered), Q1 branded quiz error state, R5 (first lesson badge)
- Implement push notification for daily streak reminder _(retention mechanic — defer if timeline is tight)_

**Roles:** CCNA SME (primary), developer (implementing fixes), legal advisor
**Exit criteria:** SME has signed off on all 37 sections. Privacy policy is live.

---

### Phase 3 — QA & Accessibility `Weeks 6–7`

**Goal:** Known-good on three physical devices. Accessibility baseline met for App Store approval.

**Tasks:**

- QA tester executes full test plan: all question types, onboarding, edge states, hearts/streak/XP mechanics, AsyncStorage persistence across app kill
- Accessibility consultant audits VoiceOver labelling and minimum touch targets
- Developer fixes all Critical and High severity bugs from QA report
- Produce App Store screenshots on correct device frames
- Submit first TestFlight build to internal testers

**Roles:** QA tester, accessibility consultant, developer
**Exit criteria:** No Critical or High severity bugs open. VoiceOver works on all interactive elements. Internal TestFlight distributed.

---

### Phase 4 — App Store Preparation `Weeks 8–9`

**Goal:** Submission-ready package. Everything the review team will check is in place.

**Tasks:**

- App Store specialist completes listing: title, description, keywords, screenshots at all required sizes
- Configure all App Store Connect settings: categories (Education), age rating, privacy nutrition labels
- Implement analytics — at minimum crash reporting via Sentry
- Performance engineer profiles bundle size and cold start; implement any critical optimisations
- Submit to TestFlight External testing (requires Apple review — allow 2–3 days)
- Collect external beta feedback (10–20 testers, ideally including CCNA candidates)

**Roles:** App Store specialist, performance engineer, developer
**Exit criteria:** External TestFlight approved. Listing copy and screenshots complete. Privacy labels configured.

---

### Phase 5 — Soft Launch `Weeks 10–11`

**Goal:** App Store submission submitted and approved. Controlled release.

**Tasks:**

- Submit for App Store review (iOS first, then Google Play)
- Prepare for rejection response — have the App Store specialist on standby
- Monitor crash reports in Sentry during review period
- Submit phased release (10% rollout) to catch production issues before full rollout

**Roles:** App Store specialist (managing submissions), developer (on call for emergency fixes)
**Exit criteria:** App live in App Store at phased rollout.

---

### Phase 6 — Post-Launch Stabilisation `Weeks 12+`

**Goal:** Respond to production issues before they accumulate into review damage.

**Tasks:**

- Monitor 1-star reviews daily for the first two weeks — every content error and crash will surface here
- Patch any content issues or bugs within 48 hours
- Evaluate retention metrics — streak continuation rate is the key health signal for this app type
- Commission P2 frog states (`reading.png`, `levelup.png`) now that P1 is done
- Plan V1.1 scope: push notifications, possible web/PWA variant, additional content sections

**Roles:** Developer, App Store specialist (monitoring reviews)

---

### Timeline Summary

| Phase                  | Weeks | Blocking                                  | Who                     |
| ---------------------- | ----- | ----------------------------------------- | ----------------------- |
| 1 — Asset Sprint       | 1–2   | App icon, frog states, match/cli audit    | Illustrator + Dev       |
| 2 — Content Review     | 3–5   | CCNA accuracy + privacy policy            | SME + Legal + Dev       |
| 3 — QA & Accessibility | 6–7   | Device coverage + App Store accessibility | QA + A11y + Dev         |
| 4 — App Store Prep     | 8–9   | Listing, screenshots, analytics           | Specialist + Perf + Dev |
| 5 — Soft Launch        | 10–11 | Submission + approval                     | Specialist + Dev        |
| 6 — Stabilisation      | 12+   | Ongoing                                   | Dev + Specialist        |

**Realistic total: 11–13 weeks from today to live in App Store**, assuming no content review blockers and no major App Store rejections.

The most likely cause of a longer timeline: content review revealing widespread factual errors in the CCNA sections that require substantial rewrites. Budget for this.

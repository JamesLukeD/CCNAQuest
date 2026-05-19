# CCNAQuest — Product Director Briefing

**Date:** 19 May 2026
**Role:** Incoming Product Director
**Source documents:** SYSTEM_DESIGN.md, UI_CONSISTENCY_AUDIT.md, VISUAL_STYLE_GUIDE.md, UX_FLOW_AUDIT.md, PROJECT_STATUS.md, QA_AUDIT.md, CHIEF_OF_STAFF.md (PROGRAMME_BRIEF.md)

---

## 1. EXECUTIVE SUMMARY

**The honest answer: 70% done. Six weeks from submission if you start the right things today.**

Here is what has actually been built and works: a complete offline flashcard and quiz app for Android. The core loop — study a lesson, take a quiz, earn XP, build a streak, review due cards via spaced repetition — is fully functional and has been tested on a real Android build. The data model is clean, the architecture is sound, and the codebase has been through a proper static analysis pass that found and fixed 11 bugs, three of which were severe enough that the app would have been unlaunchable without the fixes. The engineering is in better shape than most indie apps at this stage.

What hasn't moved at all is everything outside the code. That's the problem.

There are three things that will physically block you from submitting to the App Store. Not slow you down — actually block. They are:

**1. App icon.** The current one is a blank placeholder. Apple's automated system rejects submissions with placeholder icons before a human ever looks. You cannot submit without a real 1024×1024 icon. An illustrator brief is written and ready to go — but no illustrator has been commissioned.

**2. Privacy policy at a live URL.** Apple requires this for every app, including apps that collect zero user data. This one collects nothing — so the policy is short and easy to write. But it must be hosted at a real URL that is reachable on the day you submit. A legal brief is written and ready — but no one has been engaged.

**3. Content accuracy.** This is the only item that can't be patched after launch. The app has 37 lessons covering the Cisco CCNA exam. A subject matter expert is reviewing Module 1 but hasn't finished. Modules 2, 3, and 4 (27 lessons) have not been reviewed by anyone. If the app ships with wrong subnetting answers or incorrect routing protocol behaviour, students who fail their exam will say so publicly. That review needs to be complete before you submit.

There are also three secondary blockers that don't physically prevent submission but will hurt you if ignored: the app icon will cause rejection even if you fix it the day before (it affects TestFlight too); accessibility is at zero percent and Apple has been increasingly checking VoiceOver during review; and iOS hasn't been tested at all because you don't yet have an Apple Developer account ($99/year).

**The path to submission:**

- Week 1–2: Commission illustrator (icon + 3 frog images), draft privacy policy, start SME content review of remaining 27 lessons
- Week 3–4: Icon delivered, privacy policy live, finish content review, set up App Store Connect
- Week 5: TestFlight internal test, accessibility minimum pass, App Store screenshots
- Week 6: Submit

That is realistic if the parallel workstreams start now. If the content review stays at Module 1 out of 4, launch slips by months — not weeks.

---

## 2. DECISION LOG

### Decision 1 — What to do about the "CCNA" trademark in the app name

**What it is:** "CCNA" is a registered trademark owned by Cisco Systems. The app is named CCNAQuest and markets itself as a preparation tool for the CCNA exam. This is common in the education app space but it is not automatically safe.

**Options:**

- A) Keep the name as-is, add a standard disclaimer ("Not affiliated with or endorsed by Cisco"), proceed
- B) Rename to something generic ("NetQuest", "NetworkPath") that avoids the trademark entirely
- C) Get a legal opinion first before deciding

**Recommendation: C, then A.** Legal review is cheap relative to an App Store rejection or a cease and desist. The ROLE_LEGAL.md brief is already written — engage a lawyer or use a trademark service ($200–400) to get a written opinion. The expected outcome is that nominative fair use applies and Option A is fine with a disclaimer. But confirm it rather than assume.

**If deferred:** You submit with a name that may need to change post-launch. Changing the app name after submission requires a new submission and resets your review queue. Worse, if Cisco flags it post-launch, you may be forced to rename when you already have reviews and organic ranking.

---

### Decision 2 — Whether to launch iOS at all in v1

**What it is:** iOS requires an Apple Developer account ($99/year), a separate EAS build profile, TestFlight distribution, App Store Connect setup, and iOS-specific QA. None of this has been started. Android is fully working.

**Options:**

- A) Android-first launch — ship to Google Play now, come back to iOS in 4–8 weeks
- B) iOS and Android simultaneously — delay launch to get both done
- C) iOS-only (the original plan) — deprioritise Android despite it working first

**Recommendation: A.** You have a working Android APK today. Google Play submission is simpler, faster, and cheaper (one-time $25 vs $99/year). It gets you real user feedback before you invest the extra weeks iOS requires. Use the Android launch to validate the content, fix edge cases, and collect screenshots for the iOS submission. Come back to iOS submission 6–8 weeks later with real reviews and a cleaner build.

**If deferred (i.e., if you insist on iOS first):** You wait 6+ weeks longer, spend $99, and take on additional QA complexity without any real-world signal that the content is good.

---

### Decision 3 — How to handle Sentry source maps

**What it is:** Sentry is installed and wired up but source map upload is disabled because the Sentry org/project credentials haven't been configured in EAS secrets. Right now, if the app crashes in production, you'll get a crash report with an obfuscated stack trace — meaning you'll know it crashed but not where or why.

**Options:**

- A) Configure Sentry properly now (create sentry.io account, add org/project/authToken as EAS secrets, remove the disable flag) — takes ~1 hour
- B) Leave it disabled for v1, enable before first real user hits the app
- C) Remove Sentry entirely

**Recommendation: A, do it this week.** It costs one hour and means every crash from your first TestFlight tester is actionable. Option B is acceptable only if the Android launch is weeks away. Option C is wrong — you've already done the integration work.

**If deferred:** You launch blind. Your first production crashes will show you nothing useful. On a content-heavy app like this, the most likely early crashes are data parsing edge cases — which need real stack traces to diagnose.

---

### Decision 4 — Whether to implement the `match` and `cli` question types before launch

**What it is:** Two question types exist in the data model (`match` and `cli`) but the quiz screen renders a fallback for both — effectively making them dead. Any lesson in the 37 sections that uses these types will silently break. Whether any of the current 37 sections actually use them is unknown.

**Options:**

- A) Audit all 37 section files now to see if any use these types. If yes, implement the renderers. If no, remove the types from the discriminated union to prevent future accidents.
- B) Remove both types entirely from v1, implement in v2 with user accounts
- C) Leave as-is and hope no content files use them

**Recommendation: A.** This is a 2-hour audit task. Run a grep across all data files for `type: 'match'` and `type: 'cli'`. If zero results, delete the types from the union and close the risk. If there are results, you have a decision to make — implement the renderers or convert the questions to MCQ. Option C is not acceptable because the content review (SME) may add new questions using these types without realising they don't render.

**If deferred:** The SME adds a `match` question to a section. It appears in the quiz. The user sees "Question type not supported." They rate 1 star.

---

### Decision 5 — Monetisation model for v1

**What it is:** The app is currently free with no in-app purchases. The PROGRAMME_BRIEF notes that v2 will add user accounts with GDPR implications. But the question of how to actually make money has never been decided.

**Options:**

- A) Free with no monetisation in v1 — grow users, monetise v2 with accounts/sync/premium content
- B) One-time purchase ($2.99–$4.99) — simple, no subscription complexity, but reduces download volume
- C) Freemium — first module free, remaining 3 modules unlocked by IAP ($4.99)
- D) Free forever, revenue from a future "CCNA Bootcamp" course product

**Recommendation: C for iOS, A for Android launch.** Freemium with the first module free gives potential users a no-risk entry point and a natural conversion point. The app has four modules — this maps perfectly to a freemium gate at module 2. For the initial Android launch, go free to maximise early installs and reviews. Before iOS launch, implement the IAP gate. This gives you 6–8 weeks to evaluate whether free users convert to reviews/word-of-mouth before committing to a pricing model.

**If deferred:** You launch free, gain users, then try to implement IAP in an update. Users who installed the free version feel deceived by a paywall appearing in an update. Set expectations from day one.

---

## 3. ROLE RECOMMENDATION

### Engage Next: Legal Advisor

**Why:** It is the fastest unblock. The privacy policy brief is already written. The document is short (this app collects no data). A competent advisor can draft and publish it in two to three days. The trademark question needs an answer before you can confirm the app name — and you cannot finalise App Store Connect metadata, screenshots, or keyword strategy without a confirmed name. Every other role depends on legal being done.

**What they produce:**

1. Privacy policy in plain English, hosted at a live URL
2. Written recommendation on "CCNA" trademark use, with recommended disclaimer text if required

**Exact brief:** Hand them `docs/roles/ROLE_LEGAL.md` — it is fully written. No additional context needed. Expected engagement duration: 3–5 days. Cost: $200–500 (specialist freelancer or trademark service), or free if you write the privacy policy yourself using a generator (iubenda.com, termly.io) and accept the trademark risk.

---

### All Remaining Roles — Ranked Order

| #   | Role                               | Why This Order                                                                                                                                                                           | Start When                   |
| --- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 1   | **Legal Advisor**                  | Unblocks name confirmation, privacy URL, App Store setup. Fastest resolution. Brief ready today.                                                                                         | Today                        |
| 2   | **Illustrator / Character Artist** | App icon is a hard submission gate. Brief is ready. Start in parallel with legal — don't wait.                                                                                           | Today (parallel)             |
| 3   | **CCNA SME**                       | Already in progress on Module 1. Modules 2–4 not started. This is the longest-duration workstream and the one risk that can't be undone after launch. Needs to finish before submission. | Already started — accelerate |
| 4   | **App Store Specialist**           | Cannot begin until icon + privacy URL + Apple Developer account are all in place. Brief is written.                                                                                      | Week 3–4                     |
| 5   | **Accessibility Consultant**       | Apple checks VoiceOver during review. Minimum viable pass needed. Can be done in a focused 1–2 day sprint after the app is feature-stable.                                               | Week 4                       |
| 6   | **Performance Engineer**           | Bundle size, cold-start time, Lottie native verification. Real issue but not a submission gate. Defer until post-TestFlight unless the build starts failing.                             | Post-TestFlight              |

---

> **Bottom line for the developer:** Stop writing code. The code is done. Start three parallel tracks today — commission the illustrator, engage a legal advisor, and push the SME to finish Modules 2–4. Those three things are the entire critical path. Nothing else matters until they're done.

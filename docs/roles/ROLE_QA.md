# CCNAQuest — QA Engineer Brief

**Date:** 19 May 2026
**Role:** QA Engineer
**Status:** Not yet needed — engage when production build is stable and SME review ≥80% complete

---

## Engagement Trigger

Do not begin physical QA until:

1. 🔴 First production build is available (EAS build via TestFlight)
2. 🔴 SME content review ≥80% complete (30 of 37 sections signed off)
3. ✅ All 11 static analysis bugs are closed (BUG-001–011 — confirmed done)
4. ✅ All UX edge states are implemented

You are being briefed now so you can plan your test approach and equipment in advance.

---

## Context: What Has Already Been Done

A senior QA engineer completed a **full static code analysis** of all source files in May 2026. This produced:

- 11 bugs found and fixed (BUG-001–011, covering 3 Critical, 4 High, 4 Medium)
- A 14-test-case device test plan (TC-01–TC-14)
- A 20-item regression checklist

**No physical device testing has been done yet.** Static analysis can confirm logic but cannot verify rendering on real hardware, device-specific safe area behaviour, keyboard interactions, AsyncStorage on actual iOS/Android, or native animation performance.

Full bug history is in `docs/qa/QA_REPORT.md`.

---

## Test Devices Required

| Device                                                            | Purpose                                                                  | Priority          |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------- |
| iPhone SE 3rd gen (iOS 17+)                                       | Small screen (375×667pt), oldest supported iOS                           | P1 — must have    |
| iPhone 15 Pro Max (iOS 17+)                                       | Large screen, Dynamic Island, safe area                                  | P1 — must have    |
| Samsung Galaxy A54 (Android 14)                                   | Mid-range Android, most common demographic                               | P1 — must have    |
| iPad (any 12.9" 3rd gen+, iPadOS 17)                              | Tablet layout (app does not support tablet — confirm graceful behaviour) | P2 — nice to have |
| Android low-end device (Snapdragon 460 or equivalent, Android 11) | BUG-010 class issues, cold start performance                             | P2 — nice to have |

---

## The 14 Test Cases

All defined in `docs/qa/QA_REPORT.md` Part 2. Brief summary:

| ID    | Area                            | Key risk                                                                |
| ----- | ------------------------------- | ----------------------------------------------------------------------- |
| TC-01 | First launch & onboarding       | Onboarding skips correctly on relaunch; no crash on BUG-010 class issue |
| TC-02 | HomeScreen layout & HUD         | HUD fits on SE; Dynamic Island safe area on 15 Pro Max                  |
| TC-03 | MCQ question type               | Correct/wrong states, progress bar, heart derement                      |
| TC-04 | True/False question type        | State locking after answer                                              |
| TC-05 | Fill-in-the-blank               | Empty submit shake, keyboard-covers-input, case insensitive match       |
| TC-06 | Word bank                       | Chip placement, auto-evaluate, retry flow                               |
| TC-07 | Teach card                      | Immediate continue, no heart lost, no SM-2 update                       |
| TC-08 | Quiz completion & result screen | All result states (perfect, good, fizzled, review, teach-only)          |
| TC-09 | Hearts, XP & streak mechanics   | 0 hearts gate, daily refill, streak break/milestone                     |
| TC-10 | SM-2 spaced repetition & review | Review node appears, due count decrements, interval scheduling          |
| TC-11 | AsyncStorage persistence        | Data survives force-kill and cold launch                                |
| TC-12 | Section screen edge cases       | Locked nodes, toast on locked tap, mastered section state               |
| TC-13 | Error & edge states             | Q1 branded error, H5 grimoire banner, M3 mastered banner                |
| TC-14 | Performance                     | Cold start <3s, quiz scroll jank, Lottie animation smoothness           |

---

## Regression Checklist (20 items)

Run this after every significant code change. From `docs/qa/QA_REPORT.md` Part 3:

- [ ] Onboarding does not re-show for returning users
- [ ] All 4 question types render and evaluate correctly
- [ ] Teach cards do not decrement hearts or update SM-2
- [ ] Wrong answer decrements hearts by exactly 1, clamps at 0
- [ ] 0 hearts blocks lesson launch (Alert shown, quiz does not start)
- [ ] 0 hearts blocks review launch (same guard)
- [ ] Correct answer on first try → SM-2 quality 4
- [ ] Correct answer after wrong → SM-2 quality 3
- [ ] Wrong answer → SM-2 quality 1
- [ ] Review session updates `lastPlayed` and streak
- [ ] `completeLesson()` returns correct `xpEarned` value
- [ ] Result screen XP display matches store XP increment
- [ ] Streak banner shows on first lesson of a new day
- [ ] Streak breaks correctly after 2+ day absence
- [ ] Milestone modal shows at 7 days and does not repeat
- [ ] Data persists after force-kill (AsyncStorage write confirmed)
- [ ] No TypeScript errors (`npx tsc --noEmit` returns 0)
- [ ] No obvious layout overflow on iPhone SE
- [ ] Dynamic Island safe area respected on iPhone 15 Pro Max
- [ ] Sentry DSN is set (not placeholder) in production build

---

## Known Remaining Issues (Post-Static Analysis)

These were identified but not yet verified on device:

| Issue                            | Location                           | Note                                                                 |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| `perfect.png` not yet generated  | `result.tsx` R1 state              | `celebrate.png` used as fallback — visual only, no functional impact |
| `pointing.png` not yet generated | Onboarding screens 2 & 3           | Placeholder frog used — visual only                                  |
| `streak.png` not yet generated   | H4 milestone modal                 | Placeholder frog — visual only                                       |
| Lottie native build unverified   | `assets/animations/celebrate.json` | Needs verification in EAS build — not Expo Go                        |
| Cold start time unmeasured       | App-wide                           | Benchmark on SE 3rd gen; target <3s to first interactive frame       |

---

## Sign-off Criteria

The app is ready for App Store submission when:

- [ ] All 14 TC pass on all 3 P1 devices
- [ ] Regression checklist passes with 0 failures
- [ ] Sentry DSN is live (confirmed by triggering a test exception in staging)
- [ ] No crashes in a 30-minute continuous use session on each P1 device
- [ ] SME content review ≥80% complete and Batch 1+2 corrections applied

Provide a written sign-off document citing test date, devices used, tester name, and pass/fail per TC.

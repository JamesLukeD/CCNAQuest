# CCNAQuest — UX Flow Audit

**Date:** May 2026  
**Scope:** Onboarding, edge states, returning user experience  
**Based on:** Direct review of all 5 screens, `lib/store.ts`, and `lib/types.ts`  
**Update this doc** when any new flow, screen state, or mechanic is implemented.

---

> **Note to developer:** This document includes several **⚠️ Mechanic Bug** callouts where the current `lib/store.ts` implementation contradicts the intended UX. These are not design suggestions — they are live defects in the store logic that must be fixed before the UX designs below will work correctly.

---

## Part 1 — Onboarding Flow

### Design Intent

- Get the user into their **first lesson within 60 seconds** from first launch
- Establish the three core mechanics (hearts, XP, streak) with minimal text
- Set the wizard/magic academy tone immediately
- First launch is detected by `lastPlayed === null` in the store

### Trigger

```
_layout.tsx mounts → loadState() → state.lastPlayed === null → push /onboarding
```

If `lastPlayed` is not null, skip onboarding entirely and go to HomeScreen as normal.

---

### Screen 1 — Welcome

| Field          | Value                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Route**      | `/onboarding`                                                                                                                 |
| **Frog state** | `idle` (wand raised, gentle hover bob animation)                                                                              |
| **Headline**   | "Welcome, Apprentice."                                                                                                        |
| **Body**       | "The arcane arts of networking await you. Master the CCNA syllabus lesson by lesson — and become a certified Network Wizard." |
| **CTA label**  | "Begin training →"                                                                                                            |
| **Routes to**  | `/onboarding/mechanics`                                                                                                       |
| **Background** | Full-screen dark gradient matching `BG` — frog centred at 55% screen height, headline above, body + CTA below                 |
| **Skip?**      | No skip on screen 1 — the user should see the mascot at least once                                                            |

---

### Screen 2 — The Three Rules

| Field          | Value                                                                     |
| -------------- | ------------------------------------------------------------------------- |
| **Route**      | `/onboarding/mechanics`                                                   |
| **Frog state** | `pointing` (flipper extended toward the rule list)                        |
| **Headline**   | "Every wizard lives by three rules."                                      |
| **Body**       | Three stacked rows with icon, title, and one-line description (see below) |
| **CTA label**  | "I'm ready. Cast the first spell →"                                       |
| **Routes to**  | `/onboarding/path`                                                        |

**Rule rows:**

| Icon | Title      | Description                                                                           |
| ---- | ---------- | ------------------------------------------------------------------------------------- |
| ❤️   | **Hearts** | You have 5 lives. Lose one for every wrong answer. They refill every day at midnight. |
| ⚡   | **XP**     | Earn XP for every lesson you complete. Perfect lessons earn a bonus.                  |
| 🔥   | **Streak** | Study every day to build your streak. Miss a day and it resets to zero.               |

---

### Screen 3 — First Quest

| Field                    | Value                                                                                                                                                                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Route**                | `/onboarding/path`                                                                                                                                                                                                                                                                |
| **Frog state**           | `pointing` (pointing downward/forward — toward the CTA)                                                                                                                                                                                                                           |
| **Headline**             | "Your first incantation awaits."                                                                                                                                                                                                                                                  |
| **Body**                 | "The path begins with the fundamentals. This is where every network engineer's journey starts. Complete this lesson to cast your first spell."                                                                                                                                    |
| **CTA label**            | "Start Lesson 1 →"                                                                                                                                                                                                                                                                |
| **Routes to**            | First lesson of the first section of Module 1, i.e. `/quiz/[sectionId]:[firstLessonId]` — resolve this programmatically at runtime from `ALL_MODULES[0]` → first `sectionId` → `ALL_SECTIONS.find(s => s.id === sectionId).lessons[0]`                                            |
| **Mark onboarding done** | Set `lastPlayed` to a sentinel value (or use a dedicated `onboardingComplete: boolean` flag in the store) so onboarding never re-shows. The simplest solution: call a `completeOnboarding()` store action that sets `lastPlayed` to `new Date().toDateString()` before navigating |

---

### Onboarding Flow Diagram

```
App Launch
    │
    ▼
loadState()
    │
    ├─ lastPlayed === null ──────► /onboarding
    │                                  │ CTA tap
    │                                  ▼
    │                          /onboarding/mechanics
    │                                  │ CTA tap
    │                                  ▼
    │                          /onboarding/path
    │                                  │ CTA tap
    │                         completeOnboarding()
    │                                  │
    │                                  ▼
    └─ lastPlayed !== null ─────► HomeScreen (/)
                                       │
                                  First lesson
                                  QuizScreen
```

---

## Part 2 — Edge States Checklist

### HomeScreen (`app/index.tsx`)

| #   | State                                   | Trigger                                                       | What the user sees                                                                                                                                                                                    | Frog state                                | Copy                                                                            |
| --- | --------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------- |
| H1  | **Zero progress**                       | `completed` is empty, first launch after onboarding           | All module cards shown with 0% progress bars. No changes to normal layout — this is the intended first state. No empty state needed.                                                                  | _(frog not shown on HomeScreen)_          | Normal card labels                                                              |
| H2  | **Hearts at 0**                         | `hearts === 0`                                                | Heart icons all empty (outlines). A banner or pill beneath the HUD reads the copy below. Module cards are still tappable — but see **⚠️ Mechanic Bug #3**                                             | _(frog not shown)_                        | "Your hearts are spent. They refill at midnight — or rest and return tomorrow." |
| H3  | **Streak broken (opening after a gap)** | `lastPlayed` is 2+ days ago, detected on app open             | A dismissable banner or toast at the top of HomeScreen. See also **⚠️ Mechanic Bug #4**                                                                                                               | _(frog not shown — handle via toast)_     | "Your streak ended. A new one starts today."                                    |
| H4  | **High streak milestone**               | `streak` reaches 7, 14, 30, 60                                | Show a toast/modal on first open after milestone. Store a `lastStreakMilestoneCelebrated` value to prevent repeat.                                                                                    | `streak.png`                              | "7-day streak. The arcane flame burns bright."                                  |
| H5  | **All modules complete**                | All lessons in all sections in all modules are in `completed` | ✅ **Implemented 19 May 2026.** Grimoire banner above module list; SectionDivider label changes to `YOUR COMPLETED PATH`.                                                                             | _(consider a special frog overlay modal)_ | "Every incantation mastered. You are ready for the CCNA."                       |
| H6  | **XP bar overflow**                     | `xp > MAX_XP (500)`                                           | XP bar is full and stays full. The number continues to increment in the display. No truncation. Currently `MAX_XP = 500` is a display-only cap — this is fine but the bar must not show > 100% width. | —                                         | —                                                                               |
| H7  | **No sections loaded**                  | `ALL_SECTIONS` fails to import (build-time issue only)        | Module cards show 0 lessons, 0% progress, locked state on all. This is a development/build defect, not a runtime state.                                                                               | —                                         | Handled by validator in dev mode                                                |

---

### ModuleScreen (`app/module/[id].tsx`)

| #   | State                      | Trigger                                                                            | What the user sees                                                                                                                                                                                             | Frog state                                | Copy                                                                   |
| --- | -------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------- |
| M1  | **Module not found**       | Invalid `id` param in route                                                        | Currently: unhandled — `mod` will be `undefined` and the screen will crash. Needs a guard.                                                                                                                     | `incorrect.png`                           | "This tome doesn't exist in our library. Let's go back." + Back button |
| M2  | **All sections locked**    | `unlockAfter` gates all sections except the first                                  | First section is always unlocked (it has no `unlockAfter`). Subsequent sections show lock icon and greyed state. This is normal — no special empty state needed.                                               | —                                         | Section card shows "🔒" icon with greyed title                         |
| M3  | **All sections mastered**  | Every section's lessons all in `completed` (`done: true` — `perfect` not required) | ✅ **Implemented 19 May 2026.** Module hero shows mastered banner after `HeroProgressBar`, coloured with the module's accent colour. (`perfect.png` used as fallback to `celebrate.png` until asset generated) | `perfect.png` (fallback: `celebrate.png`) | "Module mastered. All incantations bound."                             |
| M4  | **Section with 0 lessons** | A section exists in the data with an empty `lessons: []` array                     | Topic card subtitle reads "Coming soon" (already handled in code). Card is non-interactive (no progress bar, no percentage).                                                                                   | —                                         | "Coming soon" (already in code)                                        |
| M5  | **High due count**         | `getDueCount()` returns a large number (e.g. > 20 items due)                       | Due count badges on topic cards already show the number. No additional state needed — but consider capping the display at "20+" to prevent layout overflow.                                                    | —                                         | `N due` → cap display at `20+` if N > 20                               |
| M6  | **Due count = 0**          | No SM-2 items are currently due                                                    | Pill badges simply don't appear (already handled by conditional render). Normal state.                                                                                                                         | —                                         | —                                                                      |

---

### SectionScreen (`app/section/[id].tsx`)

| #   | State                                        | Trigger                                  | What the user sees                                                                                                                                                                      | Frog state                                | Copy                                                                                                                     |
| --- | -------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| S1  | **Section not found**                        | Invalid `id` param                       | Currently: unhandled — `sec` will be `undefined`, screen will crash. Needs a guard.                                                                                                     | `incorrect.png`                           | "This scroll seems to be missing. Let's head back." + Back button                                                        |
| S2  | **0 lessons in section**                     | `sec.lessons.length === 0`               | The path canvas is empty — just the hero and no nodes. Currently renders a blank canvas. Needs an empty state.                                                                          | `reading.png`                             | "This chapter is being written. Check back soon." + Back button                                                          |
| S3  | **All lessons complete**                     | Every lesson in `completed`              | All nodes are green. Frog sits beside the last node (already positioned). The callout label near the active node is gone. Consider adding a "Section Complete" banner in the hero area. | `celebrate.png` (small, in hero)          | "Chapter mastered. Every spell committed to memory."                                                                     |
| S4  | **Hearts at 0**                              | `hearts === 0`                           | Node buttons are still pressable (see **⚠️ Mechanic Bug #3**). User can still launch a quiz. UX should gate this.                                                                       | —                                         | Tapping a locked node while at 0 hearts: "Your hearts are spent. Rest and return tomorrow, apprentice." (modal or toast) |
| S5  | **Review available (due count > 0)**         | `getDueCount(sec.id)` returns > 0        | The `🔁 N due` pill already shows in the hero. The review node appears at the end of the path (this is the current implementation). Normal state.                                       | —                                         | Already handled                                                                                                          |
| S6  | **First lesson just unlocked (active node)** | First lesson, unlocked, not yet complete | Pulsing ring animation and frog beside the node already implemented. The callout label shows `▶ BEGIN`.                                                                                 | `idle.png` (beside node, already in code) | "▶ BEGIN"                                                                                                                |
| S7  | **Lesson locked mid-path**                   | `unlockAfter` gate active                | Node shows lock icon, grey colour, disabled press. Already implemented.                                                                                                                 | —                                         | Tapping a locked node: "Complete the previous lesson to unlock this one." (tooltip or brief toast)                       |

---

### QuizScreen (`app/quiz/[lessonId].tsx`)

| #   | State                                   | Trigger                                                              | What the user sees                                                                                                                                                                                 | Frog state                            | Copy                                                                                                                   |
| --- | --------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Q1  | **Lesson not found**                    | Invalid `lessonId` param or split fails                              | ✅ **Implemented 19 May 2026.** `incorrect.png` frog (160×160), "This incantation could not be found.", MUTED subtitle, `PrimaryButton ← Back`.                                                    | `incorrect.png`                       | "This incantation could not be found. Let’s head back." + Back button                                                  |
| Q2  | **Hearts at 0 on quiz start**           | `hearts === 0` when the user navigates to quiz                       | Currently: **unhandled** — quiz launches normally with 0 hearts. The `loseHeart()` call fires but clamps at 0. UX should block quiz launch or show a pre-quiz warning.                             | `incorrect.png`                       | Pre-quiz modal: "You have no hearts left. Rest until midnight to refill, or come back tomorrow." — CTA: "Back to path" |
| Q3  | **All questions correct (perfect run)** | `wrongCount === 0` when last question completes                      | ResultScreen receives `streakUp` and `wrong: "0"`. ResultScreen already has confetti. No quiz-level change needed — handled in Result.                                                             | —                                     | —                                                                                                                      |
| Q4  | **All questions wrong**                 | Every question answered incorrectly (edge: possible with re-queuing) | Each wrong answer re-queues the question — SM-2 records quality 1. User will cycle through all questions multiple times. Hearts will drain. At 0 hearts, quiz still continues (see **⚠️ Bug #3**). | `incorrect.png` overlay on each wrong | Existing incorrect overlay — no changes needed                                                                         |
| Q5  | **Teach card (no answer required)**     | `q.type === 'teach'`                                                 | Displays content card, Continue button enabled immediately. Already implemented.                                                                                                                   | `reading.png` (small, decorative)     | No copy change — but frog state as accent adds polish                                                                  |
| Q6  | **Word bank — all chips used**          | User places all bank chips into answer                               | The answer row is full. The bank area is empty. Continue button activates. Already handled.                                                                                                        | —                                     | —                                                                                                                      |
| Q7  | **Fill input — empty submit attempt**   | User taps Check with empty `fillInput`                               | Currently: no guard — submitting empty string is evaluated as wrong. Needs a guard.                                                                                                                | —                                     | Shake the input field. No toast needed — the visual feedback is enough.                                                |
| Q8  | **Review lesson**                       | `lessonId.startsWith('review-')` and `pendingReview` is set          | Question pool is drawn from SM-2 due items across multiple lessons. No title shown for individual questions — uses `lesson.title` which is "Review Session".                                       | Existing states                       | Existing copy — no changes needed                                                                                      |
| Q9  | **Progress bar at 100%**                | Last question                                                        | Bar hits 100% right before `advance()` routes to Result. Visual moment — consider a brief flash or pulse on the bar fill colour at 100%.                                                           | —                                     | —                                                                                                                      |

---

### ResultScreen (`app/result.tsx`)

| #   | State                                             | Trigger                                  | What the user sees                                                                                                                                                                             | Frog state                        | Copy                                                                |
| --- | ------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------- |
| R1  | **Perfect score**                                 | `wrong === 0`                            | Confetti already plays. Frog should be `perfect.png`. Stat row for "Wrong" should be hidden (no point showing "0 wrong" as a stat).                                                            | `perfect.png`                     | "Flawless spellcasting." (replace generic "Great work!" if present) |
| R2  | **Zero correct**                                  | `correct === 0`                          | Confetti should NOT play. Frog should be `incorrect.png`. XP row still shows (10 XP awarded regardless — is this intended?).                                                                   | `incorrect.png`                   | "The spell fizzled. Practice makes the wizard."                     |
| R3  | **Streak incremented**                            | `streakUp === '1'` in params             | Currently: no special treatment in result screen. Should add a streak badge row or banner.                                                                                                     | `streak.png` (small accent)       | "🔥 Streak extended to N days."                                     |
| R4  | **Streak NOT incremented (already played today)** | `streakUp === '0'`                       | Normal result. No streak messaging.                                                                                                                                                            | `celebrate.png` (for good scores) | Standard result copy                                                |
| R5  | **First ever lesson**                             | `completed` was empty before this lesson | ✅ **Implemented 19 May 2026.** Gold banner: "✨ First spell cast! — Your first incantation is complete. The journey begins." Hidden on review and teach-only sessions.                        | `celebrate.png`                   | "Your first incantation is complete. The journey begins."           |
| R6  | **Review lesson complete**                        | `lesson.isReview === true`               | XP is not awarded (review sessions don't call `completeLesson`). The stat display should reflect this — hide the XP row or label it differently. Currently: XP row shows 0 which is confusing. | `celebrate.png`                   | "Review complete. Your memory sharpens."                            |

---

## Part 3 — Returning User Experience

### ⚠️ Mechanic Bug Register (Critical — Fix Before Implementing RUX)

These bugs were found by reading `lib/store.ts` directly. They block correct returning user experiences.

---

**⚠️ Bug #1 — Hearts never auto-refill**

`resetHearts()` exists in the store but is never called on app open. There is no daily heart refill logic. Hearts will stay at whatever value they were left at, forever, until manually reset.

**Fix:** In `_layout.tsx` or the `loadState()` action, after loading state, check if `lastPlayed` was not today. If it wasn't, call `resetHearts()` (but rename the call to `refillHearts()` conceptually — hearts should refill when a new day starts, not "reset").

---

**⚠️ Bug #2 — `resetHearts()` refills to 3, not MAX_HEARTS (5)**

`resetHearts()` sets `hearts: 3`. The HomeScreen HUD shows `MAX_HEARTS = 5`. These are inconsistent — user sees 5 empty slots but only 3 ever fill.

**Fix:** Change `resetHearts()` to `set({ hearts: MAX_HEARTS })` or `set({ hearts: 5 })`. Confirm the intended max (5) and use it consistently in both the store and the HUD.

---

**⚠️ Bug #3 — Hearts at 0 do not block the quiz**

`loseHeart()` clamps at 0. There is no check anywhere that prevents a user from starting or continuing a quiz with 0 hearts. The heart mechanic has no enforcement.

**Fix:** In `SectionScreen`, gate the lesson node `onPress` — if `hearts === 0`, show the "no hearts" modal (see S4 in edge states above) and do not navigate to QuizScreen.

---

**⚠️ Bug #4 — Streak break is silent**

`completeLesson()` resets streak to 1 if `lastPlayed` is not yesterday or today. This happens silently when the user completes their next lesson after a gap. There is no detection on app open.

**Fix:** In `_layout.tsx` or `loadState()`, after loading, compare `lastPlayed` to yesterday. If it's older than yesterday, flag `streakBroken: true` in the store. HomeScreen reads this flag and shows the streak-break banner, then clears the flag.

---

### 3.1 Day 2 — Returning After One Day

**What the app detects:**

- `lastPlayed` = yesterday's date
- `streak` = 1 (or higher if already established)
- Hearts were potentially spent yesterday — refill now fires (after Bug #1 fix)

**Experience:**

| Element        | Details                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**     | HomeScreen (no modal, no interrupt)                                                                                                 |
| **Frog**       | Not on HomeScreen — no frog change                                                                                                  |
| **Hearts**     | Silently refilled to 5 by `loadState()` — user notices the HUD is full                                                              |
| **Banner**     | A non-blocking top banner (dismiss on tap): `"🔥 Day 2 streak. The flame still burns."` — visible for 4 seconds then auto-dismisses |
| **Streak HUD** | Streak counter already visible in the top bar — no further treatment needed on day 2                                                |
| **CTA**        | Normal HomeScreen — no changed CTA                                                                                                  |

**Copy variant by streak length:**

| Streak | Banner copy                                                                  |
| ------ | ---------------------------------------------------------------------------- |
| 2      | "🔥 2-day streak. The flame still burns."                                    |
| 3–6    | "🔥 N-day streak. Your power grows."                                         |
| 7      | "🔥 One week. The wizards take notice." → triggers Milestone modal (see 3.3) |

---

### 3.2 Day 7 — Streak Milestone

**What the app detects:**

- `streak` reached 7 since last open (or is 7 on this open and the milestone has not yet been celebrated)
- Requires a `lastStreakMilestoneCelebrated: number` field in store to avoid re-showing

**Experience:**

| Element                  | Details                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| **Screen**               | Modal overlaying HomeScreen — not a new route, just a bottom sheet or centre modal                 |
| **Frog state**           | `streak.png` — proud, wand raised, golden streak trail                                             |
| **Headline**             | "Seven Days."                                                                                      |
| **Body**                 | "A full week of study. The arcane flame burns without interruption. You are no longer a beginner." |
| **Stat displayed**       | Current streak number (large, accent coloured)                                                     |
| **CTA**                  | "Continue training →" — dismisses modal, stays on HomeScreen                                       |
| **Milestone thresholds** | 7, 14, 30, 60, 100 days. Each gets the same modal treatment with copy scaled to the achievement    |

**Milestone copy table:**

| Streak | Headline                  | Body                                                      |
| ------ | ------------------------- | --------------------------------------------------------- |
| 7      | "Seven Days."             | "A full week of study. You are no longer a beginner."     |
| 14     | "A Fortnight of Mastery." | "Fourteen consecutive days. Your grimoire grows."         |
| 30     | "One Moon Cycle."         | "Thirty days without pause. The CCNA bows before you."    |
| 60     | "Two Months."             | "The dedication of a true network sage."                  |
| 100    | "One Hundred Days."       | "Legendary. Even the routers acknowledge your authority." |

---

### 3.3 Broken Streak — Returning After a Gap

**What the app detects (after Bug #4 fix):**

- `lastPlayed` is 2+ days ago
- `streak` was > 0 when the user last played
- A `streakBroken` flag is set by `loadState()` if the above conditions are true

**Experience:**

| Element             | Details                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Screen**          | A dismissable banner at the top of HomeScreen (NOT a blocking modal — do not punish the user with friction)                    |
| **Frog state**      | Not on HomeScreen — no frog change. The frog is in `incorrect.png` only if this becomes a full modal, which is NOT recommended |
| **Banner style**    | Subtle — muted red/amber tint, 1-line message, ✕ dismiss button                                                                |
| **Headline**        | "Your streak ended."                                                                                                           |
| **Body**            | "The arcane flame flickered out. Start a new one today."                                                                       |
| **CTA in banner**   | "Start over →" — scrolls down to module cards                                                                                  |
| **Hearts**          | Silently refilled as normal                                                                                                    |
| **After dismissal** | `streakBroken` flag is cleared. Banner never shows again until the next break                                                  |

**What NOT to do:**

- Do NOT show a full-screen blocking modal for a broken streak — this creates friction at the moment the user is trying to re-engage
- Do NOT animate the frog crying — negative reinforcement on return is a known retention killer
- Do NOT show the previous streak number prominently — mourning the old streak makes it feel not worth starting again

---

### 3.4 Long Absence (7+ days away)

**What the app detects:**

- `lastPlayed` is 7+ days ago
- Large SM-2 backlog has accumulated (many items due)

**Experience:**

| Element             | Details                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **Screen**          | HomeScreen — same broken streak banner as 3.3, but with additional copy about review items     |
| **Frog**            | Not on HomeScreen — no frog change                                                             |
| **Banner**          | "Welcome back. Your grimoire has `N` spells awaiting review."                                  |
| **CTA in banner**   | "Review now →" — routes to the section with the most due items                                 |
| **Due count badge** | Module and section cards already show due counts — these are the visual anchor for the backlog |

---

## Part 4 — UX Debt Summary

A prioritised list of all unimplemented UX and all mechanical bugs found during this audit.

**Last resolved:** All P1–P3 bugs and UX gaps completed. See implementation notes below.

### Priority 1 — Mechanical (broken before anything else)

| #   | Issue                                         | Type          | Where                                           | Status   |
| --- | --------------------------------------------- | ------------- | ----------------------------------------------- | -------- |
| B1  | Hearts never auto-refill daily                | Store bug     | `lib/store.ts` → `loadState()`                  | ✅ Fixed |
| B2  | `resetHearts()` fills to 3, not 5             | Store bug     | `lib/store.ts`                                  | ✅ Fixed |
| B3  | Hearts at 0 don't block quiz launch           | Missing gate  | `app/section/[id].tsx` node press handler       | ✅ Fixed |
| B4  | Streak break is silent — no detection on open | Missing logic | `lib/store.ts` → `loadState()` or `_layout.tsx` | ✅ Fixed |

### Priority 2 — Critical UX gaps

| #   | Issue                                                                    | Screen                | Status                                                                            |
| --- | ------------------------------------------------------------------------ | --------------------- | --------------------------------------------------------------------------------- |
| U1  | No onboarding — first launch goes straight to HomeScreen with no context | All                   | ✅ 3 screens created (`/onboarding`, `/onboarding/mechanics`, `/onboarding/path`) |
| U2  | `ModuleScreen` crashes on invalid `id` — no guard                        | `module/[id].tsx`     | ✅ Branded error state with frog                                                  |
| U3  | `SectionScreen` crashes on invalid `id` — no guard                       | `section/[id].tsx`    | ✅ Branded error state with frog                                                  |
| U4  | `SectionScreen` with 0 lessons has no empty state                        | `section/[id].tsx`    | ✅ "Coming soon" empty state with idle frog                                       |
| U5  | `QuizScreen` launches with 0 hearts — no gate                            | `quiz/[lessonId].tsx` | 🔴 Not implemented (gate is in SectionScreen — B3 covers this)                    |
| U6  | Fill input empty submit is evaluated as wrong with no feedback           | `quiz/[lessonId].tsx` | ✅ Shake animation on empty submit                                                |

### Priority 3 — Polish / Experience

| #   | Issue                                                                    | Screen             | Status                                                               |
| --- | ------------------------------------------------------------------------ | ------------------ | -------------------------------------------------------------------- |
| P1  | No returning user welcome banner                                         | `index.tsx`        | ✅ Auto-dismiss banner when `lastPlayed === yesterday`               |
| P2  | No streak milestone modal                                                | `index.tsx`        | ✅ Modal at milestones 7/14/30/60/100 days                           |
| P3  | No broken streak banner                                                  | `index.tsx`        | ✅ Dismissable banner reads `streakBroken` flag                      |
| P4  | ResultScreen: perfect score doesn't use `perfect.png` frog               | `result.tsx`       | 🔴 Asset `perfect.png` not created yet — using `celebrate.png`       |
| P5  | ResultScreen: 0 correct should suppress confetti and use `incorrect.png` | `result.tsx`       | ✅ `fizzled` flag suppresses confetti; "The spell fizzled." headline |
| P6  | ResultScreen: `streakUp` param is received but not surfaced to the user  | `result.tsx`       | ✅ Already implemented in previous session                           |
| P7  | ResultScreen: review lesson XP row shows "0 XP" with no explanation      | `result.tsx`       | ✅ XP row hidden for `isReview === '1'` lessons                      |
| P8  | Locked node tap has no feedback (silent disabled press)                  | `section/[id].tsx` | ✅ Toast: "Complete the previous lesson to unlock this one."         |
| P9  | 0 hearts has no HUD feedback beyond empty heart icons                    | `index.tsx`        | ✅ Warning banner below topBar                                       |

# CCNAQuest — QA Audit Report

**Prepared:** May 2026
**Role:** Senior QA engineer, mobile apps (iOS/Android)
**Method:** Static code analysis of all 8 source files (`_layout`, `index`, `module/[id]`, `section/[id]`, `quiz/[lessonId]`, `result`, `lib/store`, `lib/sm2`) plus `lib/types` and all 3 onboarding screens.
**Target:** App Store submission readiness

---

## Part 1 — Critical Bug Report

Severity definitions:

- **Critical** — Crash or feature completely broken on first interaction. Blocks submission.
- **High** — Wrong behavior that a user will encounter in normal use. Blocks submission.
- **Medium** — Visible defect in specific conditions. Should fix before submission.
- **Low** — Minor cosmetic or edge-case issue. Fix after launch or in v1.1.

---

### BUG-001 — Onboarding CTA crashes on all three screens `Critical`

> **✅ Fixed — 19 May 2026.** Named import (`{ PrimaryButton }`) applied in all three onboarding screens.

**File:** `app/onboarding/index.tsx` line 5, `app/onboarding/mechanics.tsx` line 5, `app/onboarding/path.tsx` line 8

**Root cause:**
All three onboarding screens import `PrimaryButton` as a **default import**:

```ts
import PrimaryButton from "../../components/PrimaryButton";
```

But `components/PrimaryButton.tsx` only has a **named export**:

```ts
export function PrimaryButton({ ... }) { ... }
```

There is no `export default`. The import resolves to `undefined` in the Metro bundler.

**What happens at runtime:** When any onboarding screen renders and React encounters `<PrimaryButton />`, it calls `React.createElement(undefined, ...)`. React throws: `"Element type is invalid: expected a string or class/function but got: undefined"`. The screen white-screens (on development: a red error overlay; on production: a blank screen with no CTA).

**Impact:** The entire onboarding flow is unresponsive on first launch. A new user cannot start the app. **App is effectively unlaunchable for new installs.**

**Fix:** Change all three imports to named import syntax:

```ts
import { PrimaryButton } from "../../components/PrimaryButton";
```

---

### BUG-002 — `PathNode` calls a hook conditionally `Critical`

> **✅ Fixed — 19 May 2026.** `useLoop` given an `enabled` parameter; called unconditionally in `PathNode` with `enabled = isCurrent`.

**File:** `app/section/[id].tsx`, inside the `PathNode` function component

**Root cause:**

```ts
function PathNode({ ..., isCurrent, ... }) {
  const bounce = useRef(new Animated.Value(0)).current;
  if (isCurrent) useLoop(bounce, 0, -10, 700);  // ← conditional hook
```

`useLoop` is a custom hook (it calls `useEffect` internally). React's Rules of Hooks state that hooks must be called unconditionally and in the same order on every render. Calling a hook inside an `if` statement violates this rule.

**What happens at runtime:** When a user completes a lesson, `isCurrent` changes from `true` to `false` on the next node (or from `false` to `true` for the next node). The hook call order changes between renders. React detects this and throws in development. In production builds, the hooks state gets misaligned — the animation `useEffect` cleanup may never run, the previous `isCurrent` node continues to animate when it shouldn't, and subsequent section screen renders may behave unpredictably.

**Fix:** Call `useLoop` unconditionally and gate the animation inside the hook logic, or restructure to only animate in a `useEffect` that depends on `isCurrent`:

```ts
const bounce = useRef(new Animated.Value(0)).current;
useLoop(bounce, 0, isCurrent ? -10 : 0, 700);
```

Or modify `useLoop` to accept an `enabled` parameter and no-op when disabled.

---

### BUG-003 — SM-2 cards are never updated for regular lesson questions `Critical`

> **✅ Fixed — 19 May 2026.** `_origIdx` now stamped on every question inside the `useMemo` that builds the lesson object before returning it.

**File:** `app/quiz/[lessonId].tsx` lines 132–151 (`handleCorrect`, `handleWrong`)

**Root cause:**
The SM-2 update branches check `q._reviewKey` and `q._origIdx`:

```ts
function handleCorrect() {
  const quality = firstAttemptRef.current ? 4 : 3;
  if (q._reviewKey) updateSM2(q._reviewKey, quality);
  else if (q._origIdx !== undefined) {
    updateSM2(`${lId}:${q._origIdx}`, quality);
  }
  // ← if neither field is set, updateSM2 is never called
}
```

`_reviewKey` and `_origIdx` are only set in `buildReviewLesson()` (`lib/sm2.ts` line 96). Static question objects in the data files never have these fields — they are always `undefined`. Confirmed by: `grep -r "_origIdx" data/` returns zero matches.

**What happens at runtime:** During every regular lesson, `handleCorrect` and `handleWrong` reach neither branch. No SM-2 card is ever created or updated. `isDue(undefined)` returns `true` for all questions. Result: every section's `getDueCount()` always returns the full question count. The Review node appears immediately on every section screen on first visit and never clears — even after reviewing.

**Impact:** The core spaced repetition feature is completely non-functional for regular lessons. The review node is permanently present on every section.

**Fix:** Assign `_origIdx` at question resolution time in the `useMemo` for regular lessons:

```ts
const lesson = React.useMemo(() => {
  if (lessonId?.startsWith("review-")) return pendingReview;
  const [sectionId, lId] = (lessonId ?? "").split(":");
  const sec = ALL_SECTIONS.find((s) => s.id === sectionId);
  const found = sec?.lessons.find((l) => l.id === lId) ?? null;
  if (!found) return null;
  // Stamp _origIdx on every question at load time
  return {
    ...found,
    questions: found.questions.map((q, i) => ({ ...q, _origIdx: i })),
  };
}, [lessonId]);
```

---

### BUG-004 — Returning user banner never shows `High`

> **✅ Fixed — 19 May 2026.** `useState(false)` replaces `useState(isReturning)`; `useEffect` on `hasLoaded` now triggers the banner reactively after store loads.

**File:** `app/index.tsx`, HomeScreen component

**Root cause:**

```ts
const isReturning = lastPlayed === yesterday;
const [returningBanner, setReturningBanner] = useState(isReturning);
```

`useState(isReturning)` evaluates `isReturning` exactly once — at initial render, before `loadState()` has resolved. At that point `lastPlayed = null` (default state), so `isReturning = false` and `returningBanner` is initialized to `false`. There is no `useEffect` that watches `lastPlayed` and updates `returningBanner` after the store loads.

**What happens at runtime:** Even if the user last played yesterday, the returning banner never shows. The `useState` initial value is permanently `false`. This breaks the P1 returning-user experience feature.

**Fix:** Add a reactive effect that fires when the store finishes loading:

```ts
const hasLoaded = useStore((s) => s.hasLoaded);
useEffect(() => {
  if (hasLoaded && isReturning) setReturningBanner(true);
}, [hasLoaded]);
```

---

### BUG-005 — XP displayed in result does not match XP added to store `High`

> **✅ Fixed — 19 May 2026.** `completeLesson(lessonId, perfect, wrongCount)` now computes variable XP and returns `{ streakIncremented, xpEarned }`. Result screen reads `xpEarned` from route params.

**File:** `app/result.tsx` line ~120, `lib/store.ts` `completeLesson`

**Root cause:**
`completeLesson` in the store always adds exactly 10 XP:

```ts
const xp = state.xp + 10;
```

Result screen computes a different display value:

```ts
const xpEarned = perfect ? 20 : Math.max(5, 10 - wrongN * 2);
```

For a perfect run the screen shows `+20 XP`. For 3 mistakes it shows `+4 XP`. Neither matches the actual store increment of `+10`.

**What happens at runtime:** Users see a misleading XP display. They believe they earned 20 XP on a perfect run, then notice the HUD hasn't moved by 20. This erodes trust in the XP system and will generate support complaints.

**Fix:** Either implement variable XP in `completeLesson` (`completeLesson(lessonId, perfect, wrongCount)`) and persist the actual amount, or simplify the result display to always show `+10 XP`.

---

### BUG-006 — Review session never increments streak `High`

> **✅ Fixed — 19 May 2026.** New `touchStreak()` action added to store; called in `advance()` when `lesson.isReview` is true.

**File:** `app/quiz/[lessonId].tsx` `advance()` function

**Root cause:**

```ts
if (!lesson?.isReview) {
  streakUp = completeLesson(`${sectionId}:${lesson.id}`, perfect);
}
```

`completeLesson` is skipped for review sessions. `completeLesson` is the only call that updates `lastPlayed` and `streak`. A user who studies daily only via review sessions (common for a returning user with a large backlog) will never have `lastPlayed` updated. Their streak will break silently the next morning despite active daily use.

**Fix:** Either call a lightweight `touchStreak()` action that updates `lastPlayed` and `streak` without marking a lesson complete, or add a separate `updateStreak()` call in `advance()` for review sessions. The `completeLesson` key conflict (review lesson id → bad key) is already avoided by the `!isReview` guard, but streak extension should be included.

---

### BUG-007 — Review node bypasses hearts gate `Medium`

> **✅ Fixed — 19 May 2026.** `hearts === 0` guard with `Alert.alert` added to `ReviewNode` `onPress`, matching the lesson node pattern.

**File:** `app/section/[id].tsx`, `ReviewNode` onPress handler

**Root cause:**

```ts
<ReviewNode x={x} y={y} dueCount={dueCount} onPress={() => {
  const reviewLesson = buildReviewLesson(sm2, sec);
  setPendingReview(reviewLesson);
  router.push(`/quiz/review-${id}`);
}} />
```

No hearts check. The lesson node `onPress` gates on `hearts === 0` with an `Alert.alert`. The review node has no equivalent gate.

**What happens at runtime:** A user with 0 hearts can tap the Review node and enter a quiz. Wrong answers call `loseHeart()` which clamps at 0 — no crash — but the mechanic is inconsistent. More importantly, it allows users to train when the game says they're out of lives, which undermines the hearts system.

**Fix:** Add the same guard before `router.push`:

```ts
if (hearts === 0) {
  Alert.alert(
    "Hearts Spent",
    "Your hearts are spent. Rest and return tomorrow, apprentice.",
    [{ text: "OK" }],
  );
  return;
}
```

---

### BUG-008 — `useMemo` for review lesson misses `pendingReview` dependency `Medium`

> **✅ Fixed — 19 May 2026.** `pendingReview` added to the `useMemo` dependency array.

**File:** `app/quiz/[lessonId].tsx` lines 50–57

**Root cause:**

```ts
const lesson = React.useMemo(() => {
  if (lessonId?.startsWith('review-')) {
    return pendingReview;  // ← used inside memo
  }
  ...
}, [lessonId]);  // ← pendingReview not in deps
```

`pendingReview` is read inside the memo but not listed as a dependency. React's exhaustive-deps lint rule would flag this.

**What happens at runtime:** If `pendingReview` is updated while the quiz screen is already mounted (e.g., background update or double-tap on review node), the memo returns a stale lesson object. In practice this is unlikely but in an edge case such as rapidly navigating in/out of quiz, the review session could render with null or outdated questions.

**Fix:** Add `pendingReview` to the dependency array: `}, [lessonId, pendingReview]);`

---

### BUG-009 — `topology` question type has no renderer `Medium`

> **✅ Fixed — 19 May 2026.** TypeScript `never` exhaustive check added in the fallback renderer branch. Any future unhandled `QuestionType` now produces a compile-time error.

**File:** `app/quiz/[lessonId].tsx`, `lib/types.ts`

**Root cause:**
`topology` is a valid member of the `QuestionType` union in `types.ts`. The `QuizScreen` renders `match`, `cli`, and `topology` via the fallback:

```ts
return (
  <View style={[styles.root, styles.center]}>
    <Text style={styles.errorText}>Question type "{q.type}" not yet supported.</Text>
    <PrimaryButton label="Skip" onPress={advance} variant="secondary" />
  </View>
);
```

Currently no data files use `topology` (confirmed by grep). However the type is exported and could be added to a data file at any time. There is no compile-time warning.

**Fix:** Add a TypeScript `never` exhaustive check in the fallback to catch unsupported types at build time, or add a `// @ts-expect-error` comment to deliberately acknowledge the gap.

---

### BUG-010 — `_layout.tsx` runs onboarding redirect before router may be ready `Medium`

> **✅ Fixed — 19 May 2026.** `router.replace` wrapped in `setTimeout(..., 0)` to yield back to the JS thread after the navigator mounts.

**File:** `app/_layout.tsx`

**Root cause:**

```ts
useEffect(() => {
  if (!hasLoaded) return;
  if (!onboardingComplete) {
    router.replace("/onboarding" as any);
  }
}, [hasLoaded]);
```

`loadState()` calls `AsyncStorage.getItem`. On a first launch with no data, `AsyncStorage.getItem` resolves synchronously with `null` on some Android devices, meaning `hasLoaded` can be set to `true` before the Expo Router navigator is fully mounted. Calling `router.replace` before the navigator is ready throws "Couldn't find a navigation object. Is your component inside NavigationContainer?" in Expo Router.

**What happens at runtime:** Sporadic crash on first-launch, more likely on lower-end Android devices.

**Fix:** Use Expo Router's `useRootNavigationState().key` readiness check, or wrap the redirect in a `requestAnimationFrame` / `setTimeout(0)` to yield back to the main thread after the navigator mounts:

```ts
useEffect(() => {
  if (!hasLoaded) return;
  if (!onboardingComplete) {
    setTimeout(() => router.replace("/onboarding" as any), 0);
  }
}, [hasLoaded]);
```

---

### BUG-011 — `fizzled` headline shown even on all-teach lessons `Low`

> **✅ Fixed — 19 May 2026.** `isTeachOnly = totalN === 0` detected in `result.tsx`; teach-only lessons show "📖 Lesson complete!", `idle.png` frog, and hide the graded stat rows.

**File:** `app/result.tsx`

**Root cause:**

```ts
const fizzled = correctN === 0 && wrongN > 0;
```

A lesson containing only `teach` cards passes all of them via `advance()` without going through `handleCorrect` or `handleWrong`. So `correctN = 0` and `wrongN = 0`. `fizzled` is false (correct). But `total = questions.filter(q => q.type !== 'teach').length` = 0, `pct = totalN > 0 ? ... : 100` = 100, `perfect = wrongN === 0 && correctN > 0` = false (no correct). Headline: `good = pct >= 70` = true → `"👍 Nice Work!"`. This is slightly misleading for a pure teach lesson but not a crash.

**Severity:** Low — teach-only lessons should not exist in production content by design.

---

## Part 2 — Device Test Plan

### Pre-conditions

- Fresh install (clear app data or use a new Simulator/device)
- Physical test devices: iPhone SE 3rd gen (small screen, iOS 17), iPhone 15 Pro Max (large screen, Dynamic Island, iOS 17), Samsung Galaxy A54 (mid-range Android 14)
- Also test in Expo Go on both platforms for development verification

---

### TC-01 — First Launch & Onboarding

| Step | Action                                    | Expected result                                                                           | Platform      |
| ---- | ----------------------------------------- | ----------------------------------------------------------------------------------------- | ------------- |
| 1    | Install and cold launch                   | Splash screen appears, then navigates to `/onboarding`                                    | iOS + Android |
| 2    | Observe onboarding screen 1               | Frog `idle.png` shown, headline "Welcome, Apprentice.", "Begin training →" button visible | iOS + Android |
| 3    | Tap "Begin training →"                    | Navigates to `/onboarding/mechanics`                                                      | iOS + Android |
| 4    | Observe onboarding screen 2               | Headline "Every wizard lives by three rules.", 3 rule rows visible, CTA button visible    | iOS + Android |
| 5    | Tap CTA                                   | Navigates to `/onboarding/path`                                                           | iOS + Android |
| 6    | Observe onboarding screen 3               | First lesson title pill shown, "Start Lesson 1 →" visible                                 | iOS + Android |
| 7    | Tap "Start Lesson 1 →"                    | Navigates directly to quiz for first lesson; home screen NOT shown                        | iOS + Android |
| 8    | Kill and relaunch app                     | Goes to HomeScreen directly — onboarding does NOT re-show                                 | iOS + Android |
| 9    | iPhone SE: check all 3 onboarding screens | No text clipped, no CTA hidden below screen edge, frog image not cropped                  | iOS SE only   |
| 10   | Rotate to landscape                       | Content readable, no overflow (or graceful lock to portrait)                              | iOS + Android |

---

### TC-02 — HomeScreen Layout & HUD

| Step | Action                             | Expected result                                                   |
| ---- | ---------------------------------- | ----------------------------------------------------------------- |
| 1    | View HomeScreen after onboarding   | 5 heart icons, XP bar, streak counter all visible in top bar      |
| 2    | iPhone SE: verify top bar          | All HUD elements fit without overlap at 375px width               |
| 3    | iPhone 15 Pro Max: verify top bar  | Dynamic Island doesn't cover content; safe area insets respected  |
| 4    | Android Samsung: verify status bar | Content starts below status bar, no overlap                       |
| 5    | Observe module cards               | 4 cards rendered, progress bars at 0%, colors match module accent |
| 6    | Tap a module card                  | Navigates to ModuleScreen for that module                         |
| 7    | Use back gesture / back button     | Returns to HomeScreen                                             |
| 8    | Complete 1 lesson, return home     | Module card progress bar advances; XP counter increments          |

---

### TC-03 — MCQ Question Type

| Step | Action                                        | Expected result                                                                                        |
| ---- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1    | Navigate to a lesson containing MCQ questions | Choice buttons render with question text above                                                         |
| 2    | Tap correct answer                            | Button highlights green, frog `celebrate.png` animates in from bottom, progress bar advances by 1 step |
| 3    | Tap "Continue"                                | Frog dismisses, next question loads, per-question state resets                                         |
| 4    | Tap wrong answer                              | Button highlights red, frog `incorrect.png` animates in, heart count decrements by 1                   |
| 5    | Tap correct answer after seeing wrong         | Correct highlights green; SM-2 quality records 3 (not 4) — verify via review appearing sooner          |
| 6    | Tap Continue after wrong                      | Next question loads                                                                                    |
| 7    | Tap an already-locked choice (after answered) | No state change — choice ignores tap                                                                   |

---

### TC-04 — True/False Question Type

| Step | Action                                  | Expected result                                  |
| ---- | --------------------------------------- | ------------------------------------------------ |
| 1    | Navigate to a lesson with T/F questions | "✅ True" and "❌ False" buttons render          |
| 2    | Tap correct answer                      | Green highlight, frog celebrate, heart unchanged |
| 3    | Tap wrong answer                        | Red highlight, frog incorrect, heart decrements  |
| 4    | After answering, tap the other option   | No state change (tap locked)                     |

---

### TC-05 — Fill-in-the-Blank Question Type

| Step | Action                                                           | Expected result                                           |
| ---- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| 1    | Navigate to a fill question                                      | TextInput renders with "Type your answer…" placeholder    |
| 2    | Tap "Check" with empty input                                     | Input shakes horizontally, no heart lost, no state change |
| 3    | Press keyboard Done key with empty input                         | Same shake, no state change                               |
| 4    | Type correct answer (exact case-insensitive match) and tap Check | Input highlights green, frog celebrate                    |
| 5    | Type wrong answer and tap Check                                  | Input highlights red, frog incorrect, heart decrements    |
| 6    | Type answer and press Done key                                   | Same result as tapping Check                              |
| 7    | iPhone SE: verify keyboard doesn't cover input                   | Input scrolls above keyboard; Check button accessible     |
| 8    | After answering, input is non-editable                           | `editable={false}` prevents further input                 |

---

### TC-06 — Word Bank Question Type

| Step | Action                                 | Expected result                                                                    |
| ---- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| 1    | Navigate to a wordbank question        | Answer slots render above, chip bank below                                         |
| 2    | Tap chips in correct order             | Chips move from bank to answer slots; when all placed, auto-evaluates              |
| 3    | Correct order placed                   | Green border on slots, frog celebrate                                              |
| 4    | Tap a placed chip in the answer area   | Returns chip to bank                                                               |
| 5    | Place all chips in wrong order         | Auto-evaluates wrong, frog incorrect, heart decrements, "Try Again" button appears |
| 6    | Tap "Try Again"                        | All chips return to bank, answer area clears, can attempt again                    |
| 7    | On retry, place chips in correct order | Evaluates correct; SM-2 records quality 3 (had first wrong)                        |
| 8    | Bank has duplicate words               | Each duplicate chip is independently selectable                                    |

---

### TC-07 — Teach Card

| Step | Action                                   | Expected result                                                                          |
| ---- | ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1    | Navigate to a teach card (type: 'teach') | "📖 LEARN" label, title, and body text shown — no answer input                           |
| 2    | "Got it →" button is immediately active  | No need to answer anything; button not disabled                                          |
| 3    | Tap "Got it →"                           | Advances to next question; no heart lost; no SM-2 update; correct/wrong counts unchanged |
| 4    | Teach card at end of quiz                | Tapping advances to result screen                                                        |

---

### TC-08 — Quiz Completion & Result Screen

| Step | Action                                        | Expected result                                                            |
| ---- | --------------------------------------------- | -------------------------------------------------------------------------- |
| 1    | Complete a lesson with all correct answers    | ResultScreen: "🎉 Perfect!" headline, confetti plays, frog celebrate shown |
| 2    | Observe stats card                            | Correct = N/N, Mistakes = 0, XP earned row shown, Score = 100%             |
| 3    | Observe streak banner                         | "🔥 N day streak!" banner visible (on first lesson of day)                 |
| 4    | Complete a lesson with ≥1 wrong answer        | "👍 Nice Work!" (if ≥70%) or "💪 Keep Going!" headline, no confetti        |
| 5    | Complete a lesson with 0 correct and ≥1 wrong | "💀 The spell fizzled." headline, frog incorrect, NO confetti              |
| 6    | Complete a review lesson                      | XP row is hidden; "Review complete" copy shown; no confetti regardless     |
| 7    | Tap "🏠 Home"                                 | Returns to HomeScreen                                                      |
| 8    | Tap "← Try Again"                             | Goes back to section screen (not re-launches quiz)                         |
| 9    | iPhone SE: verify result screen               | No content clipped, stats card and both buttons visible without scrolling  |

---

### TC-09 — Hearts, XP & Streak Mechanics

| Step | Action                                            | Expected result                                                       |
| ---- | ------------------------------------------------- | --------------------------------------------------------------------- |
| 1    | Start with 5 hearts, answer 5 questions wrong     | Heart count reaches 0, HUD shows 5 empty outlines                     |
| 2    | With 0 hearts, try to tap a lesson node           | Alert: "Hearts Spent. Rest and return tomorrow." Quiz does NOT launch |
| 3    | With 0 hearts on HomeScreen                       | Red banner: "Out of hearts. Rest until tomorrow, apprentice."         |
| 4    | Kill app, advance device clock by 1 day, relaunch | Hearts refill to 5 on launch                                          |
| 5    | Complete first lesson of a day                    | Streak increments by 1; streak in HUD updates                         |
| 6    | Complete second lesson same day                   | Streak does NOT increment again (already played today)                |
| 7    | Kill app, advance clock by 2+ days, relaunch      | Orange "Your streak was broken" banner appears on HomeScreen          |
| 8    | Tap ✕ on broken streak banner                     | Banner dismisses and does not reappear on next launch                 |
| 9    | Reach 7-day streak                                | Milestone modal appears with frog `streak.png` and "Seven Days." copy |
| 10   | Dismiss milestone modal                           | Does not reappear on next launch                                      |

---

### TC-10 — SM-2 Spaced Repetition & Review Session

| Step | Action                                    | Expected result                                                                                         |
| ---- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1    | Complete a lesson with some wrong answers | Review node (🔁) appears on section screen after lesson                                                 |
| 2    | Tap review node                           | Enters quiz with questions from that section that were answered wrong                                   |
| 3    | Complete review session                   | Result screen shows "Review" copy; XP row hidden; streak should update (currently broken — see BUG-006) |
| 4    | Return to section screen                  | Due count decreases for reviewed items                                                                  |
| 5    | On a new day, revisit section             | Items answered correctly do not re-appear in review immediately (interval has passed to tomorrow)       |
| 6    | Advance clock by review interval days     | Items re-appear as due                                                                                  |

---

### TC-11 — AsyncStorage Persistence

| Step | Action                                                          | Expected result                                                                                                  |
| ---- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1    | Complete 3 lessons, earn XP, build streak                       | All values visible in HUD                                                                                        |
| 2    | Force-kill app (swipe up on iOS / force stop on Android)        | App terminates                                                                                                   |
| 3    | Cold launch                                                     | XP, streak, hearts, completed lessons all preserved exactly as left                                              |
| 4    | Complete a lesson, then immediately force-kill before 2 seconds | Data should be saved (persistence is synchronous write; fire-and-forget but fast enough)                         |
| 5    | Fill storage on device (edge case)                              | App continues to function; "progress couldn't be saved" banner visible (currently not implemented — note as gap) |

---

### TC-12 — Safe Area & Layout on Small Screens (iPhone SE)

| Step | Action                                                    | Expected result                                                                         |
| ---- | --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1    | HomeScreen                                                | Top bar does not overlap status bar; bottom content not clipped                         |
| 2    | SectionScreen — section with many lessons (e.g. 10 nodes) | Path canvas scrolls; all nodes accessible; frog mascot not cut off                      |
| 3    | QuizScreen                                                | Question text not clipped; choice buttons all visible; keyboard doesn't hide fill input |
| 4    | ResultScreen                                              | Both action buttons and stats card visible; no content below viewport                   |
| 5    | Onboarding screens                                        | CTA button always visible without scrolling                                             |

---

### TC-13 — Error & Edge States

| Step | Action                                 | Expected result                                                                              |
| ---- | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1    | Navigate to `/module/invalid-id`       | Branded error: frog `incorrect.png`, "Tome not found.", Back button functional               |
| 2    | Navigate to `/section/invalid-id`      | Branded error: frog `incorrect.png`, "Chapter not found.", Back button functional            |
| 3    | Navigate to a section with 0 lessons   | Empty state: frog `idle.png`, "Coming soon." message, Back button functional                 |
| 4    | Navigate to `/quiz/invalid:invalid`    | "Lesson not found." text with Back link (unbranded — known gap Q1)                           |
| 5    | Returning user (last played yesterday) | "🔥 Day N streak" banner appears at top of scroll content and auto-dismisses after 4 seconds |

---

### TC-14 — Navigation & Back Behavior

| Step | Action                                         | Expected result                                                                         |
| ---- | ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1    | Android hardware back button on HomeScreen     | Does nothing / exits app (no unhandled navigation error)                                |
| 2    | Android hardware back in QuizScreen            | Returns to section screen (not result screen) — quiz progress lost, hearts NOT restored |
| 3    | Back from ResultScreen                         | Returns to section screen, not inside quiz                                              |
| 4    | Back from ModuleScreen                         | Returns to HomeScreen                                                                   |
| 5    | Back from SectionScreen                        | Returns to ModuleScreen                                                                 |
| 6    | Deep link to `/quiz/section1:lesson1` directly | Quiz loads correctly without going through onboarding                                   |

---

## Part 3 — Regression Checklist

> A non-technical person should be able to run through this list after any code change.
> Pass ✅ / Fail ❌ each item. Any ❌ must be fixed before release.

---

| #   | Check                                              | How to verify                                                                        |
| --- | -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | App opens to onboarding on first install           | Uninstall, reinstall, launch — onboarding screen 1 must appear                       |
| 2   | All three onboarding CTAs work                     | Tap through all 3 screens; third screen must launch first quiz                       |
| 3   | Returning user goes to HomeScreen (not onboarding) | After completing onboarding, force-kill and relaunch — must land on Home             |
| 4   | HomeScreen HUD shows 5 hearts, XP bar, streak      | Visual check on HomeScreen                                                           |
| 5   | Tapping a module card opens ModuleScreen           | Tap each of 4 module cards; each opens its sections list                             |
| 6   | Tapping a section card opens SectionScreen         | Open any section; path with lesson nodes must appear                                 |
| 7   | MCQ question: correct answer shows green           | Answer correctly — button turns green, frog celebrate appears                        |
| 8   | MCQ question: wrong answer loses a heart           | Answer incorrectly — HUD heart count decreases by 1, frog incorrect appears          |
| 9   | Fill question: empty submit shakes the input       | Tap Check with empty field — input shakes, no heart lost                             |
| 10  | Fill question: correct answer shows green          | Type exact answer, tap Check — input turns green                                     |
| 11  | Word bank: wrong then retry works                  | Place chips in wrong order — Try Again appears, chips reset, can reattempt           |
| 12  | Teach card advances without answering              | "Got it →" always active; no heart change; correct count unchanged                   |
| 13  | Completing a lesson shows ResultScreen             | Finish any lesson — result screen with score stats appears                           |
| 14  | Result screen: perfect score shows confetti        | Complete a lesson with 0 wrong answers — confetti plays                              |
| 15  | Result screen: 0 correct shows fizzled copy        | Skip or answer all wrong — "The spell fizzled." headline, no confetti                |
| 16  | Review XP row hidden                               | Complete a review session — XP row must not appear in stats                          |
| 17  | Completing a lesson updates module progress bar    | Return to HomeScreen — the module card progress bar must be higher                   |
| 18  | 0 hearts blocks lesson launch                      | Lose all 5 hearts, tap a lesson node — Alert fires, quiz does NOT open               |
| 19  | Hearts refill after simulated new day              | Spend hearts, kill app, advance device clock 24h, relaunch — HUD shows 5 hearts      |
| 20  | Progress persists after app kill                   | Earn XP + complete lessons, force-kill, relaunch — XP and completed status unchanged |

---

## Appendix — Known Gaps Not Covered by This Audit

The following are documented open items that affect quality but were out of scope for static code analysis:

| Gap                                 | Where documented         | Risk                                                    |
| ----------------------------------- | ------------------------ | ------------------------------------------------------- |
| `perfect.png` frog asset missing    | UX_FLOW_AUDIT.md P4      | Medium — result screen uses `celebrate.png` as fallback |
| `streak.png` frog asset missing     | VISUAL_STYLE_GUIDE.md P1 | Medium — milestone modal has no frog                    |
| `pointing.png` frog asset missing   | VISUAL_STYLE_GUIDE.md P1 | Low — onboarding falls back to `idle.png`               |
| App icon is a blank placeholder     | VISUAL_STYLE_GUIDE.md §4 | Critical for App Store submission                       |
| No privacy policy URL               | PROJECT_STATUS.md Risk 2 | Critical for App Store submission                       |
| No crash/error monitoring           | PROJECT_STATUS.md Risk 3 | High — `_persist()` errors invisible in production      |
| No accessibility labels (VoiceOver) | PROJECT_STATUS.md Role 6 | High — App Store may require                            |
| CCNA content accuracy unverified    | PROJECT_STATUS.md Risk 1 | Critical for reputation                                 |

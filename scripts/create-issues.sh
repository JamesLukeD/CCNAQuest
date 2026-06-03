#!/usr/bin/env bash
# Creates all GitHub labels and issues for CCNAQuest.
# Run from repo root: bash scripts/create-issues.sh
set -e
REPO="JamesLukeD/CCNAQuest"

echo "=== Creating labels ==="

gh label create "role: developer"    --color "0075ca" --description "Developer workstream"           -R $REPO --force
gh label create "role: illustrator"  --color "7057ff" --description "Illustrator / UI Designer"      -R $REPO --force
gh label create "role: legal"        --color "d93f0b" --description "Legal Advisor"                   -R $REPO --force
gh label create "role: sme"          --color "0e8a16" --description "CCNA Subject Matter Expert"      -R $REPO --force
gh label create "role: app-store"    --color "e4e669" --description "App Store Specialist"            -R $REPO --force
gh label create "role: qa"           --color "fbca04" --description "QA Engineer"                     -R $REPO --force
gh label create "role: pm"           --color "bfd4f2" --description "Programme Manager"               -R $REPO --force
gh label create "priority: critical" --color "b60205" --description "Crash / completely broken"       -R $REPO --force
gh label create "priority: high"     --color "e11d48" --description "Wrong behaviour in normal use"   -R $REPO --force
gh label create "priority: medium"   --color "f97316" --description "Visible defect in specific conditions" -R $REPO --force
gh label create "priority: low"      --color "fbbf24" --description "Minor / edge-case / cosmetic"    -R $REPO --force
gh label create "type: bug"          --color "d73a4a" --description "Something is broken"             -R $REPO --force
gh label create "type: task"         --color "0052cc" --description "Work item / feature task"        -R $REPO --force
gh label create "type: content"      --color "006b75" --description "CCNA content / data files"       -R $REPO --force
gh label create "type: asset"        --color "5319e7" --description "Visual asset / image"            -R $REPO --force

echo "=== Labels done ==="
echo ""
echo "=== Creating bug issues ==="

gh issue create -R $REPO \
  --title 'BUG-012: "Try Again" returns to section screen instead of restarting quiz' \
  --label "type: bug,priority: high,role: developer" \
  --body "$(cat <<'EOF'
**Severity:** High
**Files:** `app/result.tsx`, `app/quiz/[lessonId].tsx`

## Description
`quiz/[lessonId].tsx` navigates to result via `router.replace('/result')`, which removes the quiz from the navigation stack. The Try Again button calls `router.back()` — which returns to the **SectionScreen**, not the quiz.

## Steps to reproduce
1. Start any lesson and answer a question wrong
2. Complete the lesson
3. Tap "← Try Again" on the result screen

## Expected
Quiz restarts from question 1.

## Actual
Navigates back to the Section screen. The button label is actively misleading.

## Fix
Either use `router.push` (not `replace`) in `advance()`, or change Try Again to:
```ts
router.replace({ pathname: '/quiz/[lessonId]', params: { lessonId } });
```
EOF
)"

gh issue create -R $REPO \
  --title 'BUG-013: XP awarded on every lesson replay (XP farming)' \
  --label "type: bug,priority: high,role: developer" \
  --body "$(cat <<'EOF'
**Severity:** High
**File:** `lib/store.ts` — `completeLesson`

## Description
`completeLesson` computes `xpEarned` and unconditionally adds it to `state.xp`. The `completed[lessonId]` check only updates `done`/`perfect` — XP is always added regardless of prior completion.

## Steps to reproduce
1. Complete any lesson (note XP gain)
2. Return and complete the same lesson again
3. Repeat indefinitely

## Expected
XP only awarded on first-time completion.

## Actual
Full XP awarded on every replay. Player can reach max level by replaying lesson 1.

## Fix
```ts
const isFirstTime = !completed[lessonId];
const xpEarned = isFirstTime
  ? (wrongCount === 0 ? 20 : Math.max(5, 10 - wrongCount * 2))
  : 0;
const xp = state.xp + xpEarned;
```
EOF
)"

gh issue create -R $REPO \
  --title 'BUG-014: "Continue →" button bypasses heart gate' \
  --label "type: bug,priority: high,role: developer" \
  --body "$(cat <<'EOF'
**Severity:** High
**File:** `app/result.tsx`

## Description
SectionScreen guards lesson navigation with `if (hearts === 0) Alert.alert(...)`. The Continue button added to result.tsx navigates directly to the next quiz via `router.replace` with no hearts check.

## Steps to reproduce
1. Spend all 5 hearts
2. Complete a lesson
3. Press "Continue →" on the result screen

## Expected
Blocked with "Hearts Spent" alert matching the section screen behaviour.

## Actual
Navigates directly to the next quiz. Hearts mechanic fully bypassed.

## Fix
Add heart guard in the Continue handler in `result.tsx` before navigating.
EOF
)"

gh issue create -R $REPO \
  --title 'BUG-015: "First spell cast!" banner shows on every replay of lesson 1' \
  --label "type: bug,priority: medium,role: developer" \
  --body "$(cat <<'EOF'
**Severity:** Medium
**File:** `app/result.tsx` line ~103

## Description
```ts
const isFirstLesson = Object.keys(completed).length === 1;
```
Evaluates `true` whenever exactly one lesson is in the completed store. If the player replays their first lesson before completing others, the banner fires every time.

## Fix
Track with a dedicated store boolean `firstLessonCelebrated`, or check `!prevCompleted[lessonId]` before calling `completeLesson`.
EOF
)"

gh issue create -R $REPO \
  --title 'BUG-016: Fill-in-blank correct answer never shown after wrong attempt' \
  --label "type: bug,priority: medium,role: developer" \
  --body "$(cat <<'EOF'
**Severity:** Medium
**File:** `app/quiz/[lessonId].tsx` — fill renderer

## Description
When `answerState === 'wrong'` on a fill question, the input goes red but the correct answer is never displayed. MCQ highlights the correct choice green; TF highlights the correct button — fill has no equivalent reveal.

## Fix
Add answer reveal in the fill renderer:
```tsx
{answerState === 'wrong' && (
  <Text style={styles.correctAnswerHint}>
    Correct answer: {fq.answer}
  </Text>
)}
```
EOF
)"

gh issue create -R $REPO \
  --title 'BUG-017: correctCount can exceed total via wordbank/fill retries' \
  --label "type: bug,priority: medium,role: developer" \
  --body "$(cat <<'EOF'
**Severity:** Medium
**File:** `app/quiz/[lessonId].tsx` — `handleCorrect` / `handleWrong`

## Description
On a wordbank or fill retry: wrong answer increments `wrongCount`, subsequent correct retry increments `correctCount`. Both counts increment for the same question. With 8 questions all retried correctly: result shows "8/8 correct, 8 mistakes".

## Fix
Only increment `correctCount` on first-attempt correct answers by checking `firstAttemptRef.current` inside `handleCorrect`.
EOF
)"

gh issue create -R $REPO \
  --title 'BUG-018: `const loaded` reassigned in loadState() — relies on transpiler behaviour' \
  --label "type: bug,priority: medium,role: developer" \
  --body "$(cat <<'EOF'
**Severity:** Medium
**File:** `lib/store.ts` lines 52–71

## Description
```ts
const loaded = { ...DEFAULT_STATE, ...base };
loaded = applyHeartRefill(loaded);   // reassignment to const — JS error
loaded.hearts = MAX_HEARTS;          // direct mutation
loaded.streakBroken = true;          // direct mutation
```
Reassigning a `const` is a JavaScript error. Currently works only because Metro/Hermes transpiles `const` to `var`. A stricter bundler config could surface this as a runtime crash.

## Fix
Change declaration to `let`:
```ts
let loaded = { ...DEFAULT_STATE, ...base };
```
EOF
)"

gh issue create -R $REPO \
  --title 'BUG-019: Quiz progress bar never reaches 100%' \
  --label "type: bug,priority: low,role: developer" \
  --body "$(cat <<'EOF'
**Severity:** Low
**File:** `app/quiz/[lessonId].tsx` line ~110

## Description
```ts
const progress = qIndex / questions.length;
```
On the final question (index n-1, length n), progress = (n-1)/n ≈ 91% for 10 questions. The bar never fills because the quiz navigates away at completion.

## Fix
```ts
const progress = (qIndex + 1) / questions.length;
// or: Math.min((qIndex + 1) / questions.length, 1)
```
EOF
)"

gh issue create -R $REPO \
  --title 'BUG-020: Tapping a locked section on ModuleScreen gives no feedback' \
  --label "type: bug,priority: low,role: developer" \
  --body "$(cat <<'EOF'
**Severity:** Low
**File:** `app/module/[id].tsx` — `TopicCard`

## Description
`TopicCard` has `disabled={!unlocked}` which silently swallows taps. The SectionScreen shows a toast for locked lesson nodes. The ModuleScreen has no equivalent — silent failure.

## Fix
Add an onPress handler for the locked state that shows a brief alert or toast explaining that the previous section must be completed first.
EOF
)"

gh issue create -R $REPO \
  --title 'BUG-021: Review badge (🔁 N) shown on locked, unplayable lesson nodes' \
  --label "type: bug,priority: low,role: developer" \
  --body "$(cat <<'EOF'
**Severity:** Low
**File:** `app/section/[id].tsx` — `PathNode`

## Description
```tsx
{due > 0 && !isDone && <dueBadge />}
```
The `!isDone` check is insufficient. Locked nodes can display a review count badge, implying they are actionable for review, but tapping a locked node shows the "Locked" toast — not a review session.

## Fix
Add `&& isUnlocked` to the badge condition.
EOF
)"

echo "=== Bug issues done ==="
echo ""
echo "=== Creating workstream task issues ==="

# ── Developer ──────────────────────────────────────────────────────────────────

gh issue create -R $REPO \
  --title '[Developer] Enrol in Apple Developer Program ($99/yr)' \
  --label "type: task,priority: critical,role: developer" \
  --body "$(cat <<'EOF'
**Blocks:** Every iOS build, TestFlight distribution, App Store submission — nothing iOS can proceed without this.

## Action
Enrol at https://developer.apple.com/programs/enroll/

- Cost: $99/yr
- Requires: Apple ID + payment method
- Processing time: usually instant, occasionally up to 48 hrs

## Unblocks
- `eas build --platform ios --profile preview`
- TestFlight distribution
- App Store Connect record creation

Once done, close this issue and the EAS build issue becomes unblocked.
EOF
)"

gh issue create -R $REPO \
  --title '[Developer] Run first EAS iOS preview build → TestFlight' \
  --label "type: task,priority: high,role: developer" \
  --body "$(cat <<'EOF'
**Blocked by:** Apple Developer Program enrolment (#)

## Steps
```bash
eas login
eas build:configure
eas build --platform ios --profile preview
```

Watch for `lottie-react-native` native dependency issues — most likely build failure point.

## Deliverable
`.ipa` uploaded to TestFlight, QA engineer added as internal tester.

## After this
Update `docs/roles/ROLE_QA.md` engagement trigger — QA can begin physical device testing.
EOF
)"

gh issue create -R $REPO \
  --title '[Developer] Integrate frog assets when Illustrator delivers' \
  --label "type: task,priority: high,role: developer" \
  --body "$(cat <<'EOF'
**Blocked by:** Illustrator delivering perfect.png, streak.png, pointing.png

Place files in `assets/animations/frog/` then update:

| Asset | File to update | Change |
|-------|---------------|--------|
| `perfect.png` | `app/result.tsx` | Replace `celebrate.png` fallback on perfect score (R1) |
| `pointing.png` | `app/onboarding/mechanics.tsx`, `app/onboarding/path.tsx` | Replace placeholder frog on screens 2 and 3 |
| `streak.png` | `app/index.tsx` | Replace frog in H4 streak milestone modal |

Close after all three assets are integrated and `npm run validate` passes.
EOF
)"

gh issue create -R $REPO \
  --title '[Developer] Host privacy policy at live URL (after Legal delivers)' \
  --label "type: task,priority: critical,role: developer" \
  --body "$(cat <<'EOF'
**Blocked by:** Legal Advisor delivering privacy policy document

## Hosting options (in order of preference)
1. GitHub Pages — `gh-pages` branch or `/docs` folder in a public repo (free, instant)
2. Netlify / Vercel — one-click static HTML deploy
3. Notion public page — acceptable but fragile (can enforce login)

The URL must be **stable and permanent** — it is embedded in the app binary. It cannot change post-submission without a re-submission.

## After hosting
Add URL to two places:
1. `app.json` → `"privacyPolicyUrl"` field
2. App Store Connect → App Privacy section
EOF
)"

# ── Illustrator ────────────────────────────────────────────────────────────────

gh issue create -R $REPO \
  --title '[Illustrator] Deliver splash screen A3 — 1284×2778px PNG' \
  --label "type: asset,priority: high,role: illustrator" \
  --body "$(cat <<'EOF'
**Priority 1 — last remaining P1 asset**

## Spec
- Size: 1284×2778px (iPhone 14 Pro Max native resolution)
- Background: `#0e1a20`
- Content: centred logo or frog mascot, no text
- Format: PNG, no transparency

## Delivery
Place at: `assets/splash.png`
Update: `app.json` → `"splash": { "image": "./assets/splash.png" }`

Full visual spec in `docs/visual/VISUAL_STYLE_GUIDE.md`.
EOF
)"

gh issue create -R $REPO \
  --title '[Illustrator] Deliver perfect.png — frog celebrating perfect score (F1)' \
  --label "type: asset,priority: medium,role: illustrator" \
  --body "$(cat <<'EOF'
**Priority 2 — required for feature completeness**

## Spec
Frog celebrating — proud pose, wand raised, gold sparkles. Transparent background. Min 512×512px.

## Delivery
Filename: `perfect.png`
Location: `assets/animations/frog/perfect.png`

Currently: result screen R1 (perfect score) uses `celebrate.png` as a fallback.

Full visual spec and AI generation prompts in `docs/visual/VISUAL_STYLE_GUIDE.md` and `docs/producer/`.
EOF
)"

gh issue create -R $REPO \
  --title '[Illustrator] Deliver streak.png — frog with golden flame (F2)' \
  --label "type: asset,priority: medium,role: illustrator" \
  --body "$(cat <<'EOF'
**Priority 2 — required for feature completeness**

## Spec
Frog with golden flame emanating from wand. Triumphant. Transparent background. Min 512×512px.

## Delivery
Filename: `streak.png`
Location: `assets/animations/frog/streak.png`

Used in: HomeScreen H4 streak milestone modal.

Full visual spec in `docs/visual/VISUAL_STYLE_GUIDE.md`.
EOF
)"

gh issue create -R $REPO \
  --title '[Illustrator] Deliver pointing.png — frog pointing forward (F3)' \
  --label "type: asset,priority: medium,role: illustrator" \
  --body "$(cat <<'EOF'
**Priority 2 — required for feature completeness**

## Spec
Frog with flipper extended, pointing forward/downward. Guides the user to the CTA. Transparent background. Min 512×512px.

## Delivery
Filename: `pointing.png`
Location: `assets/animations/frog/pointing.png`

Used in: Onboarding screens 2 and 3.

Full visual spec in `docs/visual/VISUAL_STYLE_GUIDE.md`.
EOF
)"

# ── Legal ──────────────────────────────────────────────────────────────────────

gh issue create -R $REPO \
  --title '[Legal] Draft privacy policy document' \
  --label "type: task,priority: critical,role: legal" \
  --body "$(cat <<'EOF'
**CRITICAL PATH — blocks App Store submission**

Apple requires a live privacy policy URL in every submission. No waiver. Without it, submission is rejected before human review.

## What the policy must cover
1. **Data collected:** None. All progress stored locally via AsyncStorage. No data transmitted to any server.
2. **Third-party services:** Sentry (crash reporting, production builds only) — https://sentry.io/privacy
3. **Children:** No. Target audience is adults preparing for a professional certification.
4. **GDPR/UK GDPR:** App collects no personal data — obligations are minimal but must be stated explicitly.
5. **Contact information** for privacy enquiries.

## Format
Plain English. Single page. No legalese where avoidable.

Full brief in `docs/roles/ROLE_LEGAL.md`.
EOF
)"

gh issue create -R $REPO \
  --title '[Legal] Host privacy policy at a live, public URL' \
  --label "type: task,priority: critical,role: legal" \
  --body "$(cat <<'EOF'
**Blocked by:** Privacy policy draft complete
**Blocks:** App Store Connect configuration, submission

The URL must be **stable and permanent** — it is embedded in the app binary and App Store listing. It cannot change post-submission without re-submission.

## Preferred hosting options
1. `privacy.cawarden.com` or similar subdomain
2. GitHub Pages (free, fast)
3. Notion public page (acceptable but fragile)

Once live, share URL with Developer to add to `app.json` and App Store Connect.

Full brief in `docs/roles/ROLE_LEGAL.md`.
EOF
)"

# ── SME ────────────────────────────────────────────────────────────────────────

gh issue create -R $REPO \
  --title '[SME] Review Module 1 content — 10 sections, ~430 questions (Batch 1)' \
  --label "type: content,priority: critical,role: sme" \
  --body "$(cat <<'EOF'
**This is the only workstream that cannot be redone after launch.**

## Sections to review
Files in `data/sections/1.fundamentals/`:
- host-to-host, cisco-ios, transport-layer, network-layer, ip-address-classes
- subnetting, data-link-layer, physical-layer, cisco-device-functions, life-of-a-packet

## What to verify
- Every factual claim is accurate against the CCNA 200-301 exam blueprint
- Every question has a correct `answer` field
- No outdated or retired syllabus content
- No ambiguous questions where multiple answers could be defended

## How to flag errors
Comment on this issue with:
- Section ID
- Lesson ID (l1/l2/l3/l4)
- Question text
- Current (wrong) value
- Corrected value

Target: within 14 days of engagement.
Full brief in `docs/roles/ROLE_SME.md`.
EOF
)"

gh issue create -R $REPO \
  --title '[SME] Review Modules 2–4 content — 27 sections (Batches 2 & 3)' \
  --label "type: content,priority: high,role: sme" \
  --body "$(cat <<'EOF'
**Blocked by:** Developer completing content for Modules 2–4

## Sections
- **Batch 2 (Module 2):** `data/sections/2.routing-switching/` — 14 sections (s11–s24)
- **Batch 3 (Modules 3–4):** `data/sections/3.security-services/` + `data/sections/4.modern-networking/` — 13 sections (s25–s37)

Same review criteria as Batch 1 (see that issue).

Full brief in `docs/roles/ROLE_SME.md`.
EOF
)"

# ── QA ─────────────────────────────────────────────────────────────────────────

gh issue create -R $REPO \
  --title '[QA] Physical device testing — iOS (TestFlight)' \
  --label "type: task,priority: high,role: qa" \
  --body "$(cat <<'EOF'
**Blocked by:** EAS preview build on TestFlight + SME content review ≥80% complete

## Test devices
- iPhone SE 3rd gen (small screen, iOS 17)
- iPhone 15 Pro Max (large screen, Dynamic Island, iOS 17)

## Test plan
Run all 14 test cases (TC-01 to TC-14) from `docs/qa/QA_REPORT.md` Part 2.
Run all 26 regression checklist items from Part 3.

## Reporting
Log failures as new GitHub issues with labels `type: bug` + `role: developer` + appropriate priority.

Full brief in `docs/roles/ROLE_QA.md`.
EOF
)"

gh issue create -R $REPO \
  --title '[QA] Physical device testing — Android' \
  --label "type: task,priority: high,role: qa" \
  --body "$(cat <<'EOF'
**Blocked by:** EAS Android build

## Test device
- Samsung Galaxy A54 (mid-range, Android 14)

## Android-specific focus areas
- Hardware back button behaviour on all screens
- Status bar overlap / safe area
- AsyncStorage reliability on Android
- Adaptive icon rendering on home screen
- Keyboard behaviour on fill questions

Run all 14 test cases (TC-01 to TC-14) with Android-specific annotations.

Full brief in `docs/roles/ROLE_QA.md`.
EOF
)"

# ── App Store ──────────────────────────────────────────────────────────────────

gh issue create -R $REPO \
  --title '[App Store] Create App Store Connect record' \
  --label "type: task,priority: high,role: app-store" \
  --body "$(cat <<'EOF'
**Blocked by:** Apple Developer Program active + Privacy policy URL live + App icon delivered

## Setup steps
1. Sign in to https://appstoreconnect.apple.com
2. My Apps → New App → iOS
3. Bundle ID: `com.cawarden.ccnaquest`
4. App name: **CCNAQuest**
5. SKU: `ccnaquest-ios-001`
6. Primary language: English (UK)

## App details
- Category: Education
- Age rating: 4+
- Price: Free
- Supported languages: English only (v1.0)

Full checklist in `docs/roles/ROLE_APP_STORE.md`.
EOF
)"

gh issue create -R $REPO \
  --title '[App Store] Write App Store metadata — description, keywords, screenshots' \
  --label "type: task,priority: medium,role: app-store" \
  --body "$(cat <<'EOF'
**Blocked by:** App Store Connect record created + QA device testing complete (need real screenshots)

## Deliverables
- App description (up to 4000 chars) — highlight CCNA 200-301, spaced repetition, offline
- Subtitle (30 chars max)
- Keywords (100 chars max) — CCNA, networking, Cisco, flashcards, exam prep
- Promotional text (170 chars, can update without re-submission)
- Screenshots: 6.7" (iPhone 15 Pro Max) — minimum 3, up to 10
- Screenshots: 5.5" (iPhone SE) — optional but recommended

Full requirements in `docs/roles/ROLE_APP_STORE.md`.
EOF
)"

echo ""
echo "=== All issues created ==="

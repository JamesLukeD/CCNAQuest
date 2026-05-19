# CCNAQuest — Illustrator / UI Designer Brief

**Date:** 19 May 2026
**Role:** Illustrator / UI Designer
**Status:** Engaged — Day 1

---

## What You Are Building

CCNAQuest is a mobile flashcard and quiz app for the Cisco CCNA networking certification. The visual language is **dark wizard academy** — a student learns networking concepts as though they are a wizard studying incantations. The mascot is a small cartoon frog in wizard robes.

Everything is dark mode. Primary background is near-black (`#0e1a20`). Accent colours are Duolingo-adjacent greens, blues, and ambers. The tone is earnest and slightly whimsical — not comical.

**Full visual specification:** `docs/visual/VISUAL_STYLE_GUIDE.md`
**App icon composition preview:** `docs/visual/icon-preview.html` (open in a browser)

---

## Deliverables

### Priority 1 — Blocks App Store submission

| #   | Asset               | Spec                                                                                                                         | Unblocks                                   |
| --- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| A1  | `icon.png`          | 1024×1024px PNG, no transparency, no rounded corners (Apple crops automatically), background `#0e1a20`                       | App Store submission, all build validation |
| A2  | `adaptive-icon.png` | Android adaptive icon foreground layer — 1024×1024px transparent PNG, subject centred in the safe zone (inner 66% of canvas) | Android build                              |
| A3  | Splash screen       | 1284×2778px PNG (iPhone 14 Pro Max), background `#0e1a20`, centred logo or frog, no text                                     | EAS build splash validation                |

**A1 must come first.** The App Store validator rejects before human review if the icon is missing or placeholder.

### Priority 2 — Required for feature completeness

| #   | Asset              | Filename       | Spec                                                                                                                      | Unblocks                                                                    |
| --- | ------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| F1  | Perfect score frog | `perfect.png`  | Frog celebrating — proud pose, wand raised, gold sparkles. Transparent background. Min 512×512px.                         | Result screen R1 (perfect score) currently uses `celebrate.png` as fallback |
| F2  | Streak frog        | `streak.png`   | Frog with golden flame emanating from wand. Triumphant. Transparent background. Min 512×512px.                            | HomeScreen H4 milestone modal                                               |
| F3  | Pointing frog      | `pointing.png` | Frog with flipper extended, pointing forward/downward. Guides the user to the CTA. Transparent background. Min 512×512px. | Onboarding screens 2 and 3                                                  |

### Priority 3 — Polish (post-launch v1.1 if needed)

| #   | Asset            | Notes                                                                              |
| --- | ---------------- | ---------------------------------------------------------------------------------- |
| P1  | Reading frog     | `reading.png` — frog studying a scroll or book. Used in teach-card slides in quiz. |
| P2  | Splash animation | Lottie JSON — 2-second frog entrance animation for cold start. Optional.           |

---

## Existing Frog Assets (for consistency reference)

These four frog states already exist in `assets/animations/frog/`:

| File            | Pose                                | Used in                                                             |
| --------------- | ----------------------------------- | ------------------------------------------------------------------- |
| `idle.png`      | Neutral standing, wand held loosely | First lesson node, teach-only result                                |
| `celebrate.png` | Arms raised, excited                | Result screen (good score, currently also substituting for perfect) |
| `incorrect.png` | Drooping, disappointed              | Wrong answer overlay, error screens                                 |
| `thinking.png`  | Paw on chin, contemplating          | Used decoratively                                                   |

Your new frog states must match these in: line weight, colour palette, proportions, and overall rendering style. The frog is cute-friendly, not hyper-realistic.

---

## App Icon Brief

**Concept:** The frog mascot wearing a small wizard hat, inside a dark rounded-square frame, with a subtle magical glow or sparkle. The icon should read clearly at 60×60px (iPhone home screen) and at 1024×1024px.

**Do not:** add gradients that won't scale down, use thin lines that disappear at small sizes, include text in the icon.

**Colour anchors:**

- Background: `#0e1a20` (dark teal-black)
- Primary accent: `#1cb0f6` (sky blue — XP/streak bar colour)
- Secondary accent: `#58cc02` (green — success/correct colour)
- Frog body: match existing asset palette

**Composition preview** (`docs/visual/icon-preview.html`) shows the approximate layout. You have creative latitude on the exact pose and styling — the preview is a direction, not a final comp.

---

## File Delivery

Deliver all assets as **transparent PNGs** (except the app icon which must have a solid background). File naming must match exactly as listed above — the developer will drop them directly into `assets/animations/frog/` and `assets/` without renaming.

**Resolution:** At least the minimum specified. Larger is fine — they will be scaled down. Do not deliver less than the minimum.

**Format:** PNG only. Do not deliver JPEG, WebP, or SVG for raster frog assets.

---

## SVG Icons (Already Delivered)

17 SVG icons have been delivered and are in production. No further work needed on icons unless new question types are added.

---

## Timeline

| Deliverable              | Target day | Dependency                           |
| ------------------------ | ---------- | ------------------------------------ |
| A1 (`icon.png`)          | Day 5      | None — start immediately             |
| F1 (`perfect.png`)       | Day 5      | None — can run in parallel with icon |
| A2 (`adaptive-icon.png`) | Day 7      | Derived from A1                      |
| A3 (splash)              | Day 7      | Can reuse A1 composition             |
| F2 (`streak.png`)        | Day 9      | None                                 |
| F3 (`pointing.png`)      | Day 9      | None                                 |

---

## Questions

If anything in the visual spec is unclear, the reference document is `docs/visual/VISUAL_STYLE_GUIDE.md`. For tone/voice questions, read `docs/ux/UX_FLOW_AUDIT.md` Part 1 (Onboarding) — it describes the exact wizard academy world the app inhabits.

# CCNAQuest — UI Consistency Audit

**Date:** May 2026  
**Scope:** `app/index.tsx`, `app/module/[id].tsx`, `app/section/[id].tsx`, `app/quiz/[lessonId].tsx`, `app/result.tsx`  
**Status:** ✅ All 16 violations resolved

---

## Resolution Summary

| Item                                    | Fix                                      | Implemented by                  |
| --------------------------------------- | ---------------------------------------- | ------------------------------- |
| 1. Quiz background divergence           | `BG` token applied to all 5 screens      | `lib/theme.ts`                  |
| 2. Three surface colours                | Consolidated to `SURFACE_1`/`SURFACE_2`  | `lib/theme.ts`                  |
| 3. Three border colours                 | Unified to `BORDER = #1a3048`            | `lib/theme.ts`                  |
| 4. Five muted text values               | `MUTED` + `MUTED_HERO` tokens            | `lib/theme.ts`                  |
| 5. Hero pill text opacity 0.8 vs 0.85   | Single `HeroPill` component              | `components/HeroPill.tsx`       |
| 6. Hero bar track opacity 0.3 vs 0.35   | Single `HeroProgressBar` component       | `components/HeroPill.tsx`       |
| 7. Screen padding 16/20/24              | `SPACING.screen = 20` everywhere         | `lib/theme.ts`                  |
| 8. Progress bar heights 5/7/8           | In-card bars normalised to `6`           | `lib/theme.ts` (BORDER)         |
| 9. Hero bottom padding 28 vs 32         | `SPACING.heroBottom = 32`                | `lib/theme.ts`                  |
| 10. CTA button padding 16 vs 17         | `SPACING.btnV = 16`                      | `components/PrimaryButton.tsx`  |
| 11. CTA font size 17 vs 18              | `FONT.ctaSize = 18`                      | `components/PrimaryButton.tsx`  |
| 12. Border radius sprawl 12/14/16/18/20 | `RADIUS.sm/md/lg` scale                  | `lib/theme.ts`                  |
| 13. heroPill/heroBar defined twice      | Extracted `HeroPill` + `HeroProgressBar` | `components/HeroPill.tsx`       |
| 14. backBtn/backText defined twice      | Extracted `BackButton`                   | `components/BackButton.tsx`     |
| 15. Section divider defined twice       | Extracted `SectionDivider`               | `components/SectionDivider.tsx` |
| 16. No shared token file                | Created `lib/theme.ts`                   | `lib/theme.ts`                  |

---

## Original Violations (for reference)

## 🔴 Critical — visually obvious

### 1. Quiz screen has a different background

`quiz/[lessonId].tsx` root uses `#131f24`. Every other screen uses `#0e1a20`. The quiz screen is measurably darker and the difference is perceivable on any display.

| File                                                             | Value             |
| ---------------------------------------------------------------- | ----------------- |
| `index.tsx`, `module/[id].tsx`, `section/[id].tsx`, `result.tsx` | `#0e1a20`         |
| `quiz/[lessonId].tsx`                                            | `#131f24` ← wrong |

**Fix:** Change `quiz/[lessonId].tsx` root `backgroundColor` to `#0e1a20`.

---

### 2. Surface/card colour is split three ways

There are three distinct "dark card" background values in use with no clear hierarchy:

| Value     | Used in                                                         |
| --------- | --------------------------------------------------------------- |
| `#122030` | `index.tsx` topBar                                              |
| `#162228` | `index.tsx` cards, `result.tsx` statsBox                        |
| `#1c2f38` | `quiz/[lessonId].tsx` feedback bar, word bank chips, fill input |

**Fix:** Consolidate to two surfaces — `SURFACE_1 = #162228` (cards) and `SURFACE_2 = #122030` (bars/overlays) — and apply consistently.

---

## 🟠 Inconsistent tokens — same role, different value

### 3. Divider/border colour: three values

| Value     | Used in                                                                          |
| --------- | -------------------------------------------------------------------------------- |
| `#1a3048` | `index.tsx`, `module/[id].tsx` (progress tracks, section dividers, card borders) |
| `#1e3040` | `result.tsx` (statsBox border, row separators)                                   |
| `#2e4a5a` | `quiz/[lessonId].tsx` word bank chips, fill input (noticeably brighter)          |

**Fix:** Standardise to `BORDER = #1a3048` everywhere.

---

### 4. Muted/secondary text: five different values, one semantic role

| Value                    | Used in                                            |
| ------------------------ | -------------------------------------------------- |
| `#4a7080`                | `index.tsx` (as const `MUTED`)                     |
| `#4a6070`                | `module/[id].tsx` topicSub                         |
| `#5a8a9f`                | `result.tsx` lessonTitle                           |
| `rgba(255,255,255,0.7)`  | `module/[id].tsx` heroSub                          |
| `rgba(255,255,255,0.75)` | backText in `section/[id].tsx` + `module/[id].tsx` |

**Fix:** Define `MUTED = '#4a7080'` in `lib/theme.ts` and use it everywhere. Treat the rgba variants as the same token under a LinearGradient hero (where opacity makes more sense) and keep them consistent at `rgba(255,255,255,0.75)`.

---

### 5. Hero pill text opacity: `0.8` vs `0.85`

`module/[id].tsx` `heroPillText` uses `rgba(255,255,255,0.8)`.  
`section/[id].tsx` `heroPillText` uses `rgba(255,255,255,0.85)`.  
Same visual component, duplicated with a micro-difference.

---

### 6. Hero bar track opacity: `0.3` vs `0.35`

`module/[id].tsx` heroBar: `rgba(0,0,0,0.3)`.  
`section/[id].tsx` heroBar: `rgba(0,0,0,0.35)`.  
Same visual component, duplicated with a micro-difference. Items 5 and 6 are symptoms of violation 13 (component duplication).

---

## 🟡 Spacing — no consistent scale

### 7. Horizontal screen padding: 16 / 20 / 24

| Screen                  | Value                   |
| ----------------------- | ----------------------- |
| `index.tsx` content     | `paddingHorizontal: 16` |
| `section/[id].tsx` hero | `paddingHorizontal: 20` |
| `result.tsx` root       | `paddingHorizontal: 24` |

No rule for which screen gets which value. Pick one (recommend `20`) and apply it everywhere.

---

### 8. Progress bar heights: 5 / 7 / 8

| Component                                             | Height |
| ----------------------------------------------------- | ------ |
| `module/[id].tsx` topicBar (in-card)                  | `5`    |
| `index.tsx` progTrack (in-card)                       | `7`    |
| `quiz/[lessonId].tsx` track                           | `8`    |
| `section/[id].tsx` heroBar, `module/[id].tsx` heroBar | `8`    |

The two in-card bars should match (5 vs 7). The hero and quiz bars at 8 are consistent with each other.

---

### 9. Hero bottom padding: 28 vs 32

`section/[id].tsx` hero `paddingBottom: 28`.  
`module/[id].tsx` hero `paddingBottom: 32`.  
Same hero section layout, 4px apart.

---

### 10. CTA button vertical padding: 16 vs 17

`result.tsx` btn: `paddingVertical: 17`.  
`quiz/[lessonId].tsx` bigBtn: `paddingVertical: 16`.  
Buttons serve the same purpose and should be the same height.

---

## 🟡 Typography — no scale

### 11. Primary CTA button text: 17 vs 18

`result.tsx` btnText: `fontSize: 17, fontWeight: '800'`.  
`quiz/[lessonId].tsx` bigBtnText: `fontSize: 18, fontWeight: '800'`.  
Same UI element, 1pt apart.

---

### 12. Card border radius: 12 / 14 / 16 / 18 / 20

| Component                          | Radius |
| ---------------------------------- | ------ |
| Quiz choice buttons                | `12`   |
| Quiz BigButton                     | `14`   |
| Module topic cards, result buttons | `16`   |
| Result statsBox                    | `18`   |
| Home module cards                  | `20`   |

No radial scale. Each screen invented its own. Recommend two values: `RADIUS_SM = 12` (inline interactive), `RADIUS_MD = 16` (cards and buttons), `RADIUS_LG = 20` (floating panels).

---

## 🔵 Component duplication — shared code living as copies

### 13. `heroPill` / `heroPillRow` / `heroBar` / `heroBarFill` defined twice

`section/[id].tsx` and `module/[id].tsx` each contain a full copy of this 4-style block. The copies have diverged (see violations 5 and 6). Should be a shared `<HeroPills>` component.

### 14. `backBtn` + `backText` defined twice

Section and module screens each define an identical back button style block. Currently matching — a drift risk as screens evolve independently.

### 15. Section divider (horizontal line + label) defined twice

`index.tsx` has `sectionLine` / `sectionLabel`.  
`module/[id].tsx` has `listLine` / `listLabel`.  
Structurally and visually identical: `height: 1`, `#1a3048`, `fontSize: 11`, `fontWeight: '800'`, `letterSpacing: 2`. Should be a `<SectionDivider label="..." />` component.

### 16. No shared token file

There is no `lib/theme.ts`. `BG` and `CARD_BG` are defined only in `index.tsx` and imported nowhere. Every screen hard-codes its own colour strings, which is the root cause of violations 1–12.

---

## Recommended fix order

| Priority | Action                                                                                          |
| -------- | ----------------------------------------------------------------------------------------------- |
| 1        | Fix quiz background (`#131f24` → `#0e1a20`) — 1 line, user-perceivable                          |
| 2        | Create `lib/theme.ts` with colour, spacing, radius, and font-size tokens — fixes 1–12 at source |
| 3        | Extract `<HeroPills>` and `<BackButton>` shared components — fixes 13–14                        |
| 4        | Extract `<SectionDivider>` — fixes 15                                                           |
| 5        | Standardise CTA button into a shared `<PrimaryButton>` — eliminates the size/padding drift      |

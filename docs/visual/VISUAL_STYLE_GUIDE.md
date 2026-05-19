# CCNAQuest — Visual Style Guide

**Date:** May 2026  
**Role:** Art direction reference for all visual assets — mascot, icons, app icon, splash, and illustrations.  
**Update this doc** any time a new asset state is commissioned or a new icon set is defined.

---

## 1. Brand Identity & Visual Concept

### The idea in one sentence

> A **Network Wizard Frog** who has mastered the arcane arts of networking guides you through the CCNA syllabus.

The brand sits at the intersection of **magic academy** and **network engineering**. The dark teal UI (#0e1a20) reads like a terminal or command-line — technical, focused, professional. The frog mascot and its witch hat decorated with networking symbols (RJ45 port, WiFi runes, moon charm) is the warmth and personality that stops it feeling cold.

This tension — dark/technical UI + cute/magical mascot — **is the brand**. Never let either side collapse into the other. The UI should not become cartoony; the frog should not become corporate clip-art.

---

## 2. Mascot: The Network Wizard

### 2.1 Design DNA (what makes it the same character every time)

These elements are **non-negotiable** in every frog state:

| Element             | Specification                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Body shape**      | Squat chibi body — head ~60% of total height, tiny limbs                                                                                          |
| **Skin**            | Medium green `#5a9a3a` body with irregular dark-green `#3a6a20` spots; cream/pale yellow belly `#d4e89a`                                          |
| **Blush**           | Two soft peach/coral circles `#f0a080` on cheeks — always present                                                                                 |
| **Hat**             | Deep purple `#3a2060` / `#4a2878` pointed witch hat with gold `#d4a830` symbols and stitching                                                     |
| **Hat symbols**     | Gold glyphs that read as networking runes: RJ45 port, WiFi arc, network node, broomstick silhouette, crescent moon charm dangling from tip        |
| **Outline weight**  | 2–3px dark `#1a1a2a` outline on all major shapes, slightly looser/painterly (not perfectly even)                                                  |
| **Rendering style** | Semi-watercolor — flat base colours with subtle watercolour wash texture, especially on the hat. NOT cel-shaded (too flat) and NOT photorealistic |
| **Background**      | Always transparent PNG — never a background baked into the frog asset                                                                             |

### 2.2 Existing States

These four assets already exist in `assets/animations/frog/`.

| File            | Emotion          | Description                                                                                                      | Used in                                    |
| --------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `idle.png`      | Calm / attentive | Sitting upright, holding gold sparkle wand, warm amber eyes, gentle smile                                        | Section screen — beside active lesson node |
| `celebrate.png` | Ecstatic         | Mouth open, tongue out, wide psychedelic spiral eyes (concentric rings in pink/blue/yellow), slight lean forward | Quiz — correct answer overlay              |
| `incorrect.png` | Sad / deflated   | Hat drooped low covering most of the face, downcast teary eyes just visible, a red × floating top-left           | Quiz — wrong answer overlay                |
| `thinking.png`  | Pondering        | Hunched down with chin on hands, hat tipped forward, single amber eye visible, `?` and sparkle floating above    | Quiz — thinking state / fill-in prompt     |

### 2.3 What to Commission Next (Priority Order)

These states are missing and would meaningfully improve the experience:

#### P1 — High impact, referenced by current screens

| File                                  | Emotion              | Description                                                                                                                                          | Trigger                              |
| ------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `assets/animations/frog/streak.png`   | Proud / fired up     | Standing tall with wand raised overhead leaving a golden streak trail, fire or lightning sparks off the wand tip, confident wide smile               | Home screen — active streak ≥ 3 days |
| `assets/animations/frog/perfect.png`  | Triumphant           | Arms/flippers raised high, stars and confetti exploding around it, huge open-mouth grin, spiral eyes but golden/sparkly (not chaotic like celebrate) | Result screen — 100% correct lesson  |
| `assets/animations/frog/pointing.png` | Tutorial / directing | One flipper extended outward pointing to the right, raised eyebrow, friendly smirk — like a teacher directing attention                              | Onboarding, empty state hints        |

#### P2 — Nice to have

| File                                 | Emotion               | Description                                                                                         | Trigger                               |
| ------------------------------------ | --------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `assets/animations/frog/reading.png` | Studious              | Small open book in front of it, peering over the top, small round glasses optional, calm expression | Module intro / lesson loading         |
| `assets/animations/frog/levelup.png` | Levelling up          | Surrounded by ascending XP stars, hat shooting off upward while frog looks surprised and delighted  | XP milestone / level up toast         |
| `assets/animations/frog/sleepy.png`  | Tired / idle too long | Hat drooping to one side, one eye half-closed, small ZZZ floating                                   | Long session idle / no streak warning |

### 2.4 Generation Prompts

Use these as a base for any AI image generation (Midjourney, DALL-E, Firefly). Always append the **Style Lock** suffix to ensure visual consistency.

**Style Lock suffix — append to every prompt:**

```
cute chibi frog mascot, watercolor illustration style, semi-painterly rendering,
bold 2px dark outline, purple wizard hat with gold networking rune symbols (RJ45 port,
WiFi arc, moon charm), transparent background, green frog with cream belly and peach
blush cheeks, soft warm colour palette, game mascot style, no background, PNG
```

**streak.png prompt:**

```
[Style Lock] proud triumphant pose, standing upright with both flippers raised,
holding a gold sparkle wand overhead trailing golden light streaks, confident wide grin,
fire and lightning sparks, dynamic energy lines
```

**perfect.png prompt:**

```
[Style Lock] ecstatic celebration pose, arms raised above head, golden spiral eyes
with sparkles (not chaotic — radiant), confetti stars and XP symbols exploding around
it, huge open grin, triumphant
```

**pointing.png prompt:**

```
[Style Lock] friendly tutorial pose, one flipper extended pointing to the right,
raised eyebrow, slight knowing smirk, calm attentive expression, teacher energy
```

### 2.5 Expression Rules

| Eye type                      | Meaning                  | Example states                |
| ----------------------------- | ------------------------ | ----------------------------- |
| Warm amber circles (normal)   | Calm, neutral, thinking  | `idle`, `thinking`, `reading` |
| Amber circles + sheen         | Happy, attentive         | `idle` (on hover/active)      |
| Psychedelic spirals (chaotic) | Extreme/manic excitement | `celebrate`                   |
| Golden spirals (radiant)      | Pride, triumph           | `perfect`, `levelup`          |
| Half-lidded / drooped         | Sadness, deflation       | `incorrect`, `sleepy`         |
| Wide with sweat drop          | Shock/surprise           | `levelup` transition          |

---

## 3. Iconography

### 3.1 Style Direction

All UI icons must feel like they belong in the same world as the frog — slightly rounded, friendly, not clinical.

| Rule              | Specification                                                                       |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Style**         | Outlined icons — 2px stroke, rounded line caps and joins                            |
| **Corner radius** | Minimum 2px on all corners — no sharp 90° corners                                   |
| **Size grid**     | Draw on 24×24px grid; export at 24, 48, 72px (@1x, @2x, @3x)                        |
| **Stroke colour** | Inherit from parent text colour — never hardcode colour into the SVG/PNG            |
| **Fill**          | Unfilled by default; filled variant used for "active" / "selected" state            |
| **Weight**        | Medium — visually equivalent to SF Symbols "Regular" weight                         |
| **Avoid**         | Photorealistic detail, gradients within icons, more than 2 visual elements per icon |

### 3.2 Question Type Icons

Each question type in the quiz engine needs a recognisable icon. Used in lesson preview and result breakdown.

| Type                  | Icon concept                                                   | File                          |
| --------------------- | -------------------------------------------------------------- | ----------------------------- |
| MCQ (multiple choice) | Four small circles with one filled — like a radio button group | `assets/icons/q-mcq.svg`      |
| Fill-in-blank         | Underscored blank with a blinking cursor                       | `assets/icons/q-fill.svg`     |
| Word bank             | Three rounded word chips horizontally                          | `assets/icons/q-wordbank.svg` |
| Match                 | Two columns with a connecting line                             | `assets/icons/q-match.svg`    |
| CLI                   | A `>_` terminal cursor prompt                                  | `assets/icons/q-cli.svg`      |
| Teach                 | Speech bubble with a lightbulb inside                          | `assets/icons/q-teach.svg`    |

### 3.3 Status / Progress Icons

| Role                  | Icon concept            | File                               |
| --------------------- | ----------------------- | ---------------------------------- |
| Lesson complete       | Filled checkmark circle | `assets/icons/status-complete.svg` |
| Lesson locked         | Padlock                 | `assets/icons/status-locked.svg`   |
| Lesson due for review | Circular arrows (↻)     | `assets/icons/status-due.svg`      |
| Lesson in progress    | Half-filled circle      | `assets/icons/status-partial.svg`  |
| Heart (life)          | Filled heart            | `assets/icons/heart-full.svg`      |
| Heart empty           | Outlined heart          | `assets/icons/heart-empty.svg`     |
| XP / streak flame     | Flame shape             | `assets/icons/xp-flame.svg`        |

### 3.4 Module Identity Icons

The four modules currently use emoji. These should eventually become custom icons that use the module's accent colour. Each icon should be a simplified network/tech concept readable at 32px.

| Module              | Accent colour      | Icon concept                                                 |
| ------------------- | ------------------ | ------------------------------------------------------------ |
| Fundamentals        | `#1cb0f6` (blue)   | OSI layer stack — three horizontal bars with an upward arrow |
| Routing & Switching | `#ff9600` (orange) | Router node with two directional arrows                      |
| Security & Services | `#ff4b4b` (red)    | Shield with a lock inside                                    |
| Modern Networking   | `#8549ba` (purple) | Cloud with a small circuit node                              |

Files: `assets/icons/module-fundamentals.svg`, `module-routing.svg`, `module-security.svg`, `module-modern.svg`

---

## 4. App Icon

### 4.1 Concept

The current `assets/icon.png` is a blank placeholder. The app icon must:

1. Immediately read as "tech + magic" at 60×60px (home screen on a device)
2. Work on both light and dark wallpapers
3. Feature the frog as the unmistakeable hero

### 4.2 Composition

```
┌─────────────────────────────────┐
│                                 │
│   Background: radial gradient   │
│   #0e1a20 (center) →            │
│   #162a38 (edge)                │
│                                 │
│         [FROG — 70%]            │
│     Centred, slightly low.      │
│     Hat tip touching top safe   │
│     area boundary.              │
│                                 │
│   Subtle teal glow behind frog  │
│   #1cb0f6 at 15% opacity,       │
│   40% radius soft radial.       │
│                                 │
└─────────────────────────────────┘
```

- No app name text in the icon — just the frog
- No border/frame — the dark bg bleeds to edge naturally
- The frog should use the `idle.png` pose as the source expression, slightly cropped to focus on the head and hat (cut off at lower belly)

### 4.3 Platform Variants & Required Files

| File                       | Size      | Format | Notes                                                              |
| -------------------------- | --------- | ------ | ------------------------------------------------------------------ |
| `assets/icon.png`          | 1024×1024 | PNG    | Universal — iOS + Expo default                                     |
| `assets/adaptive-icon.png` | 1024×1024 | PNG    | Android foreground layer only (frog on transparent, no background) |
| `assets/favicon.png`       | 64×64     | PNG    | Web tab icon — just the hat silhouette is enough at this size      |

**Android adaptive icon note:** The current `app.json` sets `backgroundColor: "#ffffff"` for the adaptive icon — change to `#0e1a20` once the real foreground asset is created.

### 4.4 Safe Zone Rules

| Platform                        | Safe circle diameter (% of canvas) |
| ------------------------------- | ---------------------------------- |
| iOS rounded rect                | 80% — content must stay inside     |
| Android adaptive (inner circle) | 66% — content must stay inside     |
| Android adaptive (outer crop)   | 100% — background fills this       |

---

## 5. Splash Screen

### 5.1 Concept

Fast, branded, never janky. The splash should load instantly (it's a static image) and feel like entering a wizard's study.

### 5.2 Composition

```
Background: solid #0e1a20 (matches app bg, so the transition is seamless)

Centre: frog (idle pose, full body, ~40% screen width)

Below frog:
  "CCNAQuest" — bold, white, ~28px, tracking +2
  (optional) thin teal underline or glow accent

Top area: very subtle star/sparkle scatter (low opacity ~10%),
          like the hat's rune particles drifting upward
```

The goal is **zero flash** — the splash background must exactly match `#0e1a20` so the transition to HomeScreen is invisible.

### 5.3 Required Files

| File                     | Size      | Notes                                                                                                      |
| ------------------------ | --------- | ---------------------------------------------------------------------------------------------------------- |
| `assets/splash-icon.png` | 1284×2778 | Full iPhone 14 Pro Max resolution — Expo resizes down. Use `contain` resize mode (already set in app.json) |

**app.json fix needed:** Change `backgroundColor: "#0f1923"` (current) to `"#0e1a20"` to match BG token exactly.

---

## 6. Illustration Guidelines

### 6.1 Empty States

Used when there is no content to show (e.g. no lessons due, module complete).

| Rule                        | Value                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Use frog?**               | Yes — always use a frog state                                                                           |
| **Text**                    | Short (max 2 lines), friendly, wizard-flavour: e.g. "All spells learned for now." not "No items found." |
| **Illustration complexity** | Just the frog + floating particles/stars. No drawn backgrounds                                          |
| **Layout**                  | Frog centred at ~40% height, text below, CTA button below text                                          |

### 6.2 Achievement Badges

Future feature. When implemented, badge style rules:

| Rule           | Value                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------- |
| **Shape**      | Hexagonal — references network topology and feels more "earned" than a circle               |
| **Background** | Module accent colour at 100% with a radial highlight to suggest a 3D dome                   |
| **Icon**       | Simplified white icon of the achievement topic (e.g. shield for security, node for routing) |
| **Border**     | 3px gold `#d4a830` stroke — matches the hat's gold runes                                    |
| **Size**       | 64×64px base; 128×128 for unlock animation                                                  |

Files (when created): `assets/badges/[badge-slug].png`

### 6.3 Background Illustrations (Module Cards)

The home screen module cards currently use a solid gradient. A subtle background illustration could be added to each — a faint, low-opacity network topology or magic-rune pattern appropriate to each module.

| Rule         | Value                                                   |
| ------------ | ------------------------------------------------------- |
| **Opacity**  | Max 8–12% white — purely atmospheric, never distracting |
| **Style**    | Simple line art (no fill), same icon style as §3        |
| **Position** | Right-aligned, slightly overflowing the card edge       |
| **Format**   | SVG (scalable, tiny file size) or PNG with alpha        |

### 6.4 Tone of Voice for Illustration Copy

All flavour text paired with illustrations should use wizard/magic framing tied to networking:

| Situation           | ✅ Do this                        | ❌ Not this             |
| ------------------- | --------------------------------- | ----------------------- |
| Lesson complete     | "Spell mastered."                 | "Lesson complete!"      |
| No lessons due      | "Your grimoire is up to date."    | "Nothing to review."    |
| Streak broken       | "The arcane flame flickered out." | "Streak lost."          |
| New lesson unlocked | "A new incantation has appeared." | "New lesson available." |
| Perfect score       | "Flawless spellcasting."          | "100% correct!"         |

---

## 7. Asset Inventory

Complete checklist of all visual assets. Tick off as each is created.

### Frog States

- [x] `assets/animations/frog/idle.png`
- [x] `assets/animations/frog/celebrate.png`
- [x] `assets/animations/frog/incorrect.png`
- [x] `assets/animations/frog/thinking.png`
- [ ] `assets/animations/frog/streak.png` ← P1
- [ ] `assets/animations/frog/perfect.png` ← P1
- [ ] `assets/animations/frog/pointing.png` ← P1
- [ ] `assets/animations/frog/reading.png` ← P2
- [ ] `assets/animations/frog/levelup.png` ← P2
- [ ] `assets/animations/frog/sleepy.png` ← P2

### App Shell

- [ ] `assets/icon.png` (1024×1024 — frog on dark bg)
- [ ] `assets/adaptive-icon.png` (1024×1024 — frog on transparent)
- [ ] `assets/favicon.png` (64×64 — hat silhouette)
- [ ] `assets/splash-icon.png` (1284×2778 — full splash)

### Question Type Icons

- [ ] `assets/icons/q-mcq.svg`
- [ ] `assets/icons/q-fill.svg`
- [ ] `assets/icons/q-wordbank.svg`
- [ ] `assets/icons/q-match.svg`
- [ ] `assets/icons/q-cli.svg`
- [ ] `assets/icons/q-teach.svg`

### Status Icons

- [ ] `assets/icons/status-complete.svg`
- [ ] `assets/icons/status-locked.svg`
- [ ] `assets/icons/status-due.svg`
- [ ] `assets/icons/status-partial.svg`
- [ ] `assets/icons/heart-full.svg`
- [ ] `assets/icons/heart-empty.svg`
- [ ] `assets/icons/xp-flame.svg`

### Module Icons

- [ ] `assets/icons/module-fundamentals.svg`
- [ ] `assets/icons/module-routing.svg`
- [ ] `assets/icons/module-security.svg`
- [ ] `assets/icons/module-modern.svg`

---

## 8. app.json Fixes Required

Two values in `app.json` need updating once assets are created:

```json
// Splash background must match BG token exactly
"splash": {
  "backgroundColor": "#0e1a20"  // currently "#0f1923" — 3 values off
}

// Android adaptive icon background must be dark, not white
"android": {
  "adaptiveIcon": {
    "backgroundColor": "#0e1a20"  // currently "#ffffff"
  }
}
```

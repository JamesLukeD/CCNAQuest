// ── Colour tokens ─────────────────────────────────────────────────────────────
export const BG        = '#0e1a20';   // screen background (all screens)
export const SURFACE_1 = '#162228';   // cards, stats boxes
export const SURFACE_2 = '#122030';   // top bars, overlays
export const BORDER    = '#1a3048';   // dividers, card borders, progress tracks
export const MUTED     = '#4a7080';   // secondary text on flat backgrounds
export const MUTED_HERO = 'rgba(255,255,255,0.75)'; // secondary text on gradient heroes

// ── Spacing scale ─────────────────────────────────────────────────────────────
export const SPACING = {
  screen:     20,   // paddingHorizontal on all screens
  heroBottom: 32,   // hero section paddingBottom
  btnV:       16,   // CTA button paddingVertical
} as const;

// ── Border-radius scale ───────────────────────────────────────────────────────
export const RADIUS = {
  sm:  12,   // inline interactive (choice buttons, inputs)
  md:  16,   // cards, standard buttons
  lg:  20,   // floating panels, home cards, chips
} as const;

// ── Typography ────────────────────────────────────────────────────────────────
export const FONT = {
  ctaSize:   18,
  ctaWeight: '800' as const,
} as const;

# CCNAQuest — Programme Manager / Chief of Staff Brief

**Date:** 19 May 2026
**Role:** Programme Manager / Chief of Staff
**Status:** Active — cross-workstream coordination

---

## Current Launch Readiness: 70%

| Workstream                  | %    | Status                                                                    |
| --------------------------- | ---- | ------------------------------------------------------------------------- |
| Core Engineering            | 99%  | ✅ Complete — all 11 bugs closed, all UX states done                      |
| UI / Design System          | 95%  | ✅ Stable — no open items                                                 |
| UX / Flow & Edge States     | 100% | ✅ Complete — all states implemented 19 May 2026                          |
| Visual Assets               | 52%  | 🔄 Illustrator engaged — icon + 3 frog PNGs pending                       |
| Content Quality             | ~15% | 🔄 SME in progress — Module 1 under review                                |
| QA                          | 35%  | 🔴 Awaiting production build + SME ≥80%                                   |
| Infrastructure / Monitoring | 20%  | 🔄 Sentry wired (DSN placeholder); EAS CLI ready; needs Apple Dev account |
| Legal / Privacy             | 0%   | 🔴 **Not started — CRITICAL PATH**                                        |
| App Store                   | 0%   | 🔴 Blocked by legal + icon + Apple Dev account                            |
| Accessibility               | 0%   | 🔴 Deferred post-TestFlight                                               |
| Performance                 | 0%   | 🔴 Deferred post-TestFlight                                               |

---

## The Three Critical Path Items

These independently block App Store submission. Nothing else is more important.

### 1. App Icon

**Owner:** Illustrator
**Status:** In progress — composition preview exists at `docs/visual/icon-preview.html`
**Blocks:** App Store submission, build validation
**Your action:** Confirm illustrator received `docs/visual/VISUAL_STYLE_GUIDE.md` and has A1 (`icon.png`) as their top priority. Expected: Day 5.

### 2. Privacy Policy at a Live URL

**Owner:** Legal Advisor
**Status:** 🔴 Legal not yet engaged
**Blocks:** App Store Connect configuration, privacy nutrition labels, submission
**Your action:** Engage Legal Advisor today. Brief is at `docs/roles/ROLE_LEGAL.md`. Target: live URL by Day 5.

### 3. CCNA Content Accuracy

**Owner:** CCNA SME
**Status:** Module 1 (sections 1–10) in progress
**Blocks:** QA sign-off, app credibility
**Your action:** Chase Batch 1 delivery (sections 1–10) and remind SME of the 14-day target for Batches 1+2.

---

## Immediate Actions (Week 1)

| Day     | Action                                                               | Owner                | Unblocks                  |
| ------- | -------------------------------------------------------------------- | -------------------- | ------------------------- |
| Today   | Engage Legal Advisor — send `docs/roles/ROLE_LEGAL.md`               | PM                   | Privacy policy URL        |
| Today   | Confirm illustrator has icon as priority 1                           | PM                   | Build validation          |
| Today   | Chase SME for Batch 1 ETA                                            | PM                   | Content corrections start |
| Day 1–3 | Developer: enrol Apple Developer Program ($99/yr)                    | Developer            | All iOS builds            |
| Day 3   | Legal: deliver privacy policy draft                                  | Legal                | Review + hosting          |
| Day 5   | Illustrator: deliver `icon.png` (1024×1024)                          | Illustrator          | App Store submission      |
| Day 5   | Legal: live privacy policy URL                                       | Legal                | App Store Connect         |
| Day 7   | Developer: `eas login` + `eas build:configure` + first preview build | Developer            | TestFlight                |
| Day 8   | App Store Specialist: create App Store Connect record                | App Store Specialist | TestFlight distribution   |

---

## Workstream Dependency Map

```
Apple Developer account ──► EAS build ──► TestFlight ──► QA on device
                                                          ▲
Privacy policy URL ──────► App Store Connect ────────────┤
                                                          │
Icon (A1) ──────────────► Build validation ──────────────┤
                                                          │
SME review ≥80% ─────────────────────────────────────────┘
```

All four must complete before QA sign-off. QA sign-off is the gate before App Store submission.

---

## Handoff Coordination Required

### When Legal delivers:

1. Trademark recommendation → send to App Store Specialist for listing copy disclaimer
2. Privacy policy live URL → send to Developer (for `app.json`) and App Store Specialist (for Connect labels)

### When Illustrator delivers:

1. `icon.png` + `adaptive-icon.png` → send to Developer for `app.json` integration
2. `perfect.png`, `streak.png`, `pointing.png` → send to Developer for frog integration (see `docs/roles/ROLE_DEVELOPER.md` asset integration table)
3. Splash screen → send to Developer

### When SME delivers Batch 1:

1. Review spreadsheet → send to Developer for content corrections
2. Track % complete against 37-section total

### When Developer produces first EAS build:

1. Share TestFlight link with QA Engineer (if available) and internal stakeholders
2. Confirm Sentry DSN is live — test by triggering a deliberate exception

---

## Document Register

All project documents are in `docs/`. These are the live sources of truth:

| Document                             | Purpose                                                              | Last updated |
| ------------------------------------ | -------------------------------------------------------------------- | ------------ |
| `docs/pm/PROGRAMME_BRIEF.md`         | Master status dashboard, critical path, 14-day plan                  | 19 May 2026  |
| `docs/pm/PROJECT_STATUS.md`          | Earlier status snapshot — superseded by PROGRAMME_BRIEF              | 19 May 2026  |
| `docs/qa/QA_REPORT.md`               | Full bug register (BUG-001–011), 14 test cases, regression checklist | 19 May 2026  |
| `docs/ux/UX_FLOW_AUDIT.md`           | Full UX spec — all screen states, edge cases, copy                   | 19 May 2026  |
| `docs/architecture/SYSTEM_DESIGN.md` | Technical architecture reference                                     | May 2026     |
| `docs/ui/UI_AUDIT.md`                | Design system, token audit                                           | May 2026     |
| `docs/visual/VISUAL_STYLE_GUIDE.md`  | Visual spec for illustrator                                          | May 2026     |
| `docs/roles/ROLE_DEVELOPER.md`       | Developer brief                                                      | 19 May 2026  |
| `docs/roles/ROLE_ILLUSTRATOR.md`     | Illustrator brief                                                    | 19 May 2026  |
| `docs/roles/ROLE_LEGAL.md`           | Legal advisor brief                                                  | 19 May 2026  |
| `docs/roles/ROLE_SME.md`             | CCNA SME brief                                                       | 19 May 2026  |
| `docs/roles/ROLE_APP_STORE.md`       | App Store Specialist brief                                           | 19 May 2026  |
| `docs/roles/ROLE_QA.md`              | QA Engineer brief                                                    | 19 May 2026  |

---

## Week 2 Focus

If Week 1 goes to plan:

- **Days 8–10:** App Store Connect setup (App Store Specialist), screenshot production
- **Days 8–14:** SME Batch 2 delivery + corrections (sections 11–24)
- **Day 12:** First production EAS build attempt
- **Day 14:** Status checkpoint — review the 5 Day 14 gates in `docs/pm/PROGRAMME_BRIEF.md §4`

---

## Flags to Watch

1. **SME timeline is the longest-lead item.** 37 sections × 10–20 questions each = significant review volume. If Batch 1 is not delivered by Day 7, escalate — this is the critical path.
2. **Apple Developer account takes 48 hours to activate** after payment. Do not assume it's instant.
3. **`lottie-react-native` native build** is untested — the first EAS build may surface a compilation failure. The Developer knows this risk.
4. **Bundle identifier `com.cawarden.ccnaquest`** is a placeholder. Confirm the correct reverse-domain with the Developer before the first EAS build.

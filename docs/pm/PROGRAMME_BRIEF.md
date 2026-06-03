# CCNAQuest — Programme Status

**Last updated:** 2 June 2026 — verified directly from codebase and file system. 3 fixes applied this session.
**Cross-referenced:** SYSTEM_DESIGN, VISUAL_STYLE_GUIDE, UX_FLOW_AUDIT, QA_REPORT

---

## 1. MASTER STATUS DASHBOARD

| Workstream                  | %    | Status         | Open items                                                                   |
| --------------------------- | ---- | -------------- | ---------------------------------------------------------------------------- |
| **Core Engineering**        | 100% | ✅ Complete    | None — TS errors fixed                                                       |
| **UI / Design System**      | 100% | ✅ Complete    | None                                                                         |
| **UX / Flow & Edge States** | 100% | ✅ Complete    | None                                                                         |
| **Visual Assets**           | 100% | ✅ Complete    | All 7 frog PNGs delivered, icon, adaptive-icon, splash-icon all present      |
| **Content — Written**       | 100% | ✅ Complete    | All 37 sections written — ~32–49 questions each (~1,400 total)               |
| **Content — SME Review**    | 0%   | 🔴 Not started | All 37 sections need expert CCNA accuracy review before QA                   |
| **QA**                      | 35%  | 🔴 Waiting     | Plan + bug register done; no device testing — blocked on production build    |
| **Infrastructure**          | 100% | ✅ Complete    | Sentry DSN live; production Sentry upload re-enabled                         |
| **Legal / Privacy**         | 100% | ✅ Complete    | `privacy.html` live at `https://jamesluked.github.io/CCNAQuest/privacy.html` |
| **App Store**               | 10%  | 🟡 Started     | Google Play Developer account active; Play Console record not yet created    |
| **Accessibility**           | 0%   | 🔴 Not started | Zero `accessibilityLabel` props anywhere in the app                          |
| **Performance**             | 0%   | ⏳ Deferred    | Post-TestFlight                                                              |

---

## 2. CRITICAL PATH

Three items independently block App Store submission.

### ✅ Critical Path 1 — App Icon

**Done.** `assets/icon.png` (1.8 MB), `assets/adaptive-icon.png`, `assets/splash-icon.png` (1.1 MB) all present and wired in `app.json`.

### ✅ Critical Path 2 — Privacy Policy at a Live URL

**Done.** `privacy.html` is live at `https://jamesluked.github.io/CCNAQuest/privacy.html`. `privacyPolicyUrl` is set in `app.json`.

### 🔴 Critical Path 3 — CCNA Content Accuracy Sign-off

**Content is written; review not started.** All 37 sections have real questions. None have been reviewed by a CCNA subject matter expert. This is the only item that cannot be fixed after launch — factual errors in subnetting, OSPF, ACLs etc. will cause exam failures and public criticism.

**Owner:** CCNA SME
**Unblocks:** QA sign-off, submission credibility

---

## 3. WHAT HAS BEEN DONE SINCE LAST BRIEF (20 May → 2 June)

The docs were substantially out of date. Code audit reveals significantly more progress than documented:

| Item                                        | Previously documented as       | Actual state (2 June)                                           |
| ------------------------------------------- | ------------------------------ | --------------------------------------------------------------- |
| Modules 2–4 content                         | Empty (`lessons: []`)          | ✅ All 27 sections fully written with questions                 |
| `perfect.png`, `pointing.png`, `streak.png` | Pending generation             | ✅ All delivered (1.7 MB each, in `assets/animations/frog/`)    |
| Splash screen                               | Pending                        | ✅ `assets/splash-icon.png` present + wired                     |
| Privacy policy                              | Not written                    | ✅ `privacy.html` complete at project root — needs hosting only |
| Onboarding `pointing.png`                   | Using placeholder              | ✅ Correct asset referenced in `app/onboarding/path.tsx`        |
| Result `perfect.png`                        | Using `celebrate.png` fallback | ✅ Correct asset referenced in `app/result.tsx`                 |

---

## 4. WHAT IS ACTUALLY REMAINING (priority order)

### Developer

1. ✅ ~~Fix 2 TypeScript errors in `app/quiz/[lessonId].tsx`~~ — done
2. ✅ ~~Sentry uploads~~ — `SENTRY_DISABLE_AUTO_UPLOAD` removed from `eas.json` production
3. ✅ ~~`privacyPolicyUrl` in `app.json`~~ — set to `https://jamesluked.github.io/CCNAQuest/privacy.html`
4. ✅ ~~Enable GitHub Pages~~ — live at `https://jamesluked.github.io/CCNAQuest/privacy.html`
5. ✅ ~~Register Google Play Developer account~~ — done
6. **First EAS Android build**: `eas login` → `eas build --platform android --profile production`
7. **Accessibility minimum pass** — add `accessibilityLabel` to interactive elements
8. **Implement SME corrections** as they come in

_iOS App Store follows as v1.1 after Android launch is stable._

### SME

- Review all 37 sections for CCNA 200-301 accuracy — provide corrections spreadsheet per section

### QA (cannot start until: production build available AND SME review ≥ 80%)

- Run 14 device test cases (TC-01–TC-14) — see `docs/qa/QA_REPORT.md`
- Run 20-item regression checklist

### App Store Specialist (cannot start until: privacy URL live + Apple Dev paid tier active)

- Create App Store Connect record (`com.cawarden.ccnaquest`)
- Write listing copy, configure nutrition labels, take screenshots

---

## 5. DEPENDENCY MAP

```
Google Play account ($25) ──► EAS Android build ──► Internal testing track ──► QA device testing
                                                                                  ▲
Privacy policy hosted URL ──► app.json already done ──► Play Console listing ───┤
                                                                                  │
SME review ≥80% complete ────────────────────────────────────────────────────────┘

iOS App Store (v1.1) ──► Apple Developer paid tier ($99/yr) ──► separate EAS iOS build
```

---

## 6. HISTORICAL CHANGE LOG

All 11 static analysis bugs (BUG-001–011) were found and fixed in May 2026. The critical fixes were:

- **BUG-001**: Onboarding was entirely unlaunchable (default import of named export)
- **BUG-002**: Section screen corrupting hooks state in production builds
- **BUG-003**: SM-2 spaced repetition 100% non-functional since day 1

Full history in `docs/qa/QA_REPORT.md`.

# CCNAQuest — App Store Specialist Brief

**Date:** 19 May 2026
**Role:** App Store Specialist
**Status:** Not yet engaged — engage after legal delivers privacy policy URL

---

## Engagement Trigger

Do not begin App Store Connect setup until:

1. ✅ Bundle identifier confirmed: `com.cawarden.ccnaquest`
2. 🔴 Privacy policy is live at a public URL (Legal Advisor — in progress)
3. 🔴 App icon 1024×1024 PNG delivered (Illustrator — in progress)
4. 🔴 Apple Developer Program membership active (Developer — pending enrolment)

Once all four are true, you can proceed with the full setup below.

---

## App Overview

**Name:** CCNAQuest
**Category:** Education
**Primary audience:** Adults preparing for the Cisco CCNA 200-301 certification exam
**Platform:** iOS first, Android to follow
**Monetisation:** Free (v1.0 — no in-app purchases, no subscriptions)
**Age rating:** 4+ (no objectionable content, no user-generated content)
**Supported languages:** English only (v1.0)
**Offline:** Fully offline. Zero network calls except Sentry crash reporting.

---

## App Store Connect Setup Checklist

### 1. Create the app record

- Sign in to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- New App → iOS
- **Bundle ID:** `com.cawarden.ccnaquest` — must match exactly what the Developer registers with Apple
- **SKU:** `ccnaquest-ios-v1` (internal only, never shown to users)
- **Name:** `CCNAQuest` _(confirm whether Apple permits this — "CCNA" is a Cisco trademark; Legal's recommendation will determine final name)_
- **Primary language:** English (UK) or English (US) — confirm preference with Programme Manager

### 2. App information

| Field              | Value                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| Subtitle           | "Master networking, one spell at a time"                                                                  |
| Category           | Education                                                                                                 |
| Secondary category | Reference                                                                                                 |
| Content rights     | Do you have rights to all content? Yes (with trademark disclaimer — see Legal brief)                      |
| Age rating         | Complete the questionnaire: no violence, no adult content, no gambling, no user data → will resolve to 4+ |

### 3. App Store listing copy

**Description (4000 chars max):**

> _Draft for review — Legal must approve the Cisco trademark disclaimer before finalising._

CCNAQuest turns the Cisco CCNA 200-301 syllabus into a structured, gamified learning path. Study 37 topics across networking fundamentals, routing and switching, security, and modern networking — one lesson at a time.

**How it works:**

- Work through lessons in order, each one building on the last
- Answer multiple choice, fill-in-the-blank, and word-ordering questions
- Earn XP for every completed lesson — perfect scores earn bonus points
- Protect your Hearts — lose one for each wrong answer, they refill daily
- Build a study Streak — study every day to keep the flame burning
- Review system — spaced repetition surfaces questions you've struggled with, right when you need to see them again

**37 topics include:**
Subnetting, OSPF, VLANs, Inter-VLAN routing, ACLs, NAT, STP, EtherChannel, HSRP, DHCP, IPv6, QoS, WAN technologies, wireless networking, cloud computing, network automation, and more.

_CCNAQuest is an independent study aid. CCNA is a registered trademark of Cisco Systems, Inc. CCNAQuest is not affiliated with or endorsed by Cisco._

---

**Keywords (100 chars max, comma-separated):**
`CCNA,networking,Cisco,certification,subnetting,study,flashcards,quiz,OSPF,routing,switching`

_(Confirm final keyword set — cannot repeat words already in the app name or subtitle)_

**Promotional text (170 chars max — can be updated without a new submission):**
`Study for your CCNA with structured lessons, spaced repetition, and daily streaks. 37 topics. Fully offline.`

### 4. Screenshots

Required sizes (iOS):

| Device                                    | Screen size | Count required |
| ----------------------------------------- | ----------- | -------------- |
| iPhone 6.7" (iPhone 15 Pro Max)           | 1290×2796px | 3–10           |
| iPhone 6.5" (iPhone 14 Plus / 13 Pro Max) | 1284×2778px | 3–10           |
| iPad 12.9" (3rd gen or later)             | 2048×2732px | 3–10           |

**Recommended screenshots (in order):**

1. HomeScreen — module list, hearts HUD, XP bar, streak counter
2. SectionScreen — lesson path with completed and active nodes
3. QuizScreen — multiple choice question in progress
4. QuizScreen — fill-in-the-blank question
5. ResultScreen — perfect score with confetti
6. ResultScreen — streak milestone

**Screenshot production note:** The Developer can provide a running build at [localhost:8081](http://localhost:8081) for screen capture, or produce screenshots via the iOS Simulator once a development build is available.

### 5. Privacy nutrition labels

Based on Legal's privacy policy review, the correct labels are:

| Category           | Selection                                                                       |
| ------------------ | ------------------------------------------------------------------------------- |
| Data Not Collected | ✅ — the app collects no data linked to the user or device                      |
| Crash Data         | Collected, not linked to user (Sentry — used for app functionality / analytics) |

**Instruction:** In App Store Connect → App Privacy, select "Data Not Collected" for all personal data categories. For crash data, select "Crash Data" → "App Functionality" → "Not Linked to You". Confirm final selections against the live privacy policy text once Legal delivers it.

### 6. App Review information

| Field              | Value                                                                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sign-in required   | No                                                                                                                                                                                      |
| Notes for reviewer | "CCNAQuest is a fully offline study app. No account is needed. On first launch, an onboarding flow introduces the mechanics. All content and progress is stored locally on the device." |
| Demo account       | N/A                                                                                                                                                                                     |
| Contact info       | Programme Manager email + phone                                                                                                                                                         |

---

## Key Dates

| Milestone                      | Dependency                                           | Target |
| ------------------------------ | ---------------------------------------------------- | ------ |
| App record created             | Apple Developer account active + bundle ID confirmed | Day 8  |
| Listing copy draft for review  | Legal trademark recommendation received              | Day 9  |
| Screenshots delivered          | iOS Simulator / device build available               | Day 10 |
| Privacy labels configured      | Live privacy policy URL from Legal                   | Day 10 |
| App ready for first submission | All of the above + production build                  | Week 3 |

---

## Notes

- Do not submit until the Developer gives a "production build approved" signal — submitting a buggy binary wastes a review slot and restarts the clock
- App Review currently averages 24–48 hours. Plan for 72 hours as a buffer
- If Apple queries the "CCNA" trademark during review, Legal's written disclaimer recommendation is your response evidence

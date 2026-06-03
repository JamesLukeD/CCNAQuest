# CCNAQuest — App Store Specialist Brief

**Last updated:** 2 June 2026
**Role:** App Store Specialist
**Strategy:** Android (Google Play) first — iOS App Store to follow as v1.1

---

## Engagement Trigger

Do not begin Google Play Console setup until:

1. ✅ Package name confirmed: `com.cawarden.ccnaquest`
2. ✅ App icon 512×512 PNG available (`assets/icon.png` — done, resize needed)
3. ✅ Privacy policy live at `https://jamesluked.github.io/CCNAQuest/privacy.html`
4. ✅ Google Play Developer account registered

Once all four are true, proceed below.

---

## App Overview

**Name:** CCNAQuest
**Category:** Education
**Primary audience:** Adults preparing for the Cisco CCNA 200-301 certification exam
**Platform:** Android (Google Play) — iOS to follow
**Monetisation:** Free (v1.0 — no in-app purchases, no subscriptions)
**Content rating:** Everyone (no objectionable content, no user-generated content)
**Supported languages:** English only (v1.0)
**Offline:** Fully offline. Zero network calls except Sentry crash reporting.

---

## Google Play Console Setup Checklist

### 1. Create the app record

- Sign in to [play.google.com/console](https://play.google.com/console)
- **Create app** → Free → App → English (UK or US — confirm with PM)
- **Package name:** `com.cawarden.ccnaquest` — must match exactly what is in `app.json`
- Declare: app is free, does not target children primarily

### 2. Store listing

| Field              | Value                                                                              |
| ------------------ | ---------------------------------------------------------------------------------- |
| App name           | `CCNAQuest`                                                                        |
| Short description  | `Study for your CCNA with lessons, quizzes, and spaced repetition.` (80 chars max) |
| Full description   | See draft below (4000 chars max)                                                   |
| App icon           | 512×512px PNG — resize `assets/icon.png`                                           |
| Feature graphic    | 1024×500px JPG or PNG — full-bleed banner (needs creating)                         |
| Category           | Education                                                                          |
| Email              | jamesdaglessbsc@hotmail.com                                                        |
| Privacy policy URL | `https://jamesluked.github.io/CCNAQuest/privacy.html`                              |

**Full description draft:**

> _Legal must approve the Cisco trademark disclaimer before finalising._

CCNAQuest turns the Cisco CCNA 200-301 syllabus into a structured, gamified learning path. Study 37 topics across networking fundamentals, routing and switching, security, and modern networking — one lesson at a time.

**How it works:**

- Work through lessons in order, each one building on the last
- Answer multiple choice, fill-in-the-blank, true/false, and word-bank questions
- Earn XP for every completed lesson — perfect scores earn bonus points
- Protect your Hearts — lose one for each wrong answer, they refill daily
- Build a study Streak — study every day to keep the flame burning
- Review system — spaced repetition surfaces questions you've struggled with, right when you need to see them again

**37 topics include:**
Subnetting, OSPF, VLANs, Inter-VLAN routing, ACLs, NAT, STP, EtherChannel, HSRP, DHCP, IPv6, QoS, WAN technologies, wireless networking, cloud computing, network automation, and more.

_CCNAQuest is an independent study aid. CCNA is a registered trademark of Cisco Systems, Inc. CCNAQuest is not affiliated with or endorsed by Cisco._

### 3. Screenshots

Google Play requires a minimum of 2 phone screenshots, up to 8.

| Type            | Size                                                     | Count |
| --------------- | -------------------------------------------------------- | ----- |
| Phone           | min 320px / max 3840px shortest side, 16:9 or 9:16 ratio | 2–8   |
| Feature graphic | 1024×500px                                               | 1     |

**Recommended screenshots (in order):**

1. HomeScreen — module list, hearts HUD, XP bar, streak counter
2. SectionScreen — lesson path with completed and active nodes
3. QuizScreen — multiple choice question in progress
4. QuizScreen — fill-in-the-blank question
5. ResultScreen — perfect score
6. ResultScreen — streak milestone

**Screenshot production:** Developer runs the app on an Android emulator via `npx expo start` or supplies an internal testing build.

### 4. Content rating

Complete the IARC questionnaire in Play Console:

- No violence, no adult content, no gambling, no user-generated content
- No personal data collected from users (Sentry crash data is anonymous)
- **Expected result:** Everyone (E)

### 5. Data safety form

Google Play requires a Data Safety declaration. Based on the privacy policy:

| Data type       | Collected? | Shared? | Notes                                |
| --------------- | ---------- | ------- | ------------------------------------ |
| Personal info   | No         | —       | No account, no name, no email        |
| Location        | No         | —       | —                                    |
| App activity    | No         | —       | Study progress stored locally only   |
| App info & perf | Yes        | No      | Crash reports via Sentry (anonymous) |

**Instruction:** In Data Safety → declare data is collected only for **App info and performance (Crash logs)**. Mark: collected, not shared, not required for app functionality (optional). All other categories: not collected.

### 6. Release track

Use **Internal testing** track first (up to 100 testers via email, instant publish, no Google review required):

1. Upload the AAB produced by `eas build --platform android --profile production`
2. Add tester email addresses under Internal testing
3. When QA sign-off is complete, **Promote to Production**

---

## iOS App Store — v1.1 (after Android launch)

Revisit once Android is live and stable. Additional requirements:

- Apple Developer Program paid tier ($99/yr)
- iOS-specific screenshots (1290×2796px for iPhone 6.7")
- App Store Connect record with `com.cawarden.ccnaquest` bundle ID
- App Store privacy nutrition labels (separate from Google Play data safety)

---

## Key Dates

| Milestone                       | Dependency                                 |
| ------------------------------- | ------------------------------------------ |
| Google Play account registered  | $25 payment                                |
| App record created              | Account active + package name confirmed    |
| Internal testing build uploaded | EAS production Android build + tester list |
| Listing copy approved           | Legal trademark recommendation received    |
| Feature graphic created         | Designer / Developer                       |
| Screenshots captured            | Android emulator or device build available |
| Data safety form completed      | Privacy policy finalised                   |
| Promoted to production          | QA sign-off + SME review ≥80% + all above  |

---

## Notes

- Do not promote to production until the Developer gives a "QA approved" signal
- Google Play review for new apps typically takes 1–3 days
- If Google queries the "CCNA" trademark, Legal's written disclaimer is the response
- `com.cawarden.ccnaquest` is locked forever once the app is published — it cannot be changed

# CCNAQuest — Legal Advisor Brief

**Date:** 19 May 2026
**Role:** Legal Advisor
**Status:** Not yet engaged — **urgent, blocks submission**

---

## Why This Is Urgent

Apple requires a **live, publicly accessible privacy policy URL** in every App Store submission — including apps that collect no user data. There is no waiver. Without it, the submission is rejected before any human review.

The app cannot go to TestFlight (internal QA) or the App Store until this URL exists and is reachable. Every day this is not started is a day that delays launch.

---

## Scope of Work

Two distinct deliverables are needed:

### Deliverable 1 — Privacy Policy

**What it must cover:**

1. What data the app collects — _Answer: none. The app stores all progress data locally on the user's device using AsyncStorage. No data is transmitted to any server._
2. What third-party services are used — _Answer: Sentry (crash reporting, activated only in production builds). Sentry's privacy policy URL is [sentry.io/privacy](https://sentry.io/privacy)._
3. Whether the app is directed at children — _Answer: No. The target audience is adults preparing for a professional certification exam._
4. GDPR / UK GDPR compliance statement — _The app collects no personal data, so obligations are minimal, but the policy must say so explicitly._
5. Contact information for privacy enquiries

**Format:** Plain English. Single page. No legalese where avoidable — Apple's review team will read this, and so will users.

**Hosting:** Once drafted, it must be hosted at a live, stable URL before App Store Connect can be configured. Options in order of preference:

- A dedicated `privacy.cawarden.com` or similar subdomain
- A GitHub Pages URL (free, fast to set up)
- A Notion public page (acceptable but fragile — Notion can enforce login)

The URL will be embedded in the app binary and the App Store listing. It cannot change after submission without a re-submission.

---

### Deliverable 2 — Trademark Review

The app is named **CCNAQuest**. "CCNA" is a registered certification trademark owned by Cisco Systems.

**Questions to answer:**

1. Is the use of "CCNA" in the app name nominative fair use (referring to the certification that the app helps students prepare for)?
2. Does the App Store listing require a disclaimer? If so, draft the exact wording. Typical form: _"CCNA is a registered trademark of Cisco Systems, Inc. CCNAQuest is not affiliated with or endorsed by Cisco."_
3. Is the name "CCNAQuest" (as one word) preferable to "CCNA Quest" (two words) from a trademark risk perspective?
4. Are there any existing apps or products using "CCNAQuest" that require clearance?

**Reference:** Cisco's trademark guidelines are at [cisco.com/c/en/us/about/legal/trademarks.html](https://www.cisco.com/c/en/us/about/legal/trademarks.html)

---

## What the App Does (Context for You)

CCNAQuest is an offline mobile flashcard and quiz application. Users study networking concepts organised across 37 lessons covering the Cisco CCNA 200-301 exam syllabus. All content is stored in static files in the app binary — there is no backend, no user accounts, no network calls (except Sentry crash reports in production builds).

**Data stored on device:**

- Lesson completion status (which lessons are done)
- XP points (a local score counter)
- Study streak (days studied consecutively)
- Hearts (a lives counter, resets daily)
- SM-2 spaced repetition state (timestamps and quality scores per question)

None of this data leaves the device. There is no sync, no cloud backup, no analytics beyond crash reporting.

---

## Deliverable Format

| Item                     | Format                                                                       | Deadline |
| ------------------------ | ---------------------------------------------------------------------------- | -------- |
| Privacy policy draft     | Word/Google Doc for review, then final as plain HTML or Markdown for hosting | Day 3    |
| Trademark recommendation | Written memo — yes/no on fair use, recommended disclaimer text if needed     | Day 3    |
| Live privacy policy URL  | URL that resolves to the hosted policy                                       | Day 5    |

---

## Handoff to Developer

Once you have a live URL and the trademark recommendation, provide:

1. The privacy policy URL → developer adds it to `app.json` and App Store Connect
2. The approved disclaimer text → App Store Specialist uses it in the listing description

Contact the Programme Manager to schedule the handoff call.

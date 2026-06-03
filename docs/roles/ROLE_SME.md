# CCNAQuest — CCNA SME Brief

**Last updated:** 2 June 2026
**Role:** CCNA Subject Matter Expert
**Status:** All 37 sections written across all 4 modules — awaiting SME accuracy review. None reviewed yet.

---

## What You Are Reviewing

CCNAQuest contains **37 lessons** covering the full Cisco CCNA 200-301 exam syllabus, organised into 4 modules. Each lesson is a TypeScript data file containing teach cards (explanatory content) and quiz questions.

Your job is to verify that **every factual claim, diagram description, question, and answer is accurate** against the current CCNA 200-301 exam blueprint and industry-standard networking knowledge.

**This is the only workstream that cannot be redone after launch.** If the app ships with factual errors and a student fails their exam because they studied incorrect material, the reputational damage is permanent. QA, legal, and store setup can all be iterated. Content accuracy cannot.

---

## The 37 Sections

### Module 1 — Fundamentals (10 sections) — **Written, awaiting SME review**

| Section ID  | Title                       | Status                 |
| ----------- | --------------------------- | ---------------------- |
| `section1`  | Host-to-Host Communications | ⏳ Awaiting SME review |
| `section2`  | Cisco IOS                   | ⏳ Awaiting SME review |
| `section3`  | The Transport Layer         | ⏳ Awaiting SME review |
| `section4`  | The Network Layer           | ⏳ Awaiting SME review |
| `section5`  | IP Address Classes          | ⏳ Awaiting SME review |
| `section6`  | Subnetting                  | ⏳ Awaiting SME review |
| `section7`  | The Data Link Layer         | ⏳ Awaiting SME review |
| `section8`  | The Physical Layer          | ⏳ Awaiting SME review |
| `section9`  | Cisco Device Functions      | ⏳ Awaiting SME review |
| `section10` | Life of a Packet            | ⏳ Awaiting SME review |

### Module 2 — Routing & Switching (14 sections) — **Written, awaiting SME review**

| Section ID  | Title                        | Status                 |
| ----------- | ---------------------------- | ---------------------- |
| `section11` | Troubleshooting Methodology  | ⏳ Awaiting SME review |
| `section12` | Router & Switch Basics       | ⏳ Awaiting SME review |
| `section13` | Device Management            | ⏳ Awaiting SME review |
| `section14` | Routing Fundamentals         | ⏳ Awaiting SME review |
| `section15` | Dynamic Routing Protocols    | ⏳ Awaiting SME review |
| `section16` | Connectivity Troubleshooting | ⏳ Awaiting SME review |
| `section17` | IGP Fundamentals             | ⏳ Awaiting SME review |
| `section18` | OSPF                         | ⏳ Awaiting SME review |
| `section19` | VLANs                        | ⏳ Awaiting SME review |
| `section20` | Inter-VLAN Routing           | ⏳ Awaiting SME review |
| `section21` | DHCP                         | ⏳ Awaiting SME review |
| `section22` | HSRP                         | ⏳ Awaiting SME review |
| `section23` | STP                          | ⏳ Awaiting SME review |
| `section24` | EtherChannel                 | ⏳ Awaiting SME review |

### Module 3 — Security & Services (9 sections) — **Written, awaiting SME review**

| Section ID  | Title                     | Status                 |
| ----------- | ------------------------- | ---------------------- |
| `section25` | Switch Security           | ⏳ Awaiting SME review |
| `section26` | ACLs                      | ⏳ Awaiting SME review |
| `section27` | NAT                       | ⏳ Awaiting SME review |
| `section28` | IPv6                      | ⏳ Awaiting SME review |
| `section29` | WAN                       | ⏳ Awaiting SME review |
| `section30` | Security Threat Landscape | ⏳ Awaiting SME review |
| `section31` | Cisco Device Security     | ⏳ Awaiting SME review |
| `section32` | Network Device Management | ⏳ Awaiting SME review |
| `section33` | QoS                       | ⏳ Awaiting SME review |

### Module 4 — Modern Networking (4 sections) — **Written, awaiting SME review**

| Section ID  | Title                 | Status                 |
| ----------- | --------------------- | ---------------------- |
| `section34` | Cloud Computing       | ⏳ Awaiting SME review |
| `section35` | Wireless Networking   | ⏳ Awaiting SME review |
| `section36` | Network Automation    | ⏳ Awaiting SME review |
| `section37` | AI & ML in Networking | ⏳ Awaiting SME review |

---

## How to Review

### Step 1 — Read the source files

Each section is in `data/` as a TypeScript file. You do not need to read TypeScript — the structure is readable as plain text. Each file contains:

- `title` — section name
- `lessons` — array of lessons, each with:
  - `title` — lesson name
  - `questions` — array of questions, each with:
    - `type` — `'teach'` (content card), `'mcq'` (multiple choice), `'fill'` (fill in blank), `'tf'` (true/false), `'wordbank'` (drag words to fill blanks)
    - `question` — the question text or teach content
    - `options` / `answer` — answer data depending on type

### Step 2 — Log findings in the review spreadsheet

Use a spreadsheet with these columns:

| Column            | Values                                                 |
| ----------------- | ------------------------------------------------------ |
| Section ID        | e.g. `section6`                                        |
| Lesson title      | e.g. "Subnetting /24 Networks"                         |
| Question #        | Index (1, 2, 3...)                                     |
| Finding type      | ✅ Correct / ⚠️ Minor error / ❌ Wrong / 🚩 Misleading |
| Current content   | Copy the existing text                                 |
| Corrected content | Your replacement text                                  |
| Notes             | Any context, source, or caveat                         |

### Step 3 — Deliver in batches

Do not wait until all 37 sections are reviewed before sending corrections. Deliver in module batches:

- **Batch 1:** Module 1 (sections 1–10) — already in progress
- **Batch 2:** Module 2 (sections 11–24)
- **Batch 3:** Modules 3–4 (sections 25–37)

The developer can start implementing Batch 1 corrections while you work on Batch 2.

---

## Priority Areas

These are the highest-risk areas for factual errors — spend extra time here:

1. **Subnetting** (section 6) — subnet masks, CIDR notation, broadcast/network/host address calculations. Students will use these calculations in the exam and in the field.
2. **OSPF** (section 18) — DR/BDR election, LSA types, area types. This is a dense topic and exam questions are precise.
3. **STP** (section 23) — port states, BPDU behaviour, port roles. Common source of exam confusion.
4. **ACLs** (section 26) — wildcard mask logic, standard vs extended, placement rules (closest to source / destination).
5. **Subnetting IPv6** (section 28) — EUI-64 calculation, prefix notation.

---

## What You Do Not Need to Review

- The app's visual design, UI, or code
- Grammar and spelling (handled by another workstream)
- The order lessons are presented (this is a programme decision, not a content accuracy issue)
- Whether topics are too easy or too hard for the exam level (flag these as notes, but they are not corrections)

---

## Dependency Downstream

QA physical device testing cannot begin until at least **80% of your review is complete** (30 of 37 sections). The QA engineer needs stable content to execute regression tests. Every week the review extends is a week that QA and launch slip.

**Target:** Batches 1 and 2 delivered within 14 days of engagement.

---

## Questions

Contact the Programme Manager with any questions about scope, timeline, or access to source files. The developer can provide a plain-text export of any section on request.

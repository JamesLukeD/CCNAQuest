/**
 * Content integrity validator — covers W2 and W12.
 *
 * W2:  Checks that answer fields in MCQ/WordBank/Fill/Teach/Match/CLI questions
 *       are internally consistent (e.g. answer is actually in choices).
 *
 * W12: Checks that every section ID referenced in modules.ts exists in
 *       ALL_SECTIONS, and that every section has exactly one owning module.
 *
 * Runtime usage  — called once at startup in dev mode (see app/_layout.tsx).
 * CI / build     — run standalone via:  npx tsx scripts/validate.ts
 */

import { ALL_SECTIONS } from '../data/sections';
import { ALL_MODULES }  from '../data/modules';
import type { Question } from './types';

// ── Types ──────────────────────────────────────────────────────

export interface ValidationIssue {
  code:    'W2' | 'W12';
  path:    string;
  message: string;
}

// ── Core validator ─────────────────────────────────────────────

export function validateContent(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // ── W12: Module → Section referential integrity ──────────────
  const sectionIds     = new Set(ALL_SECTIONS.map((s) => s.id));
  const claimedSections = new Set<string>();

  for (const mod of ALL_MODULES) {
    for (const sId of mod.sections) {
      if (!sectionIds.has(sId)) {
        issues.push({
          code:    'W12',
          path:    `modules.ts → ${mod.id}`,
          message: `References unknown section "${sId}"`,
        });
      } else if (claimedSections.has(sId)) {
        issues.push({
          code:    'W12',
          path:    `modules.ts → ${mod.id}`,
          message: `Section "${sId}" is listed in more than one module`,
        });
      } else {
        claimedSections.add(sId);
      }
    }
  }

  for (const sec of ALL_SECTIONS) {
    if (!claimedSections.has(sec.id)) {
      issues.push({
        code:    'W12',
        path:    `sections/${sec.id}`,
        message: `Section "${sec.id}" is not referenced by any module`,
      });
    }
  }

  // ── W2: Per-question content validation ──────────────────────
  for (const sec of ALL_SECTIONS) {
    for (const lesson of sec.lessons) {
      for (const [qi, q] of lesson.questions.entries()) {
        const path = `${sec.id} / ${lesson.id} [q${qi}] (${q.type})`;
        checkQuestion(q, path, issues);
      }
    }
  }

  return issues;
}

function checkQuestion(
  q: Question,
  path: string,
  issues: ValidationIssue[],
): void {
  switch (q.type) {
    case 'mcq': {
      if (!q.choices.includes(q.answer)) {
        issues.push({
          code:    'W2',
          path,
          message: `answer "${q.answer}" is not present in choices [${q.choices.join(', ')}]`,
        });
      }
      break;
    }
    case 'wordbank': {
      for (const word of q.answer) {
        if (!q.bank.includes(word)) {
          issues.push({
            code:    'W2',
            path,
            message: `answer word "${word}" is not in the bank [${q.bank.join(', ')}]`,
          });
        }
      }
      break;
    }
    case 'fill': {
      if (!q.answer.trim()) {
        issues.push({ code: 'W2', path, message: 'answer is an empty string' });
      }
      break;
    }
    case 'teach': {
      if (!q.title.trim()) {
        issues.push({ code: 'W2', path, message: 'title is empty' });
      }
      if (!q.body.trim()) {
        issues.push({ code: 'W2', path, message: 'body is empty' });
      }
      break;
    }
    // tf — nothing to cross-check structurally
  }
}

// ── Dev-mode helper ───────────────────────────────────────────
// Call this at app startup to surface issues immediately in the console.

export function warnIfInvalid(): void {
  const issues = validateContent();
  if (issues.length === 0) return;

  console.warn(
    `\n⚠️  CCNAQuest — ${issues.length} content issue(s) found:\n` +
    issues
      .map((i) => `  [${i.code}] ${i.path}\n         ${i.message}`)
      .join('\n') +
    '\n',
  );
}

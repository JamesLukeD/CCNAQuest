/**
 * Standalone build-time / CI content validator.
 * Run with:  npx tsx scripts/validate.ts
 *
 * Exits 0 on success, 1 on any validation failure.
 */

import { validateContent } from '../lib/validateContent';

const issues = validateContent();

if (issues.length === 0) {
  console.log('✅  All content valid — 0 issues found.');
  process.exit(0);
} else {
  console.error(`\n❌  Content validation failed — ${issues.length} issue(s):\n`);
  for (const issue of issues) {
    console.error(`  [${issue.code}] ${issue.path}`);
    console.error(`         ${issue.message}`);
  }
  console.error('');
  process.exit(1);
}

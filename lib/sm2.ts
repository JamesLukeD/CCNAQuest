import type { SM2Card, Lesson, Section, Question } from './types';

// ── SM-2 algorithm ─────────────────────────────────────────────
// Quality: 4 = correct first try, 3 = correct after re-queue, 1 = wrong

const DEFAULT_CARD: SM2Card = {
  easeFactor: 2.5,
  interval: 1,
  repetitions: 0,
  dueDate: null,
  totalReviews: 0,
  wrongCount: 0,
};

export function isReviewable(q: Question): boolean {
  return q.type !== 'teach';
}

export function isDue(card: SM2Card | undefined): boolean {
  if (!card || !card.dueDate) return true;
  return new Date(card.dueDate) <= new Date();
}

export function updateCard(
  sm2State: Record<string, SM2Card>,
  key: string,
  quality: 1 | 3 | 4
): void {
  const card: SM2Card = sm2State[key]
    ? { ...sm2State[key] }
    : { ...DEFAULT_CARD };

  card.totalReviews += 1;

  if (quality === 1) {
    card.wrongCount += 1;
    card.repetitions = 0;
    card.interval = 1;
  } else {
    // quality 3 or 4
    if (card.repetitions === 0) {
      card.interval = 1;
    } else if (card.repetitions === 1) {
      card.interval = 6;
    } else {
      card.interval = Math.round(card.interval * card.easeFactor);
    }
    card.repetitions += 1;
    const ef = card.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    card.easeFactor = Math.max(1.3, ef);
  }

  const due = new Date();
  due.setDate(due.getDate() + card.interval);
  card.dueDate = due.toISOString();

  sm2State[key] = card;
}

export function getDueCount(
  sm2State: Record<string, SM2Card>,
  section: Section
): number {
  let count = 0;
  for (const lesson of section.lessons) {
    for (const [i, q] of lesson.questions.entries()) {
      if (!isReviewable(q)) continue;
      if (isDue(sm2State[`${lesson.id}:${i}`])) count++;
    }
  }
  return count;
}

export function getLessonDueCount(
  sm2State: Record<string, SM2Card>,
  lesson: Lesson
): number {
  let count = 0;
  for (const [i, q] of lesson.questions.entries()) {
    if (!isReviewable(q)) continue;
    if (isDue(sm2State[`${lesson.id}:${i}`])) count++;
  }
  return count;
}

export function buildReviewLesson(
  sm2State: Record<string, SM2Card>,
  section: Section
): Lesson {
  const questions: Question[] = [];
  for (const lesson of section.lessons) {
    for (const [i, q] of lesson.questions.entries()) {
      if (!isReviewable(q)) continue;
      const key = `${lesson.id}:${i}`;
      if (isDue(sm2State[key])) {
        questions.push({ ...q, _origIdx: i, _reviewKey: key });
      }
    }
  }
  return {
    id: `review-${section.id}`,
    title: 'Review Due Cards',
    icon: '🔁',
    isReview: true,
    questions: questions.slice(0, 20),
  };
}

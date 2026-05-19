// ── Question types ────────────────────────────────────────────
export type QuestionType =
  | 'teach'
  | 'mcq'
  | 'tf'
  | 'fill'
  | 'wordbank'
  | 'match'
  | 'cli'
  | 'topology';

export interface BaseQuestion {
  type: QuestionType;
  /** Populated at runtime — stable index in original lesson array */
  _origIdx?: number;
  /** Set on SM-2 review questions — "lessonId:origIdx" */
  _reviewKey?: string;
}

export interface TeachQuestion extends BaseQuestion {
  type: 'teach';
  title: string;
  body: string;
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  question: string;
  choices: string[];
  answer: string;
  explanation?: string;
}

export interface TFQuestion extends BaseQuestion {
  type: 'tf';
  question: string;
  answer: boolean;
  explanation?: string;
}

export interface FillQuestion extends BaseQuestion {
  type: 'fill';
  question: string;
  answer: string;
  explanation?: string;
}

export interface WordBankQuestion extends BaseQuestion {
  type: 'wordbank';
  question: string;
  bank: string[];
  answer: string[];
  explanation?: string;
}

export interface MatchPair {
  left: string;
  right: string;
}
export interface MatchQuestion extends BaseQuestion {
  type: 'match';
  question: string;
  pairs: MatchPair[];
}

export interface CLIQuestion extends BaseQuestion {
  type: 'cli';
  prompt: string;
  accepted: string[];
  explanation?: string;
}

export interface TopologyLabel {
  id: string;
  label: string;
  options: string[];
  answer: string;
}
export interface TopologyQuestion extends BaseQuestion {
  type: 'topology';
  question: string;
  imageUrl?: string;
  labels: TopologyLabel[];
  explanation?: string;
}

export type Question =
  | TeachQuestion
  | MCQQuestion
  | TFQuestion
  | FillQuestion
  | WordBankQuestion
  | MatchQuestion
  | CLIQuestion
  | TopologyQuestion;

// ── Lesson / Section / Module ────────────────────────────────
export interface Lesson {
  id: string;
  title: string;
  icon: string;
  questions: Question[];
  /** Set to true for virtual SM-2 review lessons */
  isReview?: boolean;
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  unlockAfter: string | null;
  lessons: Lesson[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  sections: string[]; // section ids
}

// ── Persistence ──────────────────────────────────────────────
export interface SM2Card {
  easeFactor: number;
  interval: number;
  repetitions: number;
  dueDate: string | null;
  totalReviews: number;
  wrongCount: number;
}

export interface LessonRecord {
  done: boolean;
  perfect: boolean;
}

export interface AppState {
  xp: number;
  streak: number;
  hearts: number;
  lastPlayed: string | null;
  completed: Record<string, LessonRecord>;
  sm2: Record<string, SM2Card>;
  /** Ephemeral — holds the SM-2 review lesson built in SectionScreen so QuizScreen
   *  can read it from state instead of deserialising it from a URL param (W9). */
  pendingReview: Lesson | null;
  /** True after loadState() resolves — prevents flash-redirect on first render. */
  hasLoaded: boolean;
  /** Set to true on first launch until onboarding is completed. */
  onboardingComplete: boolean;
  /** Set to true in loadState() when lastPlayed is 2+ days ago and streak > 0. */
  streakBroken: boolean;
  /** The highest streak milestone (7/14/30/60/100) that has been celebrated. */
  lastStreakMilestoneCelebrated: number;
}

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import type { AppState, SM2Card } from './types';
import { updateCard as sm2UpdateCard } from './sm2';

const STORAGE_KEY   = 'ccna_quest_v3'; // key unchanged — migration is handled in-value
const SCHEMA_VERSION = 5;              // bump this whenever AppState shape changes
const MAX_HEARTS = 5;

const DEFAULT_STATE: AppState = {
  xp: 0,
  streak: 0,
  hearts: MAX_HEARTS,
  lastPlayed: null,
  completed: {},
  sm2: {},
  pendingReview: null,
  hasLoaded: false,
  onboardingComplete: false,
  streakBroken: false,
  lastStreakMilestoneCelebrated: 0,
};

interface Store extends AppState {
  // Actions
  loadState: () => Promise<void>;
  completeLesson: (lessonId: string, perfect: boolean, wrongCount: number) => { streakIncremented: boolean; xpEarned: number };
  updateSM2: (key: string, quality: 1 | 3 | 4) => void;
  resetHearts: () => void;
  loseHeart: () => void;
  addXP: (amount: number) => void;
  setPendingReview: (lesson: AppState['pendingReview']) => void;
  completeOnboarding: () => void;
  clearStreakBroken: () => void;
  celebrateStreakMilestone: (milestone: number) => void;
  touchStreak: () => void;
}

export const useStore = create<Store>((set, get) => ({
  ...DEFAULT_STATE,

  loadState: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const base = raw ? migrate(JSON.parse(raw) as Record<string, any>) : {};
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86_400_000).toDateString();
      const loaded = { ...DEFAULT_STATE, ...base };

      // B1: Auto-refill hearts when a new day has started.
      if (loaded.lastPlayed !== today) {
        loaded.hearts = MAX_HEARTS;
      }

      // B4: Detect broken streak on open.
      if (
        loaded.streak > 0 &&
        loaded.lastPlayed !== null &&
        loaded.lastPlayed !== today &&
        loaded.lastPlayed !== yesterday
      ) {
        loaded.streakBroken = true;
      }

      set({ ...loaded, hasLoaded: true, pendingReview: null });
    } catch {
      // First launch or corrupt data — use defaults.
      set({ ...DEFAULT_STATE, hasLoaded: true });
    }
  },

  completeLesson: (lessonId, perfect, wrongCount) => {
    const state = get();
    const completed = { ...state.completed };
    if (!completed[lessonId]) {
      completed[lessonId] = { done: true, perfect };
    } else if (perfect) {
      completed[lessonId] = { ...completed[lessonId], perfect: true };
    }

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86_400_000).toDateString();
    let { streak, lastPlayed } = state;
    let streakIncremented = false;
    if (lastPlayed !== today) {
      streak = lastPlayed === yesterday ? streak + 1 : 1;
      lastPlayed = today;
      streakIncremented = true;
    }

    const xpEarned = wrongCount === 0 ? 20 : Math.max(5, 10 - wrongCount * 2);
    const xp = state.xp + xpEarned;
    set({ completed, streak, lastPlayed, xp });
    _persist(get());
    return { streakIncremented, xpEarned };
  },

  updateSM2: (key, quality) => {
    const sm2 = { ...get().sm2 } as Record<string, SM2Card>;
    sm2UpdateCard(sm2, key, quality);
    set({ sm2 });
    _persist(get());
  },

  resetHearts: () => {
    // B2: Refill to MAX_HEARTS, not a hardcoded 3.
    set({ hearts: MAX_HEARTS });
    _persist(get());
  },

  loseHeart: () => {
    const hearts = Math.max(0, get().hearts - 1);
    set({ hearts });
    _persist(get());
  },

  addXP: (amount) => {
    const xp = get().xp + amount;
    set({ xp });
    _persist(get());
  },

  setPendingReview: (lesson) => {
    // Not persisted — ephemeral navigation state only.
    set({ pendingReview: lesson });
  },

  completeOnboarding: () => {
    const today = new Date().toDateString();
    set({ onboardingComplete: true, lastPlayed: today });
    _persist(get());
  },

  clearStreakBroken: () => {
    set({ streakBroken: false });
    // Not persisted — this is a transient UI flag.
  },

  touchStreak: () => {
    const state = get();
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86_400_000).toDateString();
    if (state.lastPlayed !== today) {
      const streak = state.lastPlayed === yesterday ? state.streak + 1 : 1;
      set({ streak, lastPlayed: today });
      _persist(get());
    }
  },

  celebrateStreakMilestone: (milestone) => {
    set({ lastStreakMilestoneCelebrated: milestone });
    _persist(get());
  },
}));

function _persist(state: AppState) {
  const { xp, streak, hearts, lastPlayed, completed, sm2, onboardingComplete, lastStreakMilestoneCelebrated } = state;
  // pendingReview, hasLoaded, streakBroken are intentionally excluded — ephemeral.
  AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ _v: SCHEMA_VERSION, xp, streak, hearts, lastPlayed, completed, sm2, onboardingComplete, lastStreakMilestoneCelebrated }),
  ).catch((err: unknown) => {
    Sentry.captureException(err, { tags: { source: '_persist' } });
    console.error('[_persist] AsyncStorage write failed:', err);
  });
}

// ── Migration runner ───────────────────────────────────────────
// Each `if (version < N)` block runs exactly once when a user upgrades.
// Always mutate `state` in-place within the block, never skip versions.

function migrate(raw: Record<string, any>): AppState {
  const version: number = raw._v ?? 3; // legacy saves have no _v field
  const state: Record<string, any> = { ...raw };

  // v3 → v4: No breaking schema changes; baseline version tracking established.
  if (version < 4) {
    if (typeof state.hearts !== 'number' || state.hearts < 0) {
      state.hearts = MAX_HEARTS;
    }
  }

  // v4 → v5: Add onboardingComplete, lastStreakMilestoneCelebrated.
  if (version < 5) {
    // Existing users have already seen the app — skip onboarding.
    state.onboardingComplete = state.onboardingComplete ?? true;
    state.lastStreakMilestoneCelebrated = state.lastStreakMilestoneCelebrated ?? 0;
  }

  // Strip the internal version key before spreading into AppState.
  delete state._v;
  // pendingReview is never persisted; always start null.
  return { ...DEFAULT_STATE, ...state, pendingReview: null } as AppState;
}

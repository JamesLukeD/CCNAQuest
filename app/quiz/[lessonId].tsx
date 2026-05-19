import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View, Text, Pressable, ScrollView, TextInput,
  StyleSheet, Dimensions, Animated, Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ALL_SECTIONS } from '../../data/sections';
import { useStore } from '../../lib/store';
import { BG, SURFACE_1, BORDER, RADIUS, MUTED } from '../../lib/theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import type {
  Question, TeachQuestion, MCQQuestion, TFQuestion,
  FillQuestion, WordBankQuestion,
} from '../../lib/types';

const { width: SCREEN_W } = Dimensions.get('window');

// ── Helpers ────────────────────────────────────────────────────
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type AnswerState = 'idle' | 'correct' | 'wrong';

// ── Main component ─────────────────────────────────────────────
export default function QuizScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeLesson, loseHeart, updateSM2, touchStreak, hearts, pendingReview, setPendingReview } = useStore();
  const sm2 = useStore((s) => s.sm2);

  // Clean up pending review when this screen unmounts.
  useEffect(() => {
    return () => { if (pendingReview) setPendingReview(null); };
  }, []);

  // Resolve lesson from store (review) or static data (regular).
  const lesson = React.useMemo(() => {
    if (lessonId?.startsWith('review-')) {
      return pendingReview;
    }
    const [sectionId, lId] = (lessonId ?? '').split(':');
    const sec = ALL_SECTIONS.find((s) => s.id === sectionId);
    const found = sec?.lessons.find((l) => l.id === lId) ?? null;
    if (!found) return null;
    return {
      ...found,
      questions: found.questions.map((q, i) => ({ ...q, _origIdx: i })),
    };
  }, [lessonId, pendingReview]);

  const [qIndex, setQIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [wrongCount, setWrongCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  // Per-question state
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [fillInput, setFillInput] = useState('');
  const [wordBankSelected, setWordBankSelected] = useState<string[]>([]);
  // Track if first attempt for SM-2
  const firstAttemptRef = useRef(true);
  // Shake animation for empty fill-input submit (U6)
  const shakeAnim = useRef(new Animated.Value(0)).current;
  function doShake() {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -10, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  10, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  -8, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:   8, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:   0, duration: 55, useNativeDriver: true }),
    ]).start();
  }

  // Shuffle MCQ choices unconditionally (hooks must not be called conditionally)
  const shuffledChoices = React.useMemo(() => {
    if (!lesson) return [];
    const questions: Question[] = lesson.questions;
    const q = questions[qIndex];
    if (q?.type === 'mcq') return shuffleArray((q as MCQQuestion).choices);
    return [];
  }, [lesson, qIndex]);

  if (!lesson) {
    return (
      <View style={[styles.root, styles.center, { paddingHorizontal: 32, paddingTop: insets.top + 20 }]}>
        <Image
          source={require('../../assets/animations/frog/incorrect.png')}
          style={{ width: 160, height: 160, marginBottom: 24 }}
          resizeMode="contain"
        />
        <Text style={styles.errorText}>This incantation could not be found.</Text>
        <Text style={{ fontSize: 15, color: MUTED, textAlign: 'center', marginBottom: 28, lineHeight: 22 }}>
          Let’s head back and try again.
        </Text>
        <PrimaryButton label="← Back" onPress={() => router.back()} variant="secondary" />
      </View>
    );
  }

  const questions: Question[] = lesson.questions;
  const q = questions[qIndex];
  const progress = (qIndex + 1) / questions.length;

  function resetQuestionState() {
    setSelectedChoice(null);
    setFillInput('');
    setWordBankSelected([]);
    setAnswerState('idle');
    firstAttemptRef.current = true;
  }

  function advance() {
    if (qIndex + 1 >= questions.length) {
      // Lesson complete
      const [sectionId] = (lessonId ?? '').split(':');
      const perfect = wrongCount === 0;
      let streakUp = false;
      let xpEarned = 0;
      if (!lesson?.isReview) {
        const result = completeLesson(`${sectionId}:${lesson.id}`, perfect, wrongCount);
        streakUp = result.streakIncremented;
        xpEarned = result.xpEarned;
      } else {
        touchStreak();
      }
      router.replace({
        pathname: '/result',
        params: {
          lessonTitle: lesson.title,
          correct: String(correctCount),
          wrong: String(wrongCount),
          total: String(questions.filter((q) => q.type !== 'teach').length),
          streakUp: streakUp ? '1' : '0',
          isReview: lesson?.isReview ? '1' : '0',
          xpEarned: String(xpEarned),
        },
      });
      return;
    }
    resetQuestionState();
    setQIndex((i) => i + 1);
  }

  function handleCorrect() {
    const quality = firstAttemptRef.current ? 4 : 3;
    if (q._reviewKey) updateSM2(q._reviewKey, quality);
    else if (q._origIdx !== undefined) {
      const [sectionId, lId] = (lessonId ?? '').split(':');
      updateSM2(`${lId}:${q._origIdx}`, quality);
    }
    setCorrectCount((c) => c + 1);
    setAnswerState('correct');
  }

  function handleWrong() {
    if (firstAttemptRef.current) {
      firstAttemptRef.current = false;
      if (q._reviewKey) updateSM2(q._reviewKey, 1);
      else if (q._origIdx !== undefined) {
        const [, lId] = (lessonId ?? '').split(':');
        updateSM2(`${lId}:${q._origIdx}`, 1);
      }
      setWrongCount((w) => w + 1);
      loseHeart();
    }
    setAnswerState('wrong');
  }

  // ── Teach slide ──────────────────────────────────────────────
  if (q.type === 'teach') {
    const tq = q as TeachQuestion;
    return (
      <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ProgressBar progress={progress} />
        <ScrollView contentContainerStyle={styles.questionContent}>
          <Text style={styles.teachLabel}>📖 LEARN</Text>
          <Text style={styles.teachTitle}>{tq.title}</Text>
          <Text style={styles.teachBody}>{tq.body}</Text>
        </ScrollView>
        <View style={styles.footer}>
          <PrimaryButton label="Got it →" onPress={advance} />
        </View>
      </View>
    );
  }

  // ── MCQ ──────────────────────────────────────────────────────
  if (q.type === 'mcq') {
    const mq = q as MCQQuestion;
    const shuffled = shuffledChoices;
    return (
      <QuestionShell
        progress={progress}
        question={mq.question}
        insets={insets}
        answerState={answerState}
        explanation={mq.explanation}
        onContinue={advance}
      >
        {shuffled.map((choice) => {
          const isSelected = selectedChoice === choice;
          const color = !isSelected ? '#2a3a4a'
            : answerState === 'correct' ? '#58cc02'
            : answerState === 'wrong' ? '#ff4b4b'
            : '#1cb0f6';
          return (
            <Pressable
              key={choice}
              style={[styles.choiceBtn, { borderColor: color, backgroundColor: color + '22' }]}
              onPress={() => {
                if (answerState !== 'idle') return;
                setSelectedChoice(choice);
                if (choice === mq.answer) handleCorrect();
                else handleWrong();
              }}
            >
              <Text style={[styles.choiceText, isSelected && { color: '#ffffff' }]}>{choice}</Text>
            </Pressable>
          );
        })}
      </QuestionShell>
    );
  }

  // ── True/False ───────────────────────────────────────────────
  if (q.type === 'tf') {
    const tq = q as TFQuestion;
    return (
      <QuestionShell
        progress={progress}
        question={tq.question}
        insets={insets}
        answerState={answerState}
        explanation={tq.explanation}
        onContinue={advance}
      >
        {(['True', 'False'] as const).map((opt) => {
          const val = opt === 'True';
          const isSelected = selectedChoice === opt;
          const color = !isSelected ? '#2a3a4a'
            : answerState === 'correct' ? '#58cc02'
            : answerState === 'wrong' ? '#ff4b4b'
            : '#1cb0f6';
          return (
            <Pressable
              key={opt}
              style={[styles.choiceBtn, { borderColor: color, backgroundColor: color + '22' }]}
              onPress={() => {
                if (answerState !== 'idle') return;
                setSelectedChoice(opt);
                if (val === tq.answer) handleCorrect();
                else handleWrong();
              }}
            >
              <Text style={[styles.choiceText, isSelected && { color: '#ffffff' }]}>
                {opt === 'True' ? '✅ True' : '❌ False'}
              </Text>
            </Pressable>
          );
        })}
      </QuestionShell>
    );
  }

  // ── Fill in the blank ────────────────────────────────────────
  if (q.type === 'fill') {
    const fq = q as FillQuestion;
    return (
      <QuestionShell
        progress={progress}
        question={fq.question}
        insets={insets}
        answerState={answerState}
        explanation={fq.explanation}
        onContinue={advance}
      >
        <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
          <TextInput
            style={[
              styles.fillInput,
              answerState === 'correct' && styles.fillCorrect,
              answerState === 'wrong' && styles.fillWrong,
            ]}
            value={fillInput}
            onChangeText={setFillInput}
            placeholder="Type your answer…"
            placeholderTextColor="#7f8fa6"
            editable={answerState === 'idle'}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={() => {
              if (answerState !== 'idle') return;
              if (!fillInput.trim()) { doShake(); return; }
              const correct = fillInput.trim().toLowerCase() === fq.answer.toLowerCase();
              if (correct) handleCorrect();
              else handleWrong();
            }}
          />
        </Animated.View>
        {answerState === 'idle' && (
          <PrimaryButton
            label="Check"
            onPress={() => {
              if (!fillInput.trim()) { doShake(); return; }
              const correct = fillInput.trim().toLowerCase() === fq.answer.toLowerCase();
              if (correct) handleCorrect();
              else handleWrong();
            }}
          />
        )}
      </QuestionShell>
    );
  }

  // ── Word bank ────────────────────────────────────────────────
  if (q.type === 'wordbank') {
    const wq = q as WordBankQuestion;
    const remaining = wq.bank.filter((w) => !wordBankSelected.includes(w));
    return (
      <QuestionShell
        progress={progress}
        question={wq.question}
        insets={insets}
        answerState={answerState}
        explanation={wq.explanation}
        onContinue={advance}
      >
        {/* Answer area */}
        <View style={styles.wbAnswerArea}>
          {wq.answer.map((_, slot) => {
            const filled = wordBankSelected[slot];
            const stateColor = answerState === 'correct' ? '#58cc02' : answerState === 'wrong' ? '#ff4b4b' : '#1cb0f6';
            return (
              <Pressable
                key={slot}
                style={[styles.wbSlot, filled && { borderColor: stateColor }]}
                onPress={() => {
                  if (answerState !== 'idle' || !filled) return;
                  setWordBankSelected((prev) => prev.filter((_, i) => i !== slot));
                }}
              >
                <Text style={styles.wbSlotText}>{filled ?? ''}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Bank chips */}
        <View style={styles.wbBank}>
          {remaining.map((word) => (
            <Pressable
              key={word}
              style={styles.wbChip}
              onPress={() => {
                if (answerState !== 'idle') return;
                const next = [...wordBankSelected, word];
                setWordBankSelected(next);
                if (next.length === wq.answer.length) {
                  const correct = next.every((w, i) => w === wq.answer[i]);
                  if (correct) handleCorrect();
                  else handleWrong();
                }
              }}
            >
              <Text style={styles.wbChipText}>{word}</Text>
            </Pressable>
          ))}
        </View>

        {answerState === 'wrong' && (
          <Pressable
            style={styles.retryBtn}
            onPress={() => {
              setWordBankSelected([]);
              setAnswerState('idle');
            }}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        )}
      </QuestionShell>
    );
  }

  // ── Fallback (unsupported types) ─────────────────────────────
  const _exhaustiveCheck: never = q as never;
  void _exhaustiveCheck;
  return (
    <View style={[styles.root, styles.center]}>
      <Text style={styles.errorText}>Question type "{(q as any).type}" not yet supported.</Text>
      <PrimaryButton label="Skip" onPress={advance} variant="secondary" />
    </View>
  );
}

// ── Sub-components ─────────────────────────────────────────────
function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={pbStyles.track}>
      <View style={[pbStyles.fill, { width: `${progress * 100}%` as any }]} />
    </View>
  );
}

const pbStyles = StyleSheet.create({
  track: { height: 8, backgroundColor: BORDER, marginHorizontal: 20, marginTop: 12, marginBottom: 8, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#58cc02', borderRadius: 4 },
});

interface ShellProps {
  progress: number;
  question: string;
  insets: { top: number; bottom: number };
  answerState: AnswerState;
  explanation?: string;
  onContinue: () => void;
  children: React.ReactNode;
}

function QuestionShell({ progress, question, insets, answerState, explanation, onContinue, children }: ShellProps) {
  const feedbackColor = answerState === 'correct' ? '#58cc02' : '#ff4b4b';
  const feedbackLabel = answerState === 'correct' ? '✓ Correct!' : '✗ Incorrect';

  const flashAnim = useRef(new Animated.Value(0)).current;
  const frogScale = useRef(new Animated.Value(0)).current;
  const frogY = useRef(new Animated.Value(120)).current;
  const frogX = useRef(new Animated.Value(0)).current;
  const frogBob = useRef(new Animated.Value(0)).current;
  const frogYTotal = useRef(Animated.add(frogY, frogBob)).current;

  useEffect(() => {
    if (answerState !== 'idle') {
      // Screen flash
      flashAnim.setValue(0);
      Animated.sequence([
        Animated.timing(flashAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
        Animated.timing(flashAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();

      // Frog entrance: scale up + slide in from below
      frogScale.setValue(0);
      frogY.setValue(120);
      frogX.setValue(0);
      frogBob.setValue(0);

      Animated.parallel([
        Animated.spring(frogScale, { toValue: 1, friction: 4, tension: 150, useNativeDriver: true }),
        Animated.spring(frogY, { toValue: 0, friction: 6, tension: 100, useNativeDriver: true }),
      ]).start(() => {
        if (answerState === 'correct') {
          Animated.loop(
            Animated.sequence([
              Animated.timing(frogBob, { toValue: -16, duration: 380, useNativeDriver: true }),
              Animated.timing(frogBob, { toValue: 0, duration: 380, useNativeDriver: true }),
            ])
          ).start();
        }
      });

      if (answerState === 'wrong') {
        setTimeout(() => {
          Animated.sequence([
            Animated.timing(frogX, { toValue: -18, duration: 55, useNativeDriver: true }),
            Animated.timing(frogX, { toValue: 18, duration: 55, useNativeDriver: true }),
            Animated.timing(frogX, { toValue: -14, duration: 55, useNativeDriver: true }),
            Animated.timing(frogX, { toValue: 14, duration: 55, useNativeDriver: true }),
            Animated.timing(frogX, { toValue: 0, duration: 55, useNativeDriver: true }),
          ]).start();
        }, 200);
      }
    } else {
      frogScale.setValue(0);
      frogBob.setValue(0);
      frogX.setValue(0);
    }
  }, [answerState]);

  const flashOpacity = flashAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.22] });

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { backgroundColor: feedbackColor, opacity: flashOpacity }]}
        pointerEvents="none"
      />
      <ProgressBar progress={progress} />
      <ScrollView contentContainerStyle={styles.questionContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.questionText}>{question}</Text>
        <View style={styles.choicesContainer}>{children}</View>
      </ScrollView>

      {answerState !== 'idle' && (
        <>
          {/* Big frog centered above feedback bar */}
          <Animated.View style={styles.frogOverlay} pointerEvents="none">
            <Animated.Image
              source={answerState === 'correct'
                ? require('../../assets/animations/frog/celebrate.png')
                : require('../../assets/animations/frog/incorrect.png')}
              style={[
                styles.frogBig,
                {
                  transform: [
                    { scale: frogScale },
                    { translateY: frogYTotal },
                    { translateX: frogX },
                  ],
                },
              ]}
              resizeMode="contain"
            />
          </Animated.View>

          <View style={[styles.feedbackBar, { borderColor: feedbackColor }]}>
            <Text style={[styles.feedbackLabel, { color: feedbackColor }]}>{feedbackLabel}</Text>
            {explanation ? <Text style={styles.feedbackExplanation}>{explanation}</Text> : null}
            <PrimaryButton label="Continue" color={feedbackColor} onPress={onContinue} />
          </View>
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  center: { justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { color: '#ff4b4b', fontSize: 16, marginBottom: 16, textAlign: 'center' },
  backText: { color: '#1cb0f6', fontSize: 16 },

  // Teach
  teachLabel: { fontSize: 12, fontWeight: '700', color: '#1cb0f6', letterSpacing: 1.2, marginBottom: 10 },
  teachTitle: { fontSize: 22, fontWeight: '800', color: '#ffffff', marginBottom: 16 },
  teachBody: { fontSize: 16, color: '#c8d8e8', lineHeight: 26 },

  // Shell
  questionContent: { padding: 20, paddingBottom: 8 },
  questionText: { fontSize: 20, fontWeight: '700', color: '#ffffff', lineHeight: 28, marginBottom: 20 },
  choicesContainer: { gap: 10 },
  feedbackBar: {
    padding: 20, borderTopWidth: 2, backgroundColor: SURFACE_1,
  },
  feedbackLabel: { fontSize: 18, fontWeight: '800', marginBottom: 6 },
  feedbackExplanation: { fontSize: 14, color: '#c8d8e8', marginBottom: 14, lineHeight: 22 },
  frogOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frogBig: {
    width: 260,
    height: 260,
  },

  // MCQ / TF choices
  choiceBtn: {
    borderWidth: 2, borderRadius: RADIUS.sm, padding: 14,
  },
  choiceText: { fontSize: 16, color: '#c8d8e8', fontWeight: '600' },

  // Fill
  fillInput: {
    backgroundColor: SURFACE_1, borderWidth: 2, borderColor: BORDER,
    borderRadius: RADIUS.sm, padding: 14, color: '#ffffff', fontSize: 16,
    marginBottom: 12,
  },
  fillCorrect: { borderColor: '#58cc02' },
  fillWrong: { borderColor: '#ff4b4b' },

  // WordBank
  wbAnswerArea: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  wbSlot: {
    minWidth: 80, height: 40, borderBottomWidth: 2, borderColor: '#1cb0f6',
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10,
  },
  wbSlotText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
  wbBank: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  wbChip: {
    backgroundColor: SURFACE_1, borderWidth: 2, borderColor: BORDER,
    borderRadius: RADIUS.lg, paddingHorizontal: 14, paddingVertical: 8,
  },
  wbChipText: { color: '#c8d8e8', fontSize: 14, fontWeight: '600' },
  retryBtn: { marginTop: 8, alignSelf: 'flex-start' },
  retryText: { color: '#ff9600', fontSize: 15, fontWeight: '700' },

  // Footer
  footer: { padding: 20 },
});

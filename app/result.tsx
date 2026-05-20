import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet,
  Animated, Dimensions, Image, Platform, Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useStore } from '../lib/store';
import { ALL_SECTIONS } from '../data/sections';
import { BG, SURFACE_1, BORDER, MUTED, RADIUS, SPACING } from '../lib/theme';
import { PrimaryButton } from '../components/PrimaryButton';

const { width: W, height: H } = Dimensions.get('window');
const CONFETTI_COLORS = ['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff', '#ff9600'];

// Pure-JS confetti fallback (web or as overlay)
function Confetti() {
  const particles = useRef(
    Array.from({ length: 50 }, (_, i) => ({
      x: new Animated.Value(Math.random() * W),
      y: new Animated.Value(-20 - Math.random() * 100),
      rot: new Animated.Value(0),
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 7 + Math.random() * 9,
      delay: Math.random() * 400,
    }))
  ).current;

  useEffect(() => {
    const anims = particles.map((p) =>
      Animated.parallel([
        Animated.timing(p.y, {
          toValue: H + 30,
          duration: 2000 + Math.random() * 1200,
          delay: p.delay,
          useNativeDriver: true,
        }),
        Animated.timing(p.rot, {
          toValue: 6,
          duration: 2200 + Math.random() * 1000,
          delay: p.delay,
          useNativeDriver: true,
        }),
      ])
    );
    Animated.stagger(10, anims).start();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            width: p.size, height: p.size,
            borderRadius: p.size < 10 ? 2 : p.size / 2,
            backgroundColor: p.color,
            transform: [
              { translateX: p.x },
              { translateY: p.y },
              { rotate: p.rot.interpolate({ inputRange: [0, 6], outputRange: ['0deg', '1080deg'] }) },
            ],
          }}
        />
      ))}
    </View>
  );
}

function StatRow({ icon, label, value, color }: {
  icon: string; label: string; value: string; color: string;
}) {
  return (
    <View style={sStyles.row}>
      <Text style={sStyles.icon}>{icon}</Text>
      <Text style={sStyles.label}>{label}</Text>
      <Text style={[sStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

export default function ResultScreen() {
  const { lessonTitle, correct, wrong, total, streakUp, isReview, xpEarned, lessonId } = useLocalSearchParams<{
    lessonTitle: string; correct: string; wrong: string; total: string; streakUp?: string; isReview?: string; xpEarned?: string; lessonId?: string;
  }>();
  const router  = useRouter();
  const insets  = useSafeAreaInsets();
  const streak    = useStore((s) => s.streak);
  const completed  = useStore((s) => s.completed);
  const hearts     = useStore((s) => s.hearts);
  const lottieRef = useRef<LottieView>(null);

  // Compute next lesson path
  const nextLessonId = React.useMemo(() => {
    if (!lessonId || lessonId.startsWith('review-')) return null;
    const [sectionId, lId] = lessonId.split(':');
    const sectionIdx = ALL_SECTIONS.findIndex((s) => s.id === sectionId);
    if (sectionIdx === -1) return null;
    const section = ALL_SECTIONS[sectionIdx];
    const lessonIdx = section.lessons.findIndex((l) => l.id === lId);
    if (lessonIdx === -1) return null;
    // Next lesson in same section
    if (lessonIdx + 1 < section.lessons.length) {
      const nextLesson = section.lessons[lessonIdx + 1];
      return `${sectionId}:${nextLesson.id}`;
    }
    // First lesson of next section
    if (sectionIdx + 1 < ALL_SECTIONS.length) {
      const nextSection = ALL_SECTIONS[sectionIdx + 1];
      if (nextSection.lessons.length > 0) {
        return `${nextSection.id}:${nextSection.lessons[0].id}`;
      }
    }
    return null;
  }, [lessonId]);

  const correctN = Number(correct ?? 0);
  const wrongN   = Number(wrong   ?? 0);
  const totalN   = Number(total   ?? 1);
  const isTeachOnly = totalN === 0;
  const pct      = totalN > 0 ? Math.round((correctN / totalN) * 100) : 100;
  const perfect  = wrongN === 0 && correctN > 0;
  const good     = pct >= 70;
  const fizzled  = correctN === 0 && wrongN > 0;
  const isReviewLesson = isReview === '1';
  const xpEarnedN = Number(xpEarned ?? '0');
  const isStreakUp = streakUp === '1';
  const isFirstLesson = !isReviewLesson && !isTeachOnly && xpEarnedN > 0 && Object.keys(completed).length === 1;

  const frogSource = isTeachOnly
    ? require('../assets/animations/frog/idle.png')
    : perfect
      ? require('../assets/animations/frog/perfect.png')
      : good
        ? require('../assets/animations/frog/celebrate.png')
        : require('../assets/animations/frog/incorrect.png');

  // Entrance animations
  const scaleAnim   = useRef(new Animated.Value(0.4)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const frogBounce  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Headline pop
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 130, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();

    // Frog spring-in with delay
    Animated.sequence([
      Animated.delay(150),
      Animated.spring(frogBounce, { toValue: 1, friction: 4, tension: 160, useNativeDriver: true }),
    ]).start();

    // Lottie on native
    if (Platform.OS !== 'web' && perfect) {
      setTimeout(() => lottieRef.current?.play(), 400);
    }
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 24 }]}>
      {/* Celebration effects */}
      {perfect && <Confetti />}
      {perfect && Platform.OS !== 'web' && (
        <LottieView
          ref={lottieRef}
          source={require('../assets/animations/celebrate.json')}
          style={styles.lottieOverlay}
          loop={false}
          autoPlay={false}
        />
      )}

      {/* Streak milestone banner */}
      {isStreakUp && (
        <View style={styles.streakBanner}>
          <Text style={styles.streakBannerText}>🔥 {streak} day streak!</Text>
        </View>
      )}

      {/* R5: First ever lesson badge */}
      {isFirstLesson && (
        <View style={styles.firstLessonBanner}>
          <Text style={styles.firstLessonBannerTitle}>✨ First spell cast!</Text>
          <Text style={styles.firstLessonBannerBody}>Your first incantation is complete. The journey begins.</Text>
        </View>
      )}

      {/* Frog hero */}
      <Animated.Image
        source={frogSource}
        style={[styles.frogHero, { transform: [{ scale: frogBounce }] }]}
        resizeMode="contain"
      />

      {/* Headline */}
      <Animated.Text style={[styles.headline, {
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
        color: isTeachOnly ? '#1cb0f6' : perfect ? '#ffd700' : good ? '#1cb0f6' : '#ff9600',
      }]}>
        {isTeachOnly
          ? '📖 Lesson complete!'
          : fizzled
            ? '💀 The spell fizzled.'
            : perfect ? '🎉 Perfect!' : good ? '⚡ Spell cast!' : '💪 Keep Going!'}
      </Animated.Text>
      {fizzled && (
        <Text style={[styles.lessonTitle, { color: '#ff9600', marginBottom: 8 }]}>
          Practice makes the wizard.
        </Text>
      )}
      <Text style={styles.lessonTitle}>{lessonTitle}</Text>

      {/* Stats card */}
      <View style={styles.statsBox}>
        {!isTeachOnly && <StatRow icon="✅" label="Correct"  value={`${correctN} / ${totalN}`} color="#58cc02" />}
        {!isTeachOnly && <StatRow icon="❌" label="Mistakes" value={String(wrongN)}           color="#ff4b4b" />}
        {!isTeachOnly && <StatRow icon="📊" label="Score"    value={`${pct}%`}               color="#1cb0f6" />}
        {!isReviewLesson && (
          <StatRow icon="⭐" label="XP earned" value={`+${xpEarnedN}`}        color="#ffd700" />
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        {nextLessonId && (good || isTeachOnly) && !isReviewLesson && (
          <PrimaryButton
            label="Continue →"
            onPress={() => {
              if (hearts === 0) {
                Alert.alert('Hearts Spent', "You're out of hearts! Wait for them to refill.", [{ text: 'OK' }]);
                return;
              }
              router.replace({ pathname: '/quiz/[lessonId]', params: { lessonId: nextLessonId } });
            }}
          />
        )}
        <PrimaryButton label="🏠 Home" onPress={() => router.replace('/')} variant={nextLessonId && (good || isTeachOnly) && !isReviewLesson ? 'secondary' : 'primary'} />
        {wrongN > 0 && (
          <PrimaryButton
            label="← Try Again"
            onPress={() => {
              if (!isReviewLesson && lessonId) {
                router.replace({ pathname: '/quiz/[lessonId]', params: { lessonId } });
              } else {
                router.back();
              }
            }}
            variant="secondary"
          />
        )}
      </View>
    </View>
  );
}

const sStyles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 13, borderBottomWidth: 1, borderColor: BORDER,
  },
  icon:  { fontSize: 22, marginRight: 12, width: 30 },
  label: { flex: 1, color: '#c8d8e8', fontSize: 16 },
  value: { fontSize: 17, fontWeight: '800' },
});

const styles = StyleSheet.create({
  root: {
    flex: 1, backgroundColor: BG,
    paddingHorizontal: SPACING.screen, alignItems: 'center',
  },
  lottieOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 350, zIndex: 10, pointerEvents: 'none',
  } as any,
  frogHero: { width: 160, height: 160, marginBottom: 10 },
  headline: {
    fontSize: 38, fontWeight: '900', marginBottom: 6, textAlign: 'center',
  },
  lessonTitle: {
    fontSize: 15, color: MUTED, marginBottom: 28,
    textAlign: 'center', fontWeight: '500',
  },
  statsBox: {
    width: '100%', backgroundColor: SURFACE_1,
    borderRadius: RADIUS.md, padding: 16, marginBottom: 28,
    borderWidth: 1, borderColor: BORDER,
  },
  actions: { width: '100%', gap: 12 },
  streakBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: SURFACE_1, borderWidth: 1, borderColor: '#ff9600aa',
    borderRadius: 16, paddingHorizontal: 20, paddingVertical: 10,
    marginBottom: 16, alignSelf: 'stretch',
  },
  streakBannerText: { fontSize: 18, fontWeight: '900', color: '#ff9600' },
  firstLessonBanner: {
    alignItems: 'center',
    backgroundColor: SURFACE_1, borderWidth: 1, borderColor: '#ffd700aa',
    borderRadius: 16, paddingHorizontal: 20, paddingVertical: 12,
    marginBottom: 16, alignSelf: 'stretch',
  },
  firstLessonBannerTitle: { fontSize: 18, fontWeight: '900', color: '#ffd700', marginBottom: 4, textAlign: 'center' },
  firstLessonBannerBody:  { fontSize: 13, color: '#c8a830', textAlign: 'center', lineHeight: 20 },
});

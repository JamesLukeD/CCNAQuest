import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BG, MUTED, SPACING } from '../../lib/theme';
import { useStore } from '../../lib/store';
import { ALL_MODULES } from '../../data/modules';
import { ALL_SECTIONS } from '../../data/sections';
import { PrimaryButton } from '../../components/PrimaryButton';

export default function OnboardingPath() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const completeOnboarding = useStore((s) => s.completeOnboarding);

  const firstModule  = ALL_MODULES[0];
  const firstSection = ALL_SECTIONS.find((s) => s.id === firstModule?.sections[0]);
  const firstLesson  = firstSection?.lessons[0];

  function handleStart() {
    completeOnboarding();
    if (firstSection && firstLesson) {
      router.replace(`/quiz/${firstSection.id}:${firstLesson.id}` as any);
    } else {
      router.replace('/');
    }
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 32 }]}>
      <View style={styles.frogWrap}>
        <Image
          source={require('../../assets/animations/frog/idle.png')}
          style={styles.frog}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.headline}>Your first incantation awaits.</Text>
      <Text style={styles.body}>
        The path begins with the fundamentals — how hosts communicate across networks.{'\n\n'}
        Short lessons. Spaced repetition. Progress saved automatically.{'\n'}
        The craft reveals itself one spell at a time.
      </Text>

      {firstLesson && (
        <View style={styles.lessonPill}>
          <Text style={styles.lessonPillLabel}>FIRST LESSON</Text>
          <Text style={styles.lessonPillTitle}>{firstLesson.title}</Text>
        </View>
      )}

      <View style={styles.cta}>
        <PrimaryButton label="Start Lesson 1 →" onPress={handleStart} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, backgroundColor: BG,
    paddingHorizontal: SPACING.screen, alignItems: 'center', justifyContent: 'center',
  },
  frogWrap: {
    width: 180, height: 180, marginBottom: 28,
    alignItems: 'center', justifyContent: 'center',
  },
  frog: { width: 180, height: 180 },
  headline: {
    fontSize: 30, fontWeight: '900', color: '#ffffff',
    textAlign: 'center', marginBottom: 16, letterSpacing: -0.4,
  },
  body: {
    fontSize: 15, color: MUTED, textAlign: 'center',
    lineHeight: 24, marginBottom: 28, maxWidth: 320,
  },
  lessonPill: {
    backgroundColor: '#0d2030', borderRadius: 14, borderWidth: 1, borderColor: '#1a4060',
    paddingHorizontal: 20, paddingVertical: 12, alignItems: 'center', marginBottom: 36,
  },
  lessonPillLabel: { fontSize: 10, fontWeight: '800', color: '#1cb0f6', letterSpacing: 1.5, marginBottom: 4 },
  lessonPillTitle: { fontSize: 15, fontWeight: '700', color: '#daeaf5', textAlign: 'center' },
  cta: { width: '100%' },
});

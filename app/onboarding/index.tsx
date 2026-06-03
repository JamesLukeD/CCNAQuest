import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BG, MUTED, SPACING, RADIUS, BORDER } from '../../lib/theme';
import { PrimaryButton } from '../../components/PrimaryButton';

function StepDots({ active }: { active: 0 | 1 | 2 }) {
  return (
    <View style={dotStyles.row}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={[dotStyles.dot, i === active && dotStyles.dotActive]} />
      ))}
    </View>
  );
}

const dotStyles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: BORDER },
  dotActive: { backgroundColor: '#1cb0f6', width: 20 },
});

export default function OnboardingWelcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const floatY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -12, duration: 1900, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0,   duration: 1900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 32 }]}>
      <Animated.View style={[styles.frogWrap, { transform: [{ translateY: floatY }] }]}>
        <Image
          source={require('../../assets/animations/frog/idle.png')}
          style={styles.frog}
          resizeMode="contain"
        />
      </Animated.View>

      <Text style={styles.headline}>Welcome, Apprentice.</Text>
      <Text style={styles.body}>
        The arcane arts of networking await you. Hearts keep you honest, XP marks your mastery,
        and a daily streak forges the habit.{'\n\n'}
        Every wizard begins here.
      </Text>

      <View style={styles.cta}>
        <PrimaryButton
          label="Begin training →"
          onPress={() => router.push('/onboarding/mechanics')}
        />
        <StepDots active={0} />
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
    width: 200, height: 200, marginBottom: 32,
    alignItems: 'center', justifyContent: 'center',
  },
  frog: { width: 200, height: 200 },
  headline: {
    fontSize: 34, fontWeight: '900', color: '#ffffff',
    textAlign: 'center', marginBottom: 20, letterSpacing: -0.5,
  },
  body: {
    fontSize: 16, color: MUTED, textAlign: 'center',
    lineHeight: 26, marginBottom: 48, maxWidth: 320,
  },
  cta: { width: '100%' },
});

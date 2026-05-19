import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BG, MUTED, SPACING, RADIUS } from '../../lib/theme';
import { PrimaryButton } from '../../components/PrimaryButton';

export default function OnboardingWelcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 32 }]}>
      <View style={styles.frogWrap}>
        <Image
          source={require('../../assets/animations/frog/idle.png')}
          style={styles.frog}
          resizeMode="contain"
        />
      </View>

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

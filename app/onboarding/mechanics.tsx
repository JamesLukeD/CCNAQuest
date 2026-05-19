import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BG, SURFACE_1, BORDER, MUTED, SPACING, RADIUS } from '../../lib/theme';
import { PrimaryButton } from '../../components/PrimaryButton';

const RULES = [
  {
    icon: '❤️',
    title: 'Hearts keep you honest.',
    body: 'You start each day with 5 hearts. A wrong answer costs one. When they\'re spent, rest until tomorrow.',
  },
  {
    icon: '⚡',
    title: 'XP marks your mastery.',
    body: 'Earn XP by completing lessons. Perfect runs reward the most. Review your weak spots to climb higher.',
  },
  {
    icon: '🔥',
    title: 'The streak forges the habit.',
    body: 'Study every day to grow your streak. Miss a day and it resets. Consistency is the spell.',
  },
];

export default function OnboardingMechanics() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 32 }]}>
      <Image
        source={require('../../assets/animations/frog/thinking.png')}
        style={styles.frog}
        resizeMode="contain"
      />

      <Text style={styles.headline}>Every wizard lives by three rules.</Text>

      <View style={styles.rulesBox}>
        {RULES.map((rule, i) => (
          <View key={i} style={[styles.ruleRow, i < RULES.length - 1 && styles.ruleDivider]}>
            <Text style={styles.ruleIcon}>{rule.icon}</Text>
            <View style={styles.ruleText}>
              <Text style={styles.ruleTitle}>{rule.title}</Text>
              <Text style={styles.ruleBody}>{rule.body}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.cta}>
        <PrimaryButton
          label="I'm ready. Cast the first spell →"
          onPress={() => router.push('/onboarding/path')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, backgroundColor: BG,
    paddingHorizontal: SPACING.screen, alignItems: 'center',
  },
  frog: { width: 140, height: 140, marginBottom: 24 },
  headline: {
    fontSize: 24, fontWeight: '900', color: '#ffffff',
    textAlign: 'center', marginBottom: 28, letterSpacing: -0.3,
  },
  rulesBox: {
    width: '100%', backgroundColor: SURFACE_1,
    borderRadius: RADIUS.lg, borderWidth: 1, borderColor: BORDER,
    padding: 4, marginBottom: 36,
  },
  ruleRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    padding: 16, gap: 14,
  },
  ruleDivider: { borderBottomWidth: 1, borderBottomColor: BORDER },
  ruleIcon: { fontSize: 28, lineHeight: 34 },
  ruleText: { flex: 1 },
  ruleTitle: { fontSize: 15, fontWeight: '800', color: '#daeaf5', marginBottom: 4 },
  ruleBody:  { fontSize: 13, color: MUTED, lineHeight: 20 },
  cta: { width: '100%', marginTop: 'auto' },
});

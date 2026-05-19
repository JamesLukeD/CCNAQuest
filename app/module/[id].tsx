import React, { useRef } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Animated, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ALL_MODULES } from '../../data/modules';
import { ALL_SECTIONS } from '../../data/sections';
import { useStore } from '../../lib/store';
import { getDueCount } from '../../lib/sm2';
import { BG, BORDER, MUTED, MUTED_HERO, RADIUS, SPACING } from '../../lib/theme';
import { BackButton } from '../../components/BackButton';
import { SectionDivider } from '../../components/SectionDivider';
import { HeroPill, HeroProgressBar } from '../../components/HeroPill';

const ND = Platform.OS !== 'web';

function TopicCard({ sec, sId, unlocked, mastered, pct, dueCount, color, onPress }: {
  sec: any; sId: string; unlocked: boolean; mastered: boolean;
  pct: number; dueCount: number; color: string; onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const hoverIn  = () => Animated.spring(scale, { toValue: 1.02, friction: 8, tension: 200, useNativeDriver: ND }).start();
  const hoverOut = () => Animated.spring(scale, { toValue: 1,    friction: 8, tension: 200, useNativeDriver: ND }).start();

  const statusColor = mastered ? '#58cc02' : unlocked ? color : '#2a3a4a';
  const cardBorder  = mastered ? '#58cc02' : unlocked ? color + '55' : '#1e2d3a';

  return (
    <Animated.View style={[styles.topicShell, { transform: [{ scale }], borderColor: cardBorder }]}>
      <Pressable
        onPress={() => unlocked && onPress()}
        onHoverIn={hoverIn}
        onHoverOut={hoverOut}
        disabled={!unlocked}
        style={[styles.topicCard, !unlocked && styles.topicLocked]}
      >
        {/* Left accent */}
        <View style={[styles.topicAccent, { backgroundColor: statusColor }]} />

        <View style={styles.topicInner}>
          {/* Icon */}
          <View style={[styles.topicIconWrap, {
            backgroundColor: statusColor + '22',
            borderColor: statusColor + '55',
          }]}>
            <Text style={styles.topicIconText}>
              {unlocked ? sec.icon : '🔒'}
            </Text>
          </View>

          {/* Info */}
          <View style={styles.topicInfo}>
            <Text style={[styles.topicTitle, !unlocked && { color: '#4a6070' }]}>
              {sec.title}
            </Text>
            <Text style={styles.topicSub}>
              {sec.lessons.length > 0 ? `${sec.lessons.length} lessons` : 'Coming soon'}
              {dueCount > 0 ? ` · ${dueCount} due` : ''}
            </Text>
            {unlocked && sec.lessons.length > 0 && !mastered && (
              <View style={styles.topicBar}>
                <View style={[styles.topicFill, { width: `${Math.round(pct * 100)}%` as any, backgroundColor: color }]} />
              </View>
            )}
          </View>

          {/* Right badge */}
          {mastered ? (
            <View style={[styles.badgeWrap, { backgroundColor: '#58cc0222', borderColor: '#58cc02' }]}>
              <Text style={[styles.badgeText, { color: '#58cc02' }]}>✓</Text>
            </View>
          ) : unlocked && sec.lessons.length > 0 ? (
            <Text style={[styles.pctLabel, { color }]}>{Math.round(pct * 100)}%</Text>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function ModuleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router  = useRouter();
  const insets  = useSafeAreaInsets();
  const completed = useStore((s) => s.completed);
  const sm2 = useStore((s) => s.sm2);

  const mod = ALL_MODULES.find((m) => m.id === id);
  if (!mod) {
    return (
      <View style={[styles.root, styles.errorState, { paddingTop: insets.top + 40 }]}>
        <BackButton onPress={() => router.back()} />
        <Image
          source={require('../../assets/animations/frog/incorrect.png')}
          style={styles.errorFrog}
          resizeMode="contain"
        />
        <Text style={styles.errorTitle}>Tome not found.</Text>
        <Text style={styles.errorBody}>
          This tome doesn't exist in our library. Let's go back.
        </Text>
      </View>
    );
  }

  function isSectionUnlocked(sectionId: string): boolean {
    const sec = ALL_SECTIONS.find((s) => s.id === sectionId);
    if (!sec || sec.unlockAfter === null) return true;
    const prev = ALL_SECTIONS.find((s) => s.id === sec.unlockAfter);
    if (!prev || prev.lessons.length === 0) return true;
    return prev.lessons.every((l) => !!completed[`${prev.id}:${l.id}`]?.done);
  }

  function isSectionMastered(sectionId: string): boolean {
    const sec = ALL_SECTIONS.find((s) => s.id === sectionId);
    if (!sec || sec.lessons.length === 0) return false;
    return sec.lessons.every((l) => !!completed[`${sectionId}:${l.id}`]?.done);
  }

  function sectionProgress(sectionId: string): number {
    const sec = ALL_SECTIONS.find((s) => s.id === sectionId);
    if (!sec || sec.lessons.length === 0) return 0;
    const done = sec.lessons.filter((l) => !!completed[`${sectionId}:${l.id}`]?.done).length;
    return done / sec.lessons.length;
  }

  // Overall module progress
  const totalLessons = mod.sections.reduce((acc, sId) => {
    const sec = ALL_SECTIONS.find((s) => s.id === sId);
    return acc + (sec?.lessons.length ?? 0);
  }, 0);
  const doneLessons = mod.sections.reduce((acc, sId) => {
    const sec = ALL_SECTIONS.find((s) => s.id === sId);
    if (!sec) return acc;
    return acc + sec.lessons.filter((l) => !!completed[`${sId}:${l.id}`]?.done).length;
  }, 0);
  const overallPct = totalLessons > 0 ? doneLessons / totalLessons : 0;

  // M3: all sections in this module completed
  const isModuleMastered = mod.sections.length > 0 && mod.sections.every((sId) => isSectionMastered(sId));

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Gradient hero banner ── */}
      <LinearGradient
        colors={[mod.color + 'cc', mod.color + '44', '#0e1a20']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 12 }]}
      >
        <BackButton onPress={() => router.back()} />

        <Text style={styles.heroEmoji}>{mod.icon}</Text>
        <Text style={styles.heroTitle}>{mod.title}</Text>
        <Text style={styles.heroSub}>{mod.subtitle}</Text>

        {/* Progress pill */}
        <View style={styles.heroPillRow}>
          <HeroPill label={`${mod.sections.length} topics`} />
          <HeroPill label={`${totalLessons} lessons`} />
          <HeroPill label={`${Math.round(overallPct * 100)}% done`} textColor={mod.color} bg={mod.color + '33'} border={mod.color + '88'} />
        </View>

        {/* Overall progress bar */}
        <HeroProgressBar pct={overallPct} color={mod.color} />

        {/* M3: module mastered banner */}
        {isModuleMastered && (
          <View style={[styles.masteredBanner, { borderColor: mod.color + 'aa', backgroundColor: mod.color + '18' }]}>
            <Text style={[styles.masteredBannerText, { color: mod.color }]}>✦ Module mastered. All incantations bound. ✦</Text>
          </View>
        )}
      </LinearGradient>

      {/* ── Section header ── */}
      <SectionDivider
        label="TOPICS"
        style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 12 }}
      />

      {/* ── Topic cards ── */}
      <View style={styles.cardList}>
        {mod.sections.map((sId) => {
          const sec = ALL_SECTIONS.find((s) => s.id === sId);
          if (!sec) return null;
          const unlocked = isSectionUnlocked(sId);
          const mastered = isSectionMastered(sId);
          const pct = sectionProgress(sId);
          const dueCount = unlocked ? getDueCount(sm2, sec) : 0;

          return (
            <TopicCard
              key={sId}
              sec={sec}
              sId={sId}
              unlocked={unlocked}
              mastered={mastered}
              pct={pct}
              dueCount={dueCount}
              color={mod.color}
              onPress={() => router.push(`/section/${sId}`)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  // Error
  errorState: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  errorFrog:  { width: 160, height: 160, marginBottom: 24 },
  errorTitle: { fontSize: 24, fontWeight: '900', color: '#ffffff', textAlign: 'center', marginBottom: 12 },
  errorBody:  { fontSize: 15, color: MUTED, textAlign: 'center', lineHeight: 24 },
  hero: { paddingHorizontal: SPACING.screen, paddingBottom: SPACING.heroBottom },
  heroEmoji: { fontSize: 52, marginBottom: 12 },
  heroTitle: { fontSize: 28, fontWeight: '900', color: '#ffffff', marginBottom: 6 },
  heroSub:   { fontSize: 14, color: MUTED_HERO, marginBottom: 18, fontWeight: '500' },
  heroPillRow: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },

  // Section label


  // Cards
  cardList: { paddingHorizontal: 16, gap: 10 },
  topicShell: {
    borderRadius: RADIUS.md, overflow: 'hidden',
    borderWidth: 1,
  },
  topicCard: { borderRadius: RADIUS.md },
  topicLocked: { opacity: 0.45 },
  topicAccent: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
    borderTopLeftRadius: RADIUS.md, borderBottomLeftRadius: RADIUS.md,
  },
  topicInner: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, paddingLeft: 20, gap: 14, minHeight: 80,
  },
  topicIconWrap: {
    width: 48, height: 48, borderRadius: 24, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  topicIconText: { fontSize: 22 },
  topicInfo: { flex: 1 },
  topicTitle: { fontSize: 15, fontWeight: '800', color: '#ffffff', marginBottom: 3 },
  topicSub: { fontSize: 12, color: MUTED, fontWeight: '500' },
  topicBar: {
    height: 6, backgroundColor: BORDER,
    borderRadius: 99, overflow: 'hidden', marginTop: 8, width: '100%',
  },
  topicFill: { height: '100%', borderRadius: 99 },
  badgeWrap: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { fontSize: 14, fontWeight: '900' },
  pctLabel: { fontSize: 13, fontWeight: '800', marginLeft: 4 },

  // M3 — module mastered
  masteredBanner: {
    marginTop: 16, borderRadius: 12, borderWidth: 1,
    paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center',
  },
  masteredBannerText: { fontSize: 14, fontWeight: '800', letterSpacing: 0.5, textAlign: 'center' },
});

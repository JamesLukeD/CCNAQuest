import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView, View, Text, Pressable,
  StyleSheet, Animated, Platform, Image, Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ALL_MODULES } from '../data/modules';
import { ALL_SECTIONS } from '../data/sections';
import { useStore } from '../lib/store';
import { BG, SURFACE_1, SURFACE_2, BORDER, MUTED, RADIUS, SPACING } from '../lib/theme';
import { SectionDivider } from '../components/SectionDivider';

const MAX_HEARTS = 5;
const MAX_XP     = 500;
const ND = Platform.OS !== 'web';

function ModuleCard({
  mod, pct, totalLessons, onPress, index,
}: {
  mod: (typeof ALL_MODULES)[0];
  pct: number;
  totalLessons: number;
  onPress: () => void;
  index: number;
}) {
  const scale  = useRef(new Animated.Value(1)).current;
  const glow   = useRef(new Animated.Value(0)).current;
  const arrowX = useRef(new Animated.Value(0)).current;

  const hoverIn = () => Animated.parallel([
    Animated.spring(scale,  { toValue: 1.025, friction: 7, tension: 200, useNativeDriver: ND }),
    Animated.timing(glow,   { toValue: 1, duration: 180, useNativeDriver: false }),
    Animated.spring(arrowX, { toValue: 8, friction: 5, tension: 300, useNativeDriver: ND }),
  ]).start();

  const hoverOut = () => Animated.parallel([
    Animated.spring(scale,  { toValue: 1, friction: 7, tension: 200, useNativeDriver: ND }),
    Animated.timing(glow,   { toValue: 0, duration: 180, useNativeDriver: false }),
    Animated.spring(arrowX, { toValue: 0, friction: 5, tension: 300, useNativeDriver: ND }),
  ]).start();

  const accentOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] });

  return (
    <>
      {index > 0 && (
        <View style={styles.pathLine}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.pathDot, { backgroundColor: mod.color + '55' }]} />
          ))}
        </View>
      )}
      <Animated.View style={[styles.cardShell, { transform: [{ scale }] }]}>
        <Pressable onPress={onPress} onHoverIn={hoverIn} onHoverOut={hoverOut}>
          <LinearGradient
            colors={[mod.color + '26', mod.color + '0a', SURFACE_1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.3, y: 1 }}
            style={styles.cardGrad}
          >
            <Animated.View
              style={[styles.accentBar, { backgroundColor: mod.color, opacity: accentOpacity }]}
            />
            <View style={styles.cardContent}>
              <View style={[styles.iconWrap, {
                backgroundColor: mod.color + '1e',
                borderColor: mod.color + '70',
              }]}>
                <Text style={styles.iconEmoji}>{mod.icon}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={[styles.modTitle, { color: mod.color }]}>{mod.title}</Text>
                <Text style={styles.modSub}>{mod.subtitle}</Text>
                {totalLessons > 0 && (
                  <View style={styles.progTrack}>
                    <View style={[styles.progFill, {
                      width: `${Math.round(pct * 100)}%` as any,
                      backgroundColor: mod.color,
                    }]} />
                  </View>
                )}
                <View style={styles.cardFoot}>
                  {totalLessons === 0 ? (
                    <Text style={[styles.chipText, { color: MUTED }]}>Coming soon</Text>
                  ) : (
                    <>
                      <Text style={styles.chipText}>
                        {mod.sections.length} topics · {totalLessons} lessons
                      </Text>
                      <Text style={[styles.pctBadge, { color: mod.color }]}>
                        {Math.round(pct * 100)}%
                      </Text>
                    </>
                  )}
                </View>
              </View>
              <Animated.Text style={[styles.cardArrow, {
                color: mod.color,
                transform: [{ translateX: arrowX }],
              }]}>›</Animated.Text>
            </View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </>
  );
}

export default function HomeScreen() {
  const router    = useRouter();
  const insets    = useSafeAreaInsets();
  const completed = useStore((s) => s.completed);
  const xp        = useStore((s) => s.xp);
  const streak    = useStore((s) => s.streak);
  const hearts    = useStore((s) => s.hearts);
  const nextHeartAt = useStore((s) => s.nextHeartAt);
  const checkHeartRefill = useStore((s) => s.checkHeartRefill);
  const lastPlayed                  = useStore((s) => s.lastPlayed);
  const hasLoaded                   = useStore((s) => s.hasLoaded);
  const streakBroken                = useStore((s) => s.streakBroken);
  const clearStreakBroken           = useStore((s) => s.clearStreakBroken);
  const lastStreakMilestoneCelebrated = useStore((s) => s.lastStreakMilestoneCelebrated);
  const celebrateStreakMilestone    = useStore((s) => s.celebrateStreakMilestone);

  const today     = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86_400_000).toDateString();
  const isReturning = lastPlayed === yesterday;
  const MILESTONES = [7, 14, 30, 60, 100];
  const milestone = MILESTONES.filter((m) => m <= streak && m > lastStreakMilestoneCelebrated).at(-1) ?? null;

  const [returningBanner, setReturningBanner] = useState(false);
  const [milestoneModal, setMilestoneModal] = useState(!!milestone);

  // BUG-004: initialise banner reactively after loadState resolves
  useEffect(() => {
    if (hasLoaded && isReturning) setReturningBanner(true);
  }, [hasLoaded]);

  // Auto-dismiss returning banner after 4 s
  useEffect(() => {
    if (!returningBanner) return;
    const t = setTimeout(() => setReturningBanner(false), 4000);
    return () => clearTimeout(t);
  }, [returningBanner]);

  // Show milestone modal whenever a new one is unlocked
  useEffect(() => {
    if (milestone) setMilestoneModal(true);
  }, [milestone]);

  // Incrementally refill hearts — check every 30 s while the screen is mounted.
  const [heartCountdown, setHeartCountdown] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      checkHeartRefill();
      if (nextHeartAt !== null && hearts < MAX_HEARTS) {
        const msLeft = Math.max(0, nextHeartAt - Date.now());
        const m = Math.floor(msLeft / 60_000);
        const s = Math.floor((msLeft % 60_000) / 1000);
        setHeartCountdown(`${m}:${String(s).padStart(2, '0')}`);
      } else {
        setHeartCountdown(null);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [nextHeartAt, hearts]);

  const floatY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -14, duration: 1900, useNativeDriver: ND }),
        Animated.timing(floatY, { toValue:   0, duration: 1900, useNativeDriver: ND }),
      ])
    ).start();
  }, [floatY]);

  function moduleProgress(moduleId: string) {
    const mod = ALL_MODULES.find((m) => m.id === moduleId);
    if (!mod) return { pct: 0, totalLessons: 0 };
    const totalLessons = mod.sections.reduce((acc, sId) => {
      const sec = ALL_SECTIONS.find((s) => s.id === sId);
      return acc + (sec?.lessons.length ?? 0);
    }, 0);
    if (totalLessons === 0) return { pct: 0, totalLessons: 0 };
    const done = mod.sections.reduce((acc, sId) => {
      const sec = ALL_SECTIONS.find((s) => s.id === sId);
      if (!sec) return acc;
      return acc + sec.lessons.filter((l) => !!completed[`${sId}:${l.id}`]?.done).length;
    }, 0);
    return { pct: done / totalLessons, totalLessons };
  }

  const xpPct   = Math.min((xp % MAX_XP) / MAX_XP, 1);
  const level    = Math.floor(xp / MAX_XP) + 1;
  const xpInLevel = xp % MAX_XP;

  // XP bar pulse when xp changes
  const xpPulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (xp === 0) return;
    Animated.sequence([
      Animated.spring(xpPulse, { toValue: 1.03, friction: 3, tension: 300, useNativeDriver: ND }),
      Animated.spring(xpPulse, { toValue: 1,    friction: 4, tension: 200, useNativeDriver: ND }),
    ]).start();
  }, [xp]);

  // H5: all modules complete
  const allComplete = ALL_MODULES.every((mod) => {
    const { pct, totalLessons } = moduleProgress(mod.id);
    return totalLessons > 0 && pct >= 1;
  });

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar: hearts + streak only */}
      <View style={styles.topBar}>
        <View style={styles.heartsRow}>
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <Text key={i} style={[styles.heart, i >= hearts && styles.heartDim]}>❤️</Text>
          ))}
        </View>
        <View style={{ flex: 1 }} />
        <Text style={styles.streakText}>🔥 {streak}</Text>
      </View>

      {/* XP bar — full-width row below HUD */}
      <Animated.View style={[styles.xpRow, { transform: [{ scale: xpPulse }] }]}>
        <View style={styles.xpMeta}>
          <Text style={styles.xpLevelLabel}>Lvl {level}</Text>
          <Text style={styles.xpCountLabel}>{xpInLevel} / {MAX_XP} XP</Text>
        </View>
        <View style={styles.xpTrack}>
          <LinearGradient
            colors={['#58cc02', '#1cb0f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.xpFill, { width: `${xpPct * 100}%` as any }]}
          >
            <View style={styles.xpHighlight} />
          </LinearGradient>
        </View>
      </Animated.View>

      {/* P9: Zero-hearts notice */}
      {hearts === 0 && (
        <View style={styles.noHeartsBanner}>
          <Text style={styles.noHeartsText}>
            {heartCountdown
              ? `❤️ Next heart in ${heartCountdown}`
              : '❤️ Out of hearts. Hang tight, apprentice.'}
          </Text>
        </View>
      )}

      {/* Refilling hearts nudge */}
      {hearts > 0 && hearts < MAX_HEARTS && heartCountdown && (
        <View style={[styles.noHeartsBanner, { backgroundColor: 'transparent', borderColor: BORDER }]}>
          <Text style={[styles.noHeartsText, { color: MUTED }]}>❤️ Next heart in {heartCountdown}</Text>
        </View>
      )}

      {/* P3: Broken streak banner */}
      {streakBroken && (
        <View style={styles.brokenStreakBanner}>
          <Text style={styles.brokenStreakText}>💪 Your streak was broken. Start a new one today!</Text>
          <Pressable onPress={clearStreakBroken} style={styles.brokenStreakDismiss}>
            <Text style={styles.brokenStreakDismissText}>×</Text>
          </Pressable>
        </View>
      )}

      {/* P2: Streak milestone modal */}
      {milestoneModal && milestone && (
        <Modal transparent animationType="fade" visible={milestoneModal}>
          <View style={styles.milestoneOverlay}>
            <View style={styles.milestoneCard}>
              <Image
                source={require('../assets/animations/frog/streak.png')}
                style={{ width: 96, height: 96, alignSelf: 'center', marginBottom: 8 }}
                resizeMode="contain"
              />
              <Text style={styles.milestoneTitle}>{milestone} Day Streak!</Text>
              <Text style={styles.milestoneBody}>
                {milestone >= 100
                  ? 'One hundred days. The masters bow to you.'
                  : milestone >= 60
                  ? 'Two months of mastery. The art becomes second nature.'
                  : milestone >= 30
                  ? 'One full moon of study. The arcane paths grow familiar.'
                  : milestone >= 14
                  ? 'A fortnight forged in discipline. The spell holds strong.'
                  : 'A full week of training. The habit is taking shape.'}
              </Text>
              <Pressable
                style={styles.milestoneBtn}
                onPress={() => {
                  celebrateStreakMilestone(milestone);
                  setMilestoneModal(false);
                }}
              >
                <Text style={styles.milestoneBtnText}>Onward! →</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* P1: Returning user banner */}
        {returningBanner && (
          <Pressable
            style={styles.returningBanner}
            onPress={() => setReturningBanner(false)}
          >
            <Text style={styles.returningBannerText}>
              🔥 Welcome back! Your streak is still alive.
            </Text>
          </Pressable>
        )}
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.glowCircle, styles.glowOuter]} />
          <View style={[styles.glowCircle, styles.glowMid]} />
          <View style={[styles.glowCircle, styles.glowInner]} />
          <Animated.Image
            source={require('../assets/animations/frog/idle.png')}
            style={[styles.mascot, { transform: [{ translateY: floatY }] }]}
            resizeMode="contain"
          />
          <Text style={styles.heroTitle}>CCNA Quest</Text>
          <Text style={styles.heroSub}>Your networking adventure awaits</Text>
          <View style={styles.heroBadges}>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>⚡</Text>
              <Text style={styles.badgeText}>{xp} XP</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: '#1e1200', borderColor: '#3a2800' }]}>
              <Text style={styles.badgeIcon}>🔥</Text>
              <Text style={[styles.badgeText, { color: '#ffc800' }]}>{streak} day streak</Text>
            </View>
          </View>
        </View>

        {/* H5: Grimoire complete banner */}
        {allComplete && (
          <View style={styles.grimoireBanner}>
            <Text style={styles.grimoireBannerTitle}>🎓 GRIMOIRE COMPLETE</Text>
            <Text style={styles.grimoireBannerBody}>Every incantation mastered. You are ready for the CCNA.</Text>
          </View>
        )}

        {/* Section header */}
        <SectionDivider
          label={allComplete ? 'YOUR COMPLETED PATH' : 'CHOOSE YOUR PATH'}
          style={{ marginTop: 8, marginBottom: 12, paddingHorizontal: 4 }}
        />

        {/* Module journey cards */}
        {ALL_MODULES.map((mod, index) => {
          const { pct, totalLessons } = moduleProgress(mod.id);
          return (
            <ModuleCard
              key={mod.id}
              mod={mod}
              pct={pct}
              totalLessons={totalLessons}
              onPress={() => router.push(`/module/${mod.id}`)}
              index={index}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  topBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: SPACING.screen, paddingVertical: 10,
    backgroundColor: SURFACE_2,
  },
  heartsRow:  { flexDirection: 'row', gap: 3 },
  heart:      { fontSize: 18 },
  heartDim:   { opacity: 0.2 },
  streakText: { fontSize: 16, fontWeight: '800', color: '#ffc800' },

  xpRow: {
    paddingHorizontal: SPACING.screen, paddingTop: 6, paddingBottom: 10,
    backgroundColor: SURFACE_2,
    borderBottomWidth: 1, borderBottomColor: BORDER,
    gap: 5,
  },
  xpMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  xpLevelLabel: { fontSize: 12, fontWeight: '800', color: '#1cb0f6', letterSpacing: 0.4 },
  xpCountLabel: { fontSize: 11, fontWeight: '600', color: MUTED },
  xpTrack:    { height: 16, backgroundColor: BORDER, borderRadius: 99, overflow: 'hidden' },
  xpFill:     { height: '100%', borderRadius: 99, justifyContent: 'flex-start' },
  xpHighlight: { position: 'absolute', top: 3, left: 8, right: 8, height: 4, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.28)' },

  content: { paddingHorizontal: SPACING.screen },

  hero: {
    alignItems: 'center', paddingTop: 36, paddingBottom: 20,
    position: 'relative',
  },
  glowCircle: { position: 'absolute', borderRadius: 9999 },
  glowOuter: {
    width: 280, height: 280, top: -16,
    backgroundColor: '#1cb0f6', opacity: 0.07,
  },
  glowMid: {
    width: 190, height: 190, top: 28,
    backgroundColor: '#58cc02', opacity: 0.08,
  },
  glowInner: {
    width: 110, height: 110, top: 73,
    backgroundColor: '#1cb0f6', opacity: 0.12,
  },
  mascot: {
    width: 190, height: 190, zIndex: 2, marginBottom: 14,
  },
  heroTitle: {
    fontSize: 36, fontWeight: '900', letterSpacing: -0.5,
    marginBottom: 5, color: '#58cc02',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(135deg, #58cc02 0%, #1cb0f6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      } as any,
    }),
  },
  heroSub: { fontSize: 14, color: MUTED, fontWeight: '500', marginBottom: 16 },
  heroBadges: { flexDirection: 'row', gap: 10 },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#0a2618', borderRadius: RADIUS.lg,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: '#1a4a28',
  },
  badgeIcon: { fontSize: 14 },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#58cc02' },



  pathLine: {
    alignItems: 'center', flexDirection: 'column',
    gap: 7, paddingVertical: 12,
  },
  pathDot: { width: 6, height: 6, borderRadius: 3 },

  cardShell: {
    borderRadius: RADIUS.lg, overflow: 'hidden',
    borderWidth: 1, borderColor: BORDER,
  },
  cardGrad: { borderRadius: RADIUS.lg },
  accentBar: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 5,
    borderTopLeftRadius: RADIUS.lg, borderBottomLeftRadius: RADIUS.lg,
  },
  cardContent: {
    flexDirection: 'row', alignItems: 'center',
    padding: 20, paddingLeft: 26, gap: 16, minHeight: 136,
  },
  iconWrap: {
    width: 68, height: 68, borderRadius: 34, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  iconEmoji: { fontSize: 32 },
  cardInfo:  { flex: 1 },
  modTitle:  { fontSize: 17, fontWeight: '900', marginBottom: 3, letterSpacing: 0.2 },
  modSub:    { fontSize: 12, color: MUTED, marginBottom: 12, fontWeight: '500' },
  progTrack: {
    height: 6, backgroundColor: BORDER,
    borderRadius: 99, overflow: 'hidden', marginBottom: 8,
  },
  progFill:  { height: '100%', borderRadius: 99 },
  cardFoot:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chipText:  { fontSize: 11, color: '#3a5a6a', fontWeight: '600' },
  pctBadge:  { fontSize: 13, fontWeight: '800' },
  cardArrow: { fontSize: 34, lineHeight: 40, marginLeft: 4, flexShrink: 0 },

  // P9 — zero hearts notice
  noHeartsBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#2a0a0a', borderBottomWidth: 1, borderBottomColor: '#6a1a1a',
    paddingHorizontal: 16, paddingVertical: 8,
  },
  noHeartsText: { fontSize: 13, fontWeight: '700', color: '#ff6b6b' },

  // P3 — broken streak banner
  brokenStreakBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a1200', borderBottomWidth: 1, borderBottomColor: '#4a3600',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  brokenStreakText: { flex: 1, fontSize: 13, fontWeight: '700', color: '#ffc800' },
  brokenStreakDismiss: { paddingLeft: 12, paddingRight: 4 },
  brokenStreakDismissText: { fontSize: 20, color: '#ffc800', lineHeight: 22 },

  // P2 — milestone modal
  milestoneOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  milestoneCard: {
    width: '100%', backgroundColor: '#0e1a20',
    borderRadius: 24, borderWidth: 2, borderColor: '#ff9600',
    padding: 28, alignItems: 'center',
  },
  milestoneEmoji: { fontSize: 64, marginBottom: 12 },
  milestoneTitle: { fontSize: 30, fontWeight: '900', color: '#ff9600', marginBottom: 14, textAlign: 'center' },
  milestoneBody:  { fontSize: 15, color: '#c8d8e8', textAlign: 'center', lineHeight: 24, marginBottom: 24 },
  milestoneBtn:   {
    backgroundColor: '#ff9600', borderRadius: 16,
    paddingHorizontal: 28, paddingVertical: 14, width: '100%', alignItems: 'center',
  },
  milestoneBtnText: { fontSize: 18, fontWeight: '900', color: '#0e1a20' },

  // P1 — returning user banner
  returningBanner: {
    backgroundColor: '#0d2030', borderRadius: 14, borderWidth: 1, borderColor: '#1a4060',
    padding: 14, marginHorizontal: 4, marginBottom: 16, alignItems: 'center',
  },
  returningBannerText: { fontSize: 14, fontWeight: '700', color: '#1cb0f6' },

  // H5 — grimoire complete
  grimoireBanner: {
    backgroundColor: '#0d200d', borderRadius: 16, borderWidth: 1, borderColor: '#58cc0288',
    paddingHorizontal: 20, paddingVertical: 16,
    marginHorizontal: 4, marginBottom: 20, alignItems: 'center',
  },
  grimoireBannerTitle: { fontSize: 20, fontWeight: '900', color: '#58cc02', marginBottom: 6, letterSpacing: 1 },
  grimoireBannerBody:  { fontSize: 14, color: '#5aaa50', textAlign: 'center', lineHeight: 22 },
});

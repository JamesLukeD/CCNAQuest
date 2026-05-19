import React, { useRef, useEffect, useState } from 'react';
import {
  ScrollView, View, Text, Pressable, StyleSheet,
  Animated, Platform, Dimensions, Image, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ALL_SECTIONS } from '../../data/sections';
import { ALL_MODULES } from '../../data/modules';
import { useStore } from '../../lib/store';
import { getDueCount, getLessonDueCount, buildReviewLesson } from '../../lib/sm2';
import { BG, MUTED_HERO, SPACING } from '../../lib/theme';
import { BackButton } from '../../components/BackButton';
import { HeroPill, HeroProgressBar } from '../../components/HeroPill';

const ND = Platform.OS !== 'web';
const SCREEN_W = Dimensions.get('window').width;
const PATH_W = Math.min(SCREEN_W, 480);
const WAVE = [0.5, 0.72, 0.82, 0.72, 0.5, 0.28, 0.18, 0.28];
const NODE_SIZE = 80;
const NODE_GAP = 148;
const FROG_SIZE = 80;

function useLoop(anim: Animated.Value, from: number, to: number, dur: number, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: to,   duration: dur, useNativeDriver: ND }),
        Animated.timing(anim, { toValue: from, duration: dur, useNativeDriver: ND }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [enabled]);
}

function PulseRing({ color }: { color: string }) {
  const scale   = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.7)).current;
  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale,   { toValue: 1.6, duration: 1000, useNativeDriver: ND }),
          Animated.timing(scale,   { toValue: 1,   duration: 1000, useNativeDriver: ND }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0,   duration: 1000, useNativeDriver: ND }),
          Animated.timing(opacity, { toValue: 0.7, duration: 1000, useNativeDriver: ND }),
        ]),
      ])
    ).start();
  }, []);
  const extra = 28;
  return (
    <Animated.View pointerEvents="none" style={{
      position: 'absolute',
      alignSelf: 'center',
      top: -(extra / 2),
      width: NODE_SIZE + extra, height: NODE_SIZE + extra,
      borderRadius: (NODE_SIZE + extra) / 2,
      borderWidth: 3, borderColor: color,
      transform: [{ scale }], opacity,
    }} />
  );
}

function TrailDots({ from, to, color, lit }: {
  from: { x: number; y: number }; to: { x: number; y: number };
  color: string; lit: boolean;
}) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const count = Math.max(2, Math.floor(dist / 16));
  const dots = [];
  for (let i = 1; i < count; i++) {
    const t = i / count;
    dots.push({ x: from.x + dx * t, y: from.y + dy * t });
  }
  return (
    <>
      {dots.map((d, i) => (
        <View key={i} style={{
          position: 'absolute',
          left: d.x - 5, top: d.y - 5,
          width: 10, height: 10, borderRadius: 5,
          backgroundColor: lit ? color + '99' : '#1e3040',
          borderWidth: 2,
          borderColor: lit ? color + 'cc' : '#253545',
        }} />
      ))}
    </>
  );
}

function PathNode({ lesson, idx, isDone, isUnlocked, isCurrent, due, color, x, y, onPress, onLockedPress, calloutLabel }: {
  lesson: any; idx: number; isDone: boolean; isUnlocked: boolean;
  isCurrent: boolean; due: number; color: string;
  x: number; y: number; onPress: () => void; onLockedPress: () => void; calloutLabel?: string;
}) {
  const bounce = useRef(new Animated.Value(0)).current;
  useLoop(bounce, 0, -10, 700, isCurrent);

  const pressScale = useRef(new Animated.Value(1)).current;
  const pressIn  = () => Animated.spring(pressScale, { toValue: 0.88, friction: 5, tension: 300, useNativeDriver: ND }).start();
  const pressOut = () => Animated.spring(pressScale, { toValue: 1,    friction: 5, tension: 300, useNativeDriver: ND }).start();

  const bg     = isDone ? '#58cc02' : isUnlocked ? color : '#1a2d3e';
  const border = isDone ? '#3ea800' : isUnlocked ? (isCurrent ? '#ffffff' : color + 'cc') : '#243548';

  return (
    <Animated.View style={{
      position: 'absolute',
      left: x - NODE_SIZE / 2,
      top: y - NODE_SIZE / 2,
      alignItems: 'center',
      transform: [{ translateY: bounce }, { scale: pressScale }],
    }}>
      {/* Callout pill above node */}
      {calloutLabel && (
        <View style={styles.calloutWrap}>
          <View style={[styles.callout, { backgroundColor: color }]}>
            <Text style={styles.calloutText}>{calloutLabel}</Text>
          </View>
          <View style={[styles.calloutCaret, { borderTopColor: color }]} />
        </View>
      )}
      {isCurrent && <PulseRing color={color} />}
      <Pressable
        onPress={() => isUnlocked ? onPress() : onLockedPress()}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={[styles.node, { backgroundColor: bg, borderColor: border, opacity: !isUnlocked ? 0.28 : 1 }]}
      >
        <Text style={isDone ? styles.nodeCheck : isUnlocked ? styles.nodeNum : styles.nodeLock}>
          {isDone ? '✓' : isUnlocked ? String(idx + 1) : '🔒'}
        </Text>
      </Pressable>
      <View style={styles.nodeLabel}>
        {due > 0 && !isDone && (
          <View style={styles.dueBadge}>
            <Text style={styles.dueBadgeText}>🔁 {due}</Text>
          </View>
        )}
        <Text style={[styles.nodeName, { color: isUnlocked ? '#daeaf5' : '#2e4455' }]} numberOfLines={2}>
          {isUnlocked ? lesson.title : '???'}
        </Text>
      </View>
    </Animated.View>
  );
}

function ReviewNode({ x, y, dueCount, onPress }: { x: number; y: number; dueCount: number; onPress: () => void }) {
  const bounce = useRef(new Animated.Value(0)).current;
  useLoop(bounce, 0, -7, 900);
  const pressScale = useRef(new Animated.Value(1)).current;
  const pressIn  = () => Animated.spring(pressScale, { toValue: 0.88, friction: 5, tension: 300, useNativeDriver: ND }).start();
  const pressOut = () => Animated.spring(pressScale, { toValue: 1,    friction: 5, tension: 300, useNativeDriver: ND }).start();
  return (
    <Animated.View style={{
      position: 'absolute',
      left: x - NODE_SIZE / 2, top: y - NODE_SIZE / 2,
      alignItems: 'center',
      transform: [{ translateY: bounce }, { scale: pressScale }],
    }}>
      <PulseRing color="#ff9600" />
      <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}
        style={[styles.node, { backgroundColor: '#2a1400', borderColor: '#ff9600' }]}>
        <Text style={{ fontSize: 28 }}>🔁</Text>
      </Pressable>
      <View style={styles.nodeLabel}>
        <Text style={[styles.nodeName, { color: '#ff9600' }]}>Review</Text>
        <Text style={[styles.nodeName, { color: '#7a5030', fontSize: 10 }]}>{dueCount} due</Text>
      </View>
    </Animated.View>
  );
}

export default function SectionScreen() {
  const { id }    = useLocalSearchParams<{ id: string }>();
  const router    = useRouter();
  const insets    = useSafeAreaInsets();
  const completed        = useStore((s) => s.completed);
  const sm2              = useStore((s) => s.sm2);
  const hearts           = useStore((s) => s.hearts);
  const setPendingReview = useStore((s) => s.setPendingReview);
  const [lockedToast, setLockedToast] = useState(false);

  const frogBob = useRef(new Animated.Value(0)).current;
  useLoop(frogBob, 0, -10, 1400);

  const sec = ALL_SECTIONS.find((s) => s.id === id);
  if (!sec) {
    return (
      <View style={[styles.root, styles.errorState, { paddingTop: insets.top + 40 }]}>
        <BackButton onPress={() => router.back()} />
        <Image
          source={require('../../assets/animations/frog/incorrect.png')}
          style={styles.errorFrog}
          resizeMode="contain"
        />
        <Text style={styles.errorTitle}>Chapter not found.</Text>
        <Text style={styles.errorBody}>
          This chapter doesn't exist in our library. Let's go back.
        </Text>
      </View>
    );
  }

  // Empty section — content is still being authored.
  if (sec.lessons.length === 0) {
    return (
      <View style={[styles.root, styles.errorState, { paddingTop: insets.top + 40 }]}>
        <BackButton onPress={() => router.back()} />
        <Image
          source={require('../../assets/animations/frog/idle.png')}
          style={styles.errorFrog}
          resizeMode="contain"
        />
        <Text style={styles.errorTitle}>Coming soon.</Text>
        <Text style={styles.errorBody}>
          This chapter is being written. Check back soon.
        </Text>
      </View>
    );
  }

  const parentMod = ALL_MODULES.find((m) => m.sections.includes(id!));
  const color     = parentMod?.color ?? '#1cb0f6';
  const dueCount  = getDueCount(sm2, sec);

  const doneLessons = sec.lessons.filter((l) => !!completed[`${id}:${l.id}`]?.done).length;
  const pct = sec.lessons.length > 0 ? doneLessons / sec.lessons.length : 0;

  const totalNodes = sec.lessons.length + (dueCount > 0 ? 1 : 0);
  const canvasH    = totalNodes * NODE_GAP + NODE_SIZE + 120;

  function nodePos(i: number) {
    return {
      x: WAVE[i % WAVE.length] * PATH_W,
      y: NODE_SIZE / 2 + i * NODE_GAP + 48,
    };
  }

  function showLockedToast() {
    setLockedToast(true);
    setTimeout(() => setLockedToast(false), 2200);
  }

  return (
    <View style={styles.root}>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[color + 'bb', color + '33', '#0e1a20']}
        start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 12 }]}
      >
        <BackButton onPress={() => router.back()} />
        <Text style={styles.heroIcon}>{sec.icon}</Text>
        <Text style={styles.heroTitle}>{sec.title}</Text>
        <View style={styles.heroPillRow}>
          <HeroPill label={`${sec.lessons.length} lessons`} />
          {dueCount > 0 && (
            <HeroPill label={`🔁 ${dueCount} due`} textColor="#ff9600" bg="#2a180044" border="#ff960066" />
          )}
          <HeroPill label={`${Math.round(pct * 100)}% done`} textColor={color} bg={color + '33'} border={color + '77'} />
        </View>
        <HeroProgressBar pct={pct} color={color} />
      </LinearGradient>

      {/* Path canvas */}
      <View style={[styles.pathCanvas, { height: canvasH, width: PATH_W }]}>
        {/* Frog mascot beside active node */}
        {doneLessons < sec.lessons.length && (() => {
          const pos = nodePos(doneLessons);
          const onRight = pos.x <= PATH_W / 2;
          const frogLeft = onRight
            ? pos.x + NODE_SIZE / 2 + 10
            : pos.x - NODE_SIZE / 2 - FROG_SIZE - 10;
          return (
            <Animated.Image
              source={require('../../assets/animations/frog/thinking.png')}
              style={{
                position: 'absolute',
                width: FROG_SIZE, height: FROG_SIZE,
                left: frogLeft,
                top: pos.y - FROG_SIZE / 2 + 4,
                transform: [{ translateY: frogBob }],
              }}
              resizeMode="contain"
            />
          );
        })()}
        {/* Trail dots */}
        {sec.lessons.map((_, i) => {
          if (i === 0) return null;
          const prevDone = !!completed[`${id}:${sec.lessons[i - 1].id}`]?.done;
          return <TrailDots key={`t${i}`} from={nodePos(i - 1)} to={nodePos(i)} color={color} lit={prevDone} />;
        })}
        {dueCount > 0 && sec.lessons.length > 0 && (
          <TrailDots
            from={nodePos(sec.lessons.length - 1)}
            to={nodePos(sec.lessons.length)}
            color="#ff9600"
            lit={!!completed[`${id}:${sec.lessons[sec.lessons.length - 1].id}`]?.done}
          />
        )}

        {/* Lesson nodes */}
        {sec.lessons.map((lesson, i) => {
          const key       = `${id}:${lesson.id}`;
          const isDone    = !!completed[key]?.done;
          const prevKey   = i === 0 ? null : `${id}:${sec.lessons[i - 1].id}`;
          const isUnlocked = prevKey === null || !!completed[prevKey]?.done;
          const isCurrent  = isUnlocked && !isDone && i === doneLessons;
          const due        = getLessonDueCount(sm2, lesson);
          const { x, y }  = nodePos(i);
          return (
            <PathNode key={lesson.id} lesson={lesson} idx={i}
              isDone={isDone} isUnlocked={isUnlocked} isCurrent={isCurrent}
              due={due} color={color} x={x} y={y}
              calloutLabel={isCurrent ? (doneLessons === 0 ? '▶  CONNECT' : '▶  CONTINUE') : undefined}
              onPress={() => {
                // B3: Gate lesson entry when hearts are spent.
                if (hearts === 0) {
                  Alert.alert(
                    'Hearts Spent',
                    'Your hearts are spent. Rest and return tomorrow, apprentice.',
                    [{ text: 'OK' }],
                  );
                  return;
                }
                router.push(`/quiz/${id}:${lesson.id}`);
              }}
              onLockedPress={showLockedToast}
            />
          );
        })}

        {/* Review node */}
        {dueCount > 0 && (() => {
          const { x, y } = nodePos(sec.lessons.length);
          return (
            <ReviewNode x={x} y={y} dueCount={dueCount} onPress={() => {
              if (hearts === 0) {
                Alert.alert(
                  'Hearts Spent',
                  'Your hearts are spent. Rest and return tomorrow, apprentice.',
                  [{ text: 'OK' }],
                );
                return;
              }
              const reviewLesson = buildReviewLesson(sm2, sec);
              setPendingReview(reviewLesson);
              router.push(`/quiz/review-${id}`);
            }} />
          );
        })()}
      </View>
    </ScrollView>

    {/* Locked node feedback toast (P8) */}
    {lockedToast && (
      <View style={styles.lockedToast} pointerEvents="none">
        <Text style={styles.lockedToastText}>
          🔒 Complete the previous lesson to unlock this one.
        </Text>
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  // Error + empty states
  errorState:  { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  errorFrog:   { width: 160, height: 160, marginBottom: 24 },
  errorTitle:  { fontSize: 24, fontWeight: '900', color: '#ffffff', textAlign: 'center', marginBottom: 12 },
  errorBody:   { fontSize: 15, color: '#4a7080', textAlign: 'center', lineHeight: 24 },

  // Locked toast
  lockedToast: {
    position: 'absolute', bottom: 40, alignSelf: 'center',
    backgroundColor: '#1a2d3e', borderRadius: 20,
    paddingHorizontal: 20, paddingVertical: 12,
    borderWidth: 1, borderColor: '#2a4a60',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8, elevation: 8,
  },
  lockedToastText: { fontSize: 14, fontWeight: '700', color: '#daeaf5' },
  hero: { paddingHorizontal: SPACING.screen, paddingBottom: SPACING.heroBottom },
  heroIcon:  { fontSize: 48, marginBottom: 10 },
  heroTitle: { fontSize: 26, fontWeight: '900', color: '#ffffff', marginBottom: 14 },
  heroPillRow: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  calloutWrap: { position: 'absolute', alignSelf: 'center', top: -52, alignItems: 'center' },
  callout:     { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20 },
  calloutText: { color: '#ffffff', fontSize: 12, fontWeight: '900', letterSpacing: 1.2 },
  calloutCaret: {
    width: 0, height: 0,
    borderLeftWidth: 7, borderRightWidth: 7, borderTopWidth: 7,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
  },
  pathCanvas:  { alignSelf: 'center', position: 'relative' },
  node: {
    width: NODE_SIZE, height: NODE_SIZE, borderRadius: NODE_SIZE / 2, borderWidth: 4,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 14,
    elevation: 12,
  },
  nodeCheck: { fontSize: 34, color: '#fff', fontWeight: '900' },
  nodeNum:   { fontSize: 28, color: '#fff', fontWeight: '900' },
  nodeLock:  { fontSize: 26 },
  nodeLabel: { alignItems: 'center', marginTop: 10, maxWidth: 120 },
  nodeName:  { fontSize: 12, fontWeight: '700', textAlign: 'center', lineHeight: 16, color: '#daeaf5' },
  dueBadge:  {
    backgroundColor: '#2a1800', borderColor: '#ff960088', borderWidth: 1,
    borderRadius: 10, paddingHorizontal: 7, paddingVertical: 3, marginBottom: 5,
  },
  dueBadgeText: { fontSize: 10, color: '#ff9600', fontWeight: '800' },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MUTED_HERO } from '../lib/theme';

/** Single pill chip used inside hero gradient banners. */
export function HeroPill({
  label, textColor, bg, border,
}: {
  label: string;
  textColor?: string;
  bg?: string;
  border?: string;
}) {
  return (
    <View style={[
      styles.pill,
      bg     ? { backgroundColor: bg }     : undefined,
      border ? { borderColor: border }      : undefined,
    ]}>
      <Text style={[styles.text, textColor ? { color: textColor } : undefined]}>{label}</Text>
    </View>
  );
}

/** Full-width progress bar used at the bottom of hero gradient banners. */
export function HeroProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={styles.bar}>
      <View style={[styles.barFill, { width: `${pct * 100}%` as any, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.2)',
  },
  text: { fontSize: 12, color: MUTED_HERO, fontWeight: '700' },
  bar:     { height: 8, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 99, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 99 },
});

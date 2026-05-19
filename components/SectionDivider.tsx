import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { BORDER } from '../lib/theme';

export function SectionDivider({ label, style }: { label: string; style?: ViewStyle }) {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  line:  { flex: 1, height: 1, backgroundColor: BORDER },
  label: { fontSize: 11, fontWeight: '800', color: '#2a4a5a', letterSpacing: 2 },
});

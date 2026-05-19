import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MUTED_HERO } from '../lib/theme';

export function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.backBtn}>
      <Text style={styles.backText}>← Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backBtn:  { paddingVertical: 10, marginBottom: 12 },
  backText: { color: MUTED_HERO, fontSize: 15, fontWeight: '600' },
});

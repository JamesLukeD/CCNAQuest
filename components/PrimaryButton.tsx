import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { SURFACE_1, RADIUS, SPACING, FONT } from '../lib/theme';

export function PrimaryButton({
  label, onPress, color = '#1cb0f6', variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  color?: string;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        variant === 'primary'
          ? { backgroundColor: color }
          : { backgroundColor: SURFACE_1, borderWidth: 2, borderColor: color },
        { opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.label, variant === 'secondary' && { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn:   { borderRadius: RADIUS.md, paddingVertical: SPACING.btnV, alignItems: 'center' },
  label: { fontSize: FONT.ctaSize, fontWeight: FONT.ctaWeight, color: '#ffffff' },
});

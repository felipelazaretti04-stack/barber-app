import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppointmentStatus } from '../types/app';
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../constants/theme';

interface StatusBadgeProps {
  status: AppointmentStatus;
}

const statusConfig: Record<AppointmentStatus, { label: string; color: string; bg: string }> = {
  confirmado: {
    label: 'Confirmado',
    color: colors.info,
    bg: 'rgba(59, 130, 246, 0.15)',
  },
  concluido: {
    label: 'Concluído',
    color: colors.success,
    bg: 'rgba(34, 197, 94, 0.15)',
  },
  cancelado: {
    label: 'Cancelado',
    color: colors.error,
    bg: 'rgba(239, 68, 68, 0.15)',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
});

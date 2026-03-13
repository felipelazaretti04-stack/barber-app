import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Header, MetricCard } from '../src/components';
import { getDashboardMetrics } from '../src/services/appointments-service';
import { formatPrice } from '../src/services/services-service';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants/theme';

export default function AdminScreen() {
  const router = useRouter();
  const metrics = getDashboardMetrics();

  const menuItems = [
    {
      title: 'Agendamentos',
      description: 'Ver agenda do dia',
      icon: 'calendar' as const,
      route: '/admin-schedule',
      color: colors.info,
    },
    {
      title: 'Clientes',
      description: 'Gerenciar clientes',
      icon: 'people' as const,
      route: '/admin-clients',
      color: colors.success,
    },
    {
      title: 'Histórico',
      description: 'Atendimentos realizados',
      icon: 'time' as const,
      route: '/admin-history',
      color: colors.warning,
    },
    {
      title: 'Financeiro',
      description: 'Faturamento e métricas',
      icon: 'cash' as const,
      route: '/admin-finance',
      color: colors.primary,
    },
  ];

  return (
    <ScreenContainer>
      <Header title="Área Administrativa" />

      <View style={styles.metricsGrid}>
        <MetricCard
          title="Agendamentos Hoje"
          value={metrics.appointmentsToday}
          icon="calendar-outline"
          iconColor={colors.info}
        />
        <MetricCard
          title="Faturamento Mês"
          value={formatPrice(metrics.monthlyRevenue)}
          icon="trending-up-outline"
          iconColor={colors.success}
        />
        <MetricCard
          title="Total Clientes"
          value={metrics.totalClients}
          icon="people-outline"
          iconColor={colors.warning}
        />
        <MetricCard
          title="Total Atendimentos"
          value={metrics.totalAppointments}
          icon="checkmark-circle-outline"
          iconColor={colors.primary}
        />
      </View>

      <Text style={styles.sectionTitle}>Menu</Text>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route as any)}
          >
            <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  menuContainer: {
    gap: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  menuDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});

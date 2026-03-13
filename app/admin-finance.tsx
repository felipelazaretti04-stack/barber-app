import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Header, Card, MetricCard } from '../src/components';
import { getMonthlyFinance } from '../src/services/appointments-service';
import { formatPrice } from '../src/services/services-service';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants/theme';

export default function AdminFinanceScreen() {
  const finance = getMonthlyFinance();

  const currentMonth = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <ScreenContainer>
      <Header title="Financeiro" />

      <View style={styles.monthHeader}>
        <Ionicons name="calendar" size={20} color={colors.primary} />
        <Text style={styles.monthText}>{currentMonth}</Text>
      </View>

      <View style={styles.mainMetric}>
        <Text style={styles.mainMetricLabel}>Faturamento do Mês</Text>
        <Text style={styles.mainMetricValue}>{formatPrice(finance.revenue)}</Text>
        <Text style={styles.mainMetricSubtitle}>
          {finance.count} atendimentos realizados
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard
          title="Atendimentos"
          value={finance.count}
          icon="checkmark-circle-outline"
          iconColor={colors.success}
        />
        <MetricCard
          title="Ticket Médio"
          value={formatPrice(finance.averageTicket)}
          icon="receipt-outline"
          iconColor={colors.info}
        />
      </View>

      <Text style={styles.sectionTitle}>Faturamento por Serviço</Text>

      {finance.byService.map((service, index) => {
        const percentage = finance.revenue > 0 
          ? (service.revenue / finance.revenue * 100).toFixed(0) 
          : 0;

        return (
          <Card key={index} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceCount}>{service.count} atendimentos</Text>
              </View>
              <View style={styles.serviceRevenue}>
                <Text style={styles.servicePrice}>{formatPrice(service.revenue)}</Text>
                <Text style={styles.servicePercentage}>{percentage}%</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${percentage}%` }
                ]} 
              />
            </View>
          </Card>
        );
      })}

      {finance.byService.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons name="cash-outline" size={64} color={colors.textMuted} />
          <Text style={styles.emptyText}>Nenhum faturamento registrado neste mês</Text>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  monthText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  mainMetric: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  mainMetricLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  mainMetricValue: {
    fontSize: 40,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  mainMetricSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  serviceCard: {
    marginBottom: spacing.sm,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  serviceCount: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  serviceRevenue: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  servicePercentage: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Header, Card, StatusBadge } from '../src/components';
import { getAppointmentHistory } from '../src/services/appointments-service';
import { formatPrice } from '../src/services/services-service';
import { formatDate } from '../src/services/schedule-service';
import { Appointment } from '../src/types/app';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants/theme';

export default function AdminHistoryScreen() {
  const history = getAppointmentHistory();

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <Card style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>

      <View style={styles.cardContent}>
        <Image source={{ uri: item.barber.avatar }} style={styles.barberAvatar} />
        <View style={styles.appointmentInfo}>
          <Text style={styles.customerName}>{item.customer.name}</Text>
          <Text style={styles.serviceName}>{item.service.name}</Text>
          <Text style={styles.barberName}>Atendido por {item.barber.name}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[
            styles.price,
            item.status === 'cancelado' && styles.priceCanceled
          ]}>
            {formatPrice(item.service.price)}
          </Text>
        </View>
      </View>
    </Card>
  );

  const completedCount = history.filter(h => h.status === 'concluido').length;
  const canceledCount = history.filter(h => h.status === 'cancelado').length;

  return (
    <ScreenContainer scroll={false}>
      <Header title="Histórico" />

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: `${colors.success}15` }]}>
          <Text style={[styles.statValue, { color: colors.success }]}>{completedCount}</Text>
          <Text style={styles.statLabel}>Concluídos</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: `${colors.error}15` }]}>
          <Text style={[styles.statValue, { color: colors.error }]}>{canceledCount}</Text>
          <Text style={styles.statLabel}>Cancelados</Text>
        </View>
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="time-outline" size={64} color={colors.textMuted} />
          <Text style={styles.emptyText}>Nenhum histórico encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointment}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  historyCard: {
    marginBottom: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dateText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  timeText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barberAvatar: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  appointmentInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  serviceName: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginVertical: spacing.xs,
  },
  barberName: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  priceCanceled: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  emptyContainer: {
    flex: 1,
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

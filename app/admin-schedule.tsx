import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Header, Card, StatusBadge } from '../src/components';
import { getAllAppointments, getAppointmentsByDate } from '../src/services/appointments-service';
import { formatPrice } from '../src/services/services-service';
import { getNextDays, formatShortDate } from '../src/services/schedule-service';
import { Appointment } from '../src/types/app';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants/theme';

export default function AdminScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const days = getNextDays(7);
  const appointments = getAppointmentsByDate(selectedDate);

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <Card style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>

      <View style={styles.appointmentContent}>
        <Image source={{ uri: item.barber.avatar }} style={styles.barberAvatar} />
        <View style={styles.appointmentInfo}>
          <Text style={styles.customerName}>{item.customer.name}</Text>
          <Text style={styles.serviceName}>{item.service.name}</Text>
          <Text style={styles.barberName}>com {item.barber.name}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(item.service.price)}</Text>
      </View>

      <View style={styles.appointmentFooter}>
        <View style={styles.phoneContainer}>
          <Ionicons name="call-outline" size={14} color={colors.textMuted} />
          <Text style={styles.phoneText}>{item.customer.phone}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <ScreenContainer scroll={false}>
      <Header title="Agendamentos" />

      <View style={styles.datesContainer}>
        {days.map((day) => {
          const isSelected = selectedDate === day.date;
          const isToday = day.date === new Date().toISOString().split('T')[0];

          return (
            <TouchableOpacity
              key={day.date}
              style={[styles.dateCard, isSelected && styles.dateCardSelected]}
              onPress={() => setSelectedDate(day.date)}
            >
              <Text style={[styles.dayOfWeek, isSelected && styles.dateTextSelected]}>
                {day.dayOfWeek}
              </Text>
              <Text style={[styles.dateLabel, isSelected && styles.dateTextSelected]}>
                {day.label.split(' ')[0]}
              </Text>
              {isToday && !isSelected && <View style={styles.todayDot} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {appointments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={64} color={colors.textMuted} />
          <Text style={styles.emptyText}>Nenhum agendamento para este dia</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
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
  datesContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  dateCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayOfWeek: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  dateLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  dateTextSelected: {
    color: colors.background,
  },
  todayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  appointmentCard: {
    marginBottom: spacing.sm,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  timeText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  appointmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barberAvatar: {
    width: 48,
    height: 48,
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
  price: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  appointmentFooter: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  phoneText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
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

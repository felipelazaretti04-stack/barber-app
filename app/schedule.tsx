import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer, Header, Button } from '../src/components';
import { useBooking } from '../src/services/booking-context';
import { getNextDays, getAvailableTimeSlots } from '../src/services/schedule-service';
import { TimeSlot } from '../src/types/app';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants/theme';

export default function ScheduleScreen() {
  const router = useRouter();
  const { booking, setDate, setTime } = useBooking();
  const [selectedDate, setSelectedDate] = useState<string | null>(booking.date);
  const [selectedTime, setSelectedTime] = useState<string | null>(booking.time);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const days = getNextDays(14);

  useEffect(() => {
    if (selectedDate && booking.barber) {
      const slots = getAvailableTimeSlots(selectedDate, booking.barber.id);
      setTimeSlots(slots);
      // Reset time if it's no longer available
      if (selectedTime && !slots.find(s => s.time === selectedTime && s.available)) {
        setSelectedTime(null);
      }
    }
  }, [selectedDate, booking.barber]);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setDate(date);
    setSelectedTime(null);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      router.push('/customer');
    }
  };

  return (
    <ScreenContainer>
      <Header title="Escolha Data e Horário" />

      <Text style={styles.sectionTitle}>Selecione a Data</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.datesContainer}
        contentContainerStyle={styles.datesContent}
      >
        {days.map((day) => {
          const isSelected = selectedDate === day.date;
          const isToday = day.date === new Date().toISOString().split('T')[0];

          return (
            <TouchableOpacity
              key={day.date}
              style={[styles.dateCard, isSelected && styles.dateCardSelected]}
              onPress={() => handleSelectDate(day.date)}
            >
              <Text style={[styles.dayOfWeek, isSelected && styles.dateTextSelected]}>
                {day.dayOfWeek}
              </Text>
              <Text style={[styles.dateLabel, isSelected && styles.dateTextSelected]}>
                {day.label}
              </Text>
              {isToday && <Text style={styles.todayBadge}>Hoje</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {selectedDate && (
        <>
          <Text style={styles.sectionTitle}>Horários Disponíveis</Text>
          <View style={styles.timeSlotsContainer}>
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot.time;

              return (
                <TouchableOpacity
                  key={slot.time}
                  style={[
                    styles.timeSlot,
                    isSelected && styles.timeSlotSelected,
                    !slot.available && styles.timeSlotUnavailable,
                  ]}
                  onPress={() => slot.available && handleSelectTime(slot.time)}
                  disabled={!slot.available}
                >
                  <Text
                    style={[
                      styles.timeText,
                      isSelected && styles.timeTextSelected,
                      !slot.available && styles.timeTextUnavailable,
                    ]}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      <View style={styles.footer}>
        <Button
          title="Continuar"
          onPress={handleContinue}
          disabled={!selectedDate || !selectedTime}
          size="lg"
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  datesContainer: {
    marginBottom: spacing.lg,
  },
  datesContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  dateCard: {
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 70,
    marginRight: spacing.sm,
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
  todayBadge: {
    fontSize: fontSize.xs,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  timeSlot: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 70,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotUnavailable: {
    opacity: 0.4,
    backgroundColor: colors.backgroundLight,
  },
  timeText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  timeTextSelected: {
    color: colors.background,
  },
  timeTextUnavailable: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  footer: {
    marginTop: 'auto',
    padding: spacing.md,
  },
  button: {
    width: '100%',
  },
});

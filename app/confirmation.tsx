import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Header, Card, Button } from '../src/components';
import { useBooking } from '../src/services/booking-context';
import { createAppointment } from '../src/services/appointments-service';
import { formatPrice } from '../src/services/services-service';
import { formatDate } from '../src/services/schedule-service';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants/theme';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { booking, resetBooking } = useBooking();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setLoading(true);

    // Simula uma chamada de API
    setTimeout(() => {
      createAppointment(booking);
      setLoading(false);
      setConfirmed(true);
    }, 1500);
  };

  const handleGoHome = () => {
    resetBooking();
    router.replace('/');
  };

  if (confirmed) {
    return (
      <ScreenContainer>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color={colors.success} />
          </View>
          <Text style={styles.successTitle}>Agendamento Confirmado!</Text>
          <Text style={styles.successMessage}>
            Você receberá uma confirmação por WhatsApp
          </Text>
          <View style={styles.successDetails}>
            <Text style={styles.successDetailText}>
              {booking.date && formatDate(booking.date)} às {booking.time}
            </Text>
            <Text style={styles.successDetailText}>
              com {booking.barber?.name}
            </Text>
          </View>
          <Button
            title="Voltar ao Início"
            onPress={handleGoHome}
            size="lg"
            style={styles.successButton}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Header title="Confirmar Agendamento" />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Resumo do Agendamento</Text>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryIcon}>
              <Ionicons name="cut" size={20} color={colors.primary} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>Serviço</Text>
              <Text style={styles.summaryValue}>{booking.service?.name}</Text>
            </View>
            <Text style={styles.summaryPrice}>
              {booking.service && formatPrice(booking.service.price)}
            </Text>
          </View>
        </Card>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Image
              source={{ uri: booking.barber?.avatar }}
              style={styles.barberAvatar}
            />
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>Barbeiro</Text>
              <Text style={styles.summaryValue}>{booking.barber?.name}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryIcon}>
              <Ionicons name="calendar" size={20} color={colors.primary} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>Data e Horário</Text>
              <Text style={styles.summaryValue}>
                {booking.date && formatDate(booking.date)}
              </Text>
              <Text style={styles.summaryTime}>{booking.time}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryIcon}>
              <Ionicons name="person" size={20} color={colors.primary} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>Cliente</Text>
              <Text style={styles.summaryValue}>{booking.customerName}</Text>
              <Text style={styles.summaryPhone}>{booking.customerPhone}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total a Pagar</Text>
          <Text style={styles.totalValue}>
            {booking.service && formatPrice(booking.service.price)}
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Confirmar Agendamento"
            onPress={handleConfirm}
            loading={loading}
            size="lg"
            style={styles.button}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  summaryCard: {
    marginBottom: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  barberAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  summaryPrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  summaryTime: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
    marginTop: spacing.xs,
  },
  summaryPhone: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
  },
  totalLabel: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: spacing.lg,
  },
  button: {
    width: '100%',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  successIcon: {
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  successDetails: {
    backgroundColor: colors.backgroundCard,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  successDetailText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  successButton: {
    width: '100%',
  },
});

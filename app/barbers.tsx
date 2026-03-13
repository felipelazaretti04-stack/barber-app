import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Header, Card, Button } from '../src/components';
import { useBooking } from '../src/services/booking-context';
import { getAllBarbers, formatRating } from '../src/services/barbers-service';
import { Barber } from '../src/types/app';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants/theme';

export default function BarbersScreen() {
  const router = useRouter();
  const { booking, setBarber } = useBooking();
  const barbers = getAllBarbers();

  const handleSelectBarber = (barber: Barber) => {
    setBarber(barber);
  };

  const handleContinue = () => {
    if (booking.barber) {
      router.push('/schedule');
    }
  };

  const renderBarber = ({ item }: { item: Barber }) => {
    const isSelected = booking.barber?.id === item.id;

    return (
      <Card
        style={styles.barberCard}
        onPress={() => handleSelectBarber(item)}
        selected={isSelected}
      >
        <View style={styles.barberContent}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.barberInfo}>
            <Text style={styles.barberName}>{item.name}</Text>
            <Text style={styles.barberSpecialty}>{item.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={colors.primary} />
              <Text style={styles.ratingText}>{formatRating(item.rating)}</Text>
            </View>
          </View>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
          )}
        </View>
      </Card>
    );
  };

  return (
    <ScreenContainer scroll={false}>
      <Header title="Escolha o Barbeiro" />
      <FlatList
        data={barbers}
        keyExtractor={(item) => item.id}
        renderItem={renderBarber}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <Button
          title="Continuar"
          onPress={handleContinue}
          disabled={!booking.barber}
          size="lg"
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.md,
    gap: spacing.md,
  },
  barberCard: {
    marginBottom: spacing.sm,
  },
  barberContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  barberInfo: {
    flex: 1,
  },
  barberName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  barberSpecialty: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  button: {
    width: '100%',
  },
});

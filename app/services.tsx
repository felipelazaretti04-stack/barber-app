// app/services.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header, Card, Button } from '../src/components';
import { useBooking } from '../src/services/booking-context';
import { getAllServices, formatPrice, formatDuration } from '../src/services/services-service';
import { Service } from '../src/types/app';
import { colors, spacing, fontSize, fontWeight } from '../src/constants/theme';

export default function ServicesScreen() {
  const router = useRouter();
  const { booking, setService } = useBooking();
  const services = getAllServices();

  const handleSelectService = (service: Service) => {
    setService(service);
  };

  const handleContinue = () => {
    if (booking.service) {
      router.push('/barbers');
    }
  };

  const renderService = ({ item }: { item: Service }) => {
    const isSelected = booking.service?.id === item.id;

    return (
      <Card
        style={styles.serviceCard}
        onPress={() => handleSelectService(item)}
        selected={isSelected}
      >
        <View style={styles.serviceHeader}>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
          </View>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
          )}
        </View>
        <View style={styles.serviceFooter}>
          <View style={styles.serviceMeta}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={styles.serviceMetaText}>{formatDuration(item.duration)}</Text>
          </View>
          <Text style={styles.servicePrice}>{formatPrice(item.price)}</Text>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Escolha o Serviço" />
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderService}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
      <View style={styles.footer}>
        <Button
          title="Continuar"
          onPress={handleContinue}
          disabled={!booking.service}
          size="lg"
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flatList: {
    flex: 1,
  },
  list: {
    padding: spacing.md,
  },
  serviceCard: {
    marginBottom: spacing.md,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  serviceInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  serviceName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  serviceDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  serviceMetaText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  servicePrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  footer: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  button: {
    width: '100%',
  },
});

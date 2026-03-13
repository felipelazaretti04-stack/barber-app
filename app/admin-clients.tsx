import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Header, Card } from '../src/components';
import { getAllCustomers } from '../src/services/appointments-service';
import { Customer } from '../src/types/app';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants/theme';

export default function AdminClientsScreen() {
  const customers = getAllCustomers();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderCustomer = ({ item, index }: { item: Customer; index: number }) => (
    <Card style={styles.clientCard}>
      <View style={styles.clientContent}>
        <View style={[styles.avatar, { backgroundColor: getAvatarColor(index) }]}>
          <Text style={styles.avatarText}>
            {item.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </Text>
        </View>
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{item.name}</Text>
          <View style={styles.phoneContainer}>
            <Ionicons name="call-outline" size={14} color={colors.textMuted} />
            <Text style={styles.phoneText}>{item.phone}</Text>
          </View>
        </View>
        <View style={styles.clientMeta}>
          <Text style={styles.clientSince}>Cliente desde</Text>
          <Text style={styles.clientDate}>{formatDate(item.createdAt)}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <ScreenContainer scroll={false}>
      <Header title="Clientes" />

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="people" size={24} color={colors.primary} />
          <Text style={styles.statValue}>{customers.length}</Text>
          <Text style={styles.statLabel}>Total de Clientes</Text>
        </View>
      </View>

      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomer}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const getAvatarColor = (index: number) => {
  const colors = ['#C9A227', '#3B82F6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  statsContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  statCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginVertical: spacing.sm,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  clientCard: {
    marginBottom: spacing.sm,
  },
  clientContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.background,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
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
  clientMeta: {
    alignItems: 'flex-end',
  },
  clientSince: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  clientDate: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
});

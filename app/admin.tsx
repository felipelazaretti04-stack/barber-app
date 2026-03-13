import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getDashboardMetrics } from '../src/services/appointments-service';
import { formatPrice } from '../src/services/services-service';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows } from '../src/constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isDesktop = width >= 1024;

export default function AdminScreen() {
  const router = useRouter();
  const metrics = getDashboardMetrics();

  const menuItems = [
    {
      title: 'Agendamentos',
      description: 'Gerenciar agenda e horários',
      icon: 'calendar' as const,
      route: '/admin-schedule',
      gradient: ['#3B82F6', '#2563EB'],
    },
    {
      title: 'Clientes',
      description: 'Base de clientes cadastrados',
      icon: 'people' as const,
      route: '/admin-clients',
      gradient: ['#22C55E', '#16A34A'],
    },
    {
      title: 'Histórico',
      description: 'Atendimentos realizados',
      icon: 'time' as const,
      route: '/admin-history',
      gradient: ['#F59E0B', '#D97706'],
    },
    {
      title: 'Financeiro',
      description: 'Faturamento e relatórios',
      icon: 'cash' as const,
      route: '/admin-finance',
      gradient: ['#8B5CF6', '#7C3AED'],
    },
  ];

  const metricsData = [
    {
      title: 'Agendamentos Hoje',
      value: metrics.appointmentsToday,
      icon: 'calendar-outline' as const,
      gradient: ['#3B82F6', '#2563EB'],
      change: '+12%',
      changePositive: true,
    },
    {
      title: 'Faturamento Mês',
      value: formatPrice(metrics.monthlyRevenue),
      icon: 'trending-up-outline' as const,
      gradient: ['#22C55E', '#16A34A'],
      change: '+8%',
      changePositive: true,
    },
    {
      title: 'Total Clientes',
      value: metrics.totalClients,
      icon: 'people-outline' as const,
      gradient: ['#F59E0B', '#D97706'],
      change: '+5',
      changePositive: true,
    },
    {
      title: 'Atendimentos',
      value: metrics.totalAppointments,
      icon: 'checkmark-circle-outline' as const,
      gradient: ['#8B5CF6', '#7C3AED'],
      change: '+15%',
      changePositive: true,
    },
  ];

  const renderMetricCard = (metric: typeof metricsData[0], index: number) => (
    <View key={index} style={[styles.metricCard, isTablet && styles.metricCardTablet]}>
      <LinearGradient
        colors={metric.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.metricGradient}
      >
        <View style={styles.metricHeader}>
          <View style={styles.metricIconContainer}>
            <Ionicons name={metric.icon} size={24} color="#FFFFFF" />
          </View>
          <View style={styles.metricChange}>
            <Ionicons
              name={metric.changePositive ? 'trending-up' : 'trending-down'}
              size={14}
              color="#FFFFFF"
            />
            <Text style={styles.metricChangeText}>{metric.change}</Text>
          </View>
        </View>
        <Text style={styles.metricValue}>{metric.value}</Text>
        <Text style={styles.metricTitle}>{metric.title}</Text>
      </LinearGradient>
    </View>
  );

  const renderMenuItem = (item: typeof menuItems[0], index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.menuItem, isDesktop && styles.menuItemDesktop]}
      onPress={() => router.push(item.route as any)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={item.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.menuIconGradient}
      >
        <Ionicons name={item.icon} size={28} color="#FFFFFF" />
      </LinearGradient>
      <View style={styles.menuInfo}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
      </View>
      <View style={styles.menuArrow}>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.backgroundLight]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, isDesktop && styles.contentDesktop]}>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Olá, Admin</Text>
                <Text style={styles.title}>Painel de Controle</Text>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <View style={styles.notificationBadge} />
                <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <View style={[styles.metricsGrid, isTablet && styles.metricsGridTablet]}>
              {metricsData.map(renderMetricCard)}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Acesso Rápido</Text>
                <TouchableOpacity>
                  <Text style={styles.sectionLink}>Ver Tudo</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.menuGrid, isDesktop && styles.menuGridDesktop]}>
                {menuItems.map(renderMenuItem)}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Atividade Recente</Text>
                <TouchableOpacity>
                  <Text style={styles.sectionLink}>Ver Histórico</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.activityContainer}>
                {[
                  {
                    icon: 'checkmark-circle',
                    color: colors.success,
                    title: 'Agendamento confirmado',
                    subtitle: 'João Silva - Corte + Barba',
                    time: 'Há 5 min'
                  },
                  {
                    icon: 'person-add',
                    color: colors.info,
                    title: 'Novo cliente cadastrado',
                    subtitle: 'Carlos Mendes',
                    time: 'Há 12 min'
                  },
                  {
                    icon: 'cash',
                    color: colors.warning,
                    title: 'Pagamento recebido',
                    subtitle: 'R$ 70,00 - Corte Degradê',
                    time: 'Há 25 min'
                  },
                ].map((activity, index) => (
                  <View key={index} style={styles.activityItem}>
                    <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
                      <Ionicons name={activity.icon as any} size={20} color={activity.color} />
                    </View>
                    <View style={styles.activityInfo}>
                      <Text style={styles.activityTitle}>{activity.title}</Text>
                      <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
                    </View>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: spacing.md,
  },
  contentDesktop: {
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
    borderWidth: 2,
    borderColor: colors.backgroundCard,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  metricsGridTablet: {
    gap: spacing.lg,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  metricCardTablet: {
    minWidth: '22%',
  },
  metricGradient: {
    padding: spacing.lg,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  metricIconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  metricChangeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: '#FFFFFF',
  },
  metricValue: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  metricTitle: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: fontWeight.medium,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  sectionLink: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  menuGrid: {
    gap: spacing.md,
  },
  menuGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  menuItemDesktop: {
    flex: 1,
    minWidth: '48%',
  },
  menuIconGradient: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    ...shadows.md,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  menuDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  menuArrow: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContainer: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  activitySubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  activityTime: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});

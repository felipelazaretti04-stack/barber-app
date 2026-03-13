import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../src/components';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants/theme';

const { width } = Dimensions.get('window');
const isWeb = width > 768;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.backgroundLight]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.heroContainer}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                style={styles.logoCircle}
              >
                <Ionicons name="cut-outline" size={56} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <Text style={styles.title}>Barber Premium</Text>
            <Text style={styles.subtitle}>Seu estilo, nossa missão</Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${colors.primary}15` }]}>
                <Ionicons name="calendar" size={24} color={colors.primary} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Agendamento Rápido</Text>
                <Text style={styles.featureDescription}>Reserve em minutos</Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${colors.success}15` }]}>
                <Ionicons name="people" size={24} color={colors.success} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Profissionais Top</Text>
                <Text style={styles.featureDescription}>Barbeiros experientes</Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: `${colors.warning}15` }]}>
                <Ionicons name="star" size={24} color={colors.warning} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Atendimento Premium</Text>
                <Text style={styles.featureDescription}>Experiência única</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <Button
              title="Agendar Horário"
              onPress={() => router.push('/services')}
              size="lg"
              style={styles.primaryButton}
            />
            <Button
              title="Área Administrativa"
              onPress={() => router.push('/admin')}
              variant="outline"
              size="lg"
              style={styles.secondaryButton}
            />
          </View>

          <View style={styles.footer}>
            <View style={styles.scheduleInfo}>
              <Ionicons name="time-outline" size={18} color={colors.textMuted} />
              <Text style={styles.footerText}>Segunda a Sábado</Text>
            </View>
            <Text style={styles.footerTime}>09:00 - 20:00</Text>
          </View>
        </View>
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
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
    maxWidth: isWeb ? 1024 : '100%',
    width: '100%',
    alignSelf: 'center',
  },
  heroContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    fontSize: fontSize.xxxxl,
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: colors.textMuted,
    fontWeight: fontWeight.medium,
    textAlign: 'center',
  },
  featuresContainer: {
    gap: spacing.md,
    marginVertical: spacing.lg,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  actionsContainer: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  primaryButton: {
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.lg,
  },
  scheduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  footerTime: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
});

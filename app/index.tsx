import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../src/components';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../src/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="cut" size={48} color={colors.primary} />
          </View>
          <Text style={styles.title}>Barber Premium</Text>
          <Text style={styles.subtitle}>Estilo e Precisão</Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Ionicons name="calendar-outline" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Agendamento Online</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="people-outline" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Profissionais Qualificados</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="star-outline" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Atendimento Premium</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
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
          <Text style={styles.footerText}>Aberto de Segunda a Sábado</Text>
          <Text style={styles.footerTime}>09:00 - 20:00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  featuresContainer: {
    gap: spacing.md,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.backgroundCard,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  featureText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  buttonsContainer: {
    gap: spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  footerTime: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
});

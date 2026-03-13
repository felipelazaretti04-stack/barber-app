import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer, Header, Input, Button } from '../src/components';
import { useBooking } from '../src/services/booking-context';
import { colors, spacing, fontSize, fontWeight } from '../src/constants/theme';

export default function CustomerScreen() {
  const router = useRouter();
  const { booking, setCustomer } = useBooking();
  const [name, setName] = useState(booking.customerName);
  const [phone, setPhone] = useState(booking.customerPhone);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setPhone(formatted);
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    const phoneNumbers = phone.replace(/\D/g, '');
    if (!phoneNumbers) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (phoneNumbers.length < 10) {
      newErrors.phone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      setCustomer(name.trim(), phone);
      router.push('/confirmation');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <ScreenContainer>
        <Header title="Seus Dados" />

        <View style={styles.content}>
          <Text style={styles.description}>
            Preencha seus dados para confirmar o agendamento
          </Text>

          <Input
            label="Nome Completo"
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
            error={errors.name}
            autoCapitalize="words"
          />

          <Input
            label="Telefone"
            placeholder="(11) 99999-9999"
            value={phone}
            onChangeText={handlePhoneChange}
            error={errors.phone}
            keyboardType="phone-pad"
            maxLength={15}
          />

          <View style={styles.footer}>
            <Button
              title="Continuar"
              onPress={handleContinue}
              size="lg"
              style={styles.button}
            />
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: spacing.lg,
  },
  button: {
    width: '100%',
  },
});

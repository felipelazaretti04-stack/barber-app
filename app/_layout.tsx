import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BookingProvider } from '../src/services/booking-context';
import { colors } from '../src/constants/theme';

export default function RootLayout() {
  return (
    <BookingProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      />
    </BookingProvider>
  );
}

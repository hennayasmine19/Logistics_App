import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="bookings" />
        <Stack.Screen name="tracking" />
        <Stack.Screen name="confirmations" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="new-booking" />
        <Stack.Screen name="pickup-points" />
        <Stack.Screen name="bus-assignment" />
        <Stack.Screen name="user-logs" />
        <Stack.Screen name="history" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
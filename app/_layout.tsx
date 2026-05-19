import { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import { useStore } from '../lib/store';
import { warnIfInvalid } from '../lib/validateContent';
import { BG } from '../lib/theme';

Sentry.init({
  dsn: 'https://b943a61ce94b0b440884e06f714e4f05@o4511417131335680.ingest.de.sentry.io/4511418802241616',
  debug: __DEV__,
  enabled: !__DEV__,
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

export default function RootLayout() {
  const loadState         = useStore((s) => s.loadState);
  const hasLoaded         = useStore((s) => s.hasLoaded);
  const onboardingComplete = useStore((s) => s.onboardingComplete);
  const router = useRouter();

  useEffect(() => {
    loadState();
    if (__DEV__) warnIfInvalid();
  }, []);

  // Redirect to onboarding after store has loaded, for first-time users.
  useEffect(() => {
    if (!hasLoaded) return;
    if (!onboardingComplete) {
      setTimeout(() => router.replace('/onboarding' as any), 0);
    }
  }, [hasLoaded]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: BG },
          animation: 'slide_from_right',
        }}
      />
    </SafeAreaProvider>
  );
}

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="add-appointment" />
      <Stack.Screen name="add-patients" />
      <Stack.Screen name="add-clinic-note" />
      <Stack.Screen name="add-prescription" />
      <Stack.Screen name="add-treatment-plan" />
      <Stack.Screen name="add-invoice" />
      <Stack.Screen name="add-payment" />
      <Stack.Screen name="add-attachment" />
    </Stack>
  );
}

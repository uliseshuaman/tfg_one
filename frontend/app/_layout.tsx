import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{headerShown: false}}> 
      <Stack.Screen name="index" />
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="RegisterScreen" />
      <Stack.Screen name="AdminView" />
      <Stack.Screen name="UserView" />
      <Stack.Screen name="GuestView" />
  </Stack>;
}

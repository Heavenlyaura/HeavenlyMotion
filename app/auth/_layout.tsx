import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

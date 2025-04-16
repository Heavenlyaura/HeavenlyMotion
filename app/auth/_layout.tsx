import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { checkUserSession } from "@/services/appwrite";

export default function AuthLayout() {
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      const user = await checkUserSession();
      if (user) {
        router.replace("/");
      } else {
        setIsSessionChecked(true);
      }
    };
    redirectIfLoggedIn();
  }, []);

  if (!isSessionChecked) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const userIsLoggedIn = false; // Replace with your logic
    if (!userIsLoggedIn) {
      router.replace("/auth/login");
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

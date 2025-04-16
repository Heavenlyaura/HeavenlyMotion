import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { checkUserSession } from "@/services/appwrite";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const userIsLoggedIn = await checkUserSession(); // Await the result of the async function
      if (!userIsLoggedIn) {
        router.replace("/auth/login");
      } else {
        router.replace("/");
      }
    };

    checkSession(); // Call the async function
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

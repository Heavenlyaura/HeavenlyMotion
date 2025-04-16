import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { startOAuthFlow } from "@/services/appwrite";
import { OAuthProvider } from "react-native-appwrite";

const OauthButtons = ({ icon, text }: OauthButtonProps) => {
  const router = useRouter();

  const handleOAuthLogin = () => {
    try {
      startOAuthFlow(OAuthProvider.Google);
    } catch (error) {
      console.error("OAuth login failed:", error);
    }
  };

  return (
    <Pressable
      onPress={handleOAuthLogin}
      className="bg-white rounded-lg flex-row justify-center items-center gap-x-4 py-4 w-80 my-2"
    >
      <Image className="size-5" source={icon} />
      <Text className="text-2xl">{text}</Text>
    </Pressable>
  );
};

export default OauthButtons;

import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { startOAuthFlow } from "@/services/appwrite";
import { OAuthProvider } from "react-native-appwrite";

const OauthButtons = ({ icon, text }: OauthButtonProps) => {
  return (
    <Link href={"/"} className="my-2">
      <Pressable
        onPress={() => {
          startOAuthFlow(OAuthProvider.Google);
        }}
        className="bg-white rounded-lg flex-row justify-center items-center gap-x-4 py-4 w-80"
      >
        <Image className="size-5" source={icon} />
        <Text className="text-2xl">{text}</Text>
      </Pressable>
    </Link>
  );
};

export default OauthButtons;

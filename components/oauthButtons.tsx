import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const OauthButtons = ({ icon, text }: OauthButtonProps) => {
  return (
    <Link href={"/"} className="my-2">
      <View className="bg-white rounded-lg flex-row justify-center items-center gap-x-4 py-4 w-80">
        <Image className="size-5" source={icon} />
        <Text className="text-2xl">{text}</Text>
      </View>
    </Link>
  );
};

export default OauthButtons;

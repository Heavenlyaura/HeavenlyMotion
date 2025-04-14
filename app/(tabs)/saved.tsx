import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";

const Saved = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className=" justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.save} className="size-10" tintColor={"#fff"} />
        <Text className="text-white text-base">Saved</Text>
        <Link href={"/auth/login"} className="text-white">
          Login
        </Link>
      </View>
    </View>
  );
};

export default Saved;

import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const Profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className=" justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tintColor={"#fff"} />
        <Text className="text-white text-base">Profile</Text>
      </View>
    </View>
  );
};

export default Profile;

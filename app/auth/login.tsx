import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import OauthButtons from "@/components/oauthButtons";
import { images } from "@/constants/images";

const Login = () => {
  return (
    <View className="flex-1 bg-primary justify-center items-center relative">
      <Image source={images.bg} className="absolute w-full h-full z-0" />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
        className="w-full px-5"
        showsVerticalScrollIndicator={false}
      >
        <Image source={icons.logo} className="w-20 h-16 mb-10" />
        <Text className="text-white text-center text-4xl mb-10 font-bold">
          Welcome to Heavenly Motion
        </Text>
        <View className="items-center">
          <OauthButtons icon={icons.google} text="Continue with Google" />
          <OauthButtons icon={icons.facebook} text="Continue with Facebook" />
        </View>

        <View className=" items-center justify-center mt-10 gap-2">
          <Text className="text-white text-center">
            By signing in with an account you agree to Heavely Motion Terms of
            Service
          </Text>
          <Link href={"/"} className="text-white font-bold">
            Terms of Service
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

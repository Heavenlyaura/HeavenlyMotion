import { View, Text, ImageBackground, Image } from "react-native";
import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { checkUserSession } from "@/services/appwrite";

function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center rounded-full overflow-hidden items-center"
      >
        <Image source={icon} tintColor={"#151312"} className="size-5" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  }
}

export default function _layout() {
  const [isSessionChecked, setIsSessionChecked] = React.useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const userIsLoggedIn = await checkUserSession();
      if (!userIsLoggedIn) {
        router.replace("/auth/login");
      } else {
        setIsSessionChecked(true);
      }
    };
    checkSession();
  }, []);

  if (!isSessionChecked) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0f0d23]">
        <Text className="text-white text-base font-semibold">Loading...</Text>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabItemsStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          position: "absolute",
          height: 52,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icon={icons.save} title="Saved" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

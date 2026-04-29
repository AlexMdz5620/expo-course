import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { globalStyles } from "@/styles/global-styles";

const isAndroid = Platform.OS === "android";

if (isAndroid) {
  // NavigationBar.setBackgroundColorAsync("black");
  NavigationBar.setStyle("dark");
}

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <View style={globalStyles.background}>
        <Slot />
        <StatusBar style="light" />
      </View>
    </SafeAreaProvider>
  );
};

export default RootLayout;

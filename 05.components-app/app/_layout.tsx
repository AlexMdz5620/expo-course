import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { allRoutes } from "@/constants/Routes";
// import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemeChangerProvider } from "@/presentation/context/ThemeChangerContext";
import { Stack } from "expo-router";
import "../global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const bgColor = useThemeColor({}, "background");
  // const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ backgroundColor: bgColor, flex: 1 }}>
      <ThemeChangerProvider>
        {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: bgColor,
            },
            headerStyle: {
              backgroundColor: bgColor,
            },
          }}
        >
          <Stack.Screen name="index" options={{ title: "" }} />
          {allRoutes.map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              options={{
                title: route.title,
                headerShown: !route.title.includes("Slides"),
              }}
            />
          ))}
        </Stack>
        {/* </ThemeProvider> */}
      </ThemeChangerProvider>
    </GestureHandlerRootView>
  );
}

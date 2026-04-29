import LogoutIconBtn from "@/presentation/auth/components/LogoutIconBtn";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CheckAuthLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const bgColor = useThemeColor({}, "background");

  const insets = useSafeAreaInsets();

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  if (status === "checking") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "unauthenticated") {
    return <Redirect href="/auth/login" />;
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: bgColor }}>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: bgColor,
          },
          contentStyle: {
            backgroundColor: bgColor,
          },
        }}
      >
        <Stack.Screen
          name="(home)/index"
          options={{
            title: "Productos",
            headerLeft: () => <LogoutIconBtn />,
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "Producto",
          }}
        />
      </Stack>
    </View>
  );
};

export default CheckAuthLayout;

import { ThemedText } from "@/presentation/components/shared/ThemedText";
import React from "react";
import { View } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>LoadingScreen</ThemedText>
    </View>
  );
};

export default LoadingScreen;

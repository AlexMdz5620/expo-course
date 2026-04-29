import { Text, Pressable, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/theme";
import { globalStyles } from "@/styles/global-styles";
import { useState } from "react";

interface Props {
  label: string;
  color?: string;
  balckText?: boolean;
  doubleSize?: boolean;
  onPress: () => void;
}

const CalculatorButton = ({
  label,
  color = Colors.darkGray,
  balckText = false,
  doubleSize = false,
  onPress,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={({ pressed }) => ({
        ...globalStyles.button,
        backgroundColor: color,
        // Si está presionado baja la opacidad, si solo tiene el mouse encima brilla un poco
        opacity: pressed ? 0.8 : isHovered ? 0.9 : 1,
        width: doubleSize ? 180 : 80,
        // Cursor de manita para Web
        ...Platform.select({
          web: { cursor: "pointer" },
        }),
      })}
      onPress={() => {
        if (Platform.OS !== "web") Haptics.selectionAsync();
        onPress();
      }}
    >
      <Text
        style={[
          {
            ...globalStyles.buttonText,
            color: balckText ? "black" : "white",
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default CalculatorButton;

import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";
import { ThemedText } from "./themed-text";

interface Props extends PressableProps {
  icon?: keyof typeof Ionicons.glyphMap;
  children: string;
}

const ThemedButton = ({ children, icon, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? primaryColor + "90" : primaryColor },
        styles.btn,
      ]}
      {...rest}
    >
      <ThemedText style={{ color: "white" }}>{children}</ThemedText>
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color="white"
          style={{ marginHorizontal: 5 }}
        />
      )}
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

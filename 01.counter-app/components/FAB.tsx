import { Text, Pressable, StyleSheet, Platform } from "react-native";

interface Props {
  label: string;
  position?: "left" | "right";
  // Methods
  onPress?: () => void;
  onLongPress?: () => void;
}

export default function FAB({
  label,
  onPress,
  onLongPress,
  position = "right",
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.floatinButton,
        position === "left" ? styles.positonLeft : styles.positonRight,
        pressed
          ? { opacity: 0.5, transform: [{ scale: 0.95 }] }
          : { opacity: 1 },
        Platform.select({
          web: { cursor: "pointer" },
        }),
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text style={{ color: "white", fontSize: 20 }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floatinButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#65558F",
    paddingHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  positonRight: {
    right: 20,
  },

  positonLeft: {
    left: 20,
  },
});

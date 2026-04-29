import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  // TouchableOpacity,
  View,
} from "react-native";
import FAB from "./components/FAB";

export default function App() {
  const [count, setCount] = useState(10);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.textHuge,
          Platform.select({
            web: { userSelect: "none" },
          }),
        ]}
      >
        {count}
      </Text>
      {/* <Pressable
        style={styles.floatinButton}
        onPress={() => setCount(count + 1)}
        onLongPress={() => setCount(0)}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>+1</Text>
      </Pressable> */}
      {/* <TouchableOpacity>
        <Text>+1</Text>
      </TouchableOpacity> */}
      <FAB
        label="+1"
        onPress={() => setCount(count + 1)}
        onLongPress={() => setCount(0)}
      />
      <FAB label="Reset" onPress={() => setCount(0)} position="left" />
      <StatusBar style="auto" />
    </View>
  );
}

// npx expo install react-dom react-native-web @expo/metro-runtime

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  textHuge: {
    fontSize: 120,
    fontWeight: "100",
  },
});

import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedView from "@/presentation/shared/ThemedView";
import { Alert } from "react-native";

const AlertsScreen = () => {
  const createTwoBtnAlert = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const createThreeBtnAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "destructive",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  return (
    <ThemedView margin>
      <ThemedButton onPress={createTwoBtnAlert} className="my-5">
        2-Btn Alert
      </ThemedButton>
      <ThemedButton onPress={createThreeBtnAlert} className="mb-5">
        3-Btn Alert
      </ThemedButton>
    </ThemedView>
  );
};
export default AlertsScreen;

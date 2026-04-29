import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { usePushNotifications } from "@/hooks/use-push-notifications";
import { FlatList, View } from "react-native";

export default function App() {
  const { expoPushToken, notifications } = usePushNotifications();
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <ThemedText>{expoPushToken}</ThemedText>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.request.identifier}
        renderItem={({ item }) => (
          <ThemedView style={{ paddingVertical: 10 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              {item.request.content.title}
            </ThemedText>
            <ThemedText>{item.request.content.body}</ThemedText>
            <ThemedText>
              {JSON.stringify(item.request.content.data, null, 2)}
            </ThemedText>
          </ThemedView>
        )}
        ItemSeparatorComponent={() => (
          <ThemedView
            style={{ height: 1, backgroundColor: "grey", opacity: 0.5 }}
          />
        )}
        ListEmptyComponent={() => (
          <ThemedView
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              paddingVertical: 20,
            }}
          >
            <ThemedText
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "grey",
              }}
            >
              No hay notificaciónes
            </ThemedText>
          </ThemedView>
        )}
      />

      {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ThemedText>
          Title: {notification && notification.request.content.title}{" "}
        </ThemedText>
        <ThemedText>
          Body: {notification && notification.request.content.body}
        </ThemedText>
        <ThemedText>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </ThemedText>
      </View> */}
      {/* <Button
        title="Send Notification"
        onPress={async () => {
          await sendPushNotification({
            body: "Body desde mi app",
            title: "Título desde la app",
            to: [expoPushToken],
            data: {
              chatId: "ABC-123",
            },
          });
        }}
      /> */}
    </View>
  );
}

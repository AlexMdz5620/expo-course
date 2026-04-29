import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { router } from "expo-router";

const ModalScreen = () => {
  return (
    <ThemedView
      className="justify-center items-center flex-1"
      bgColor="#B541B2"
    >
      <ThemedText>Hola soy otro modal</ThemedText>

      <ThemedButton className="my-4" onPress={() => router.back()}>
        Cerrar
      </ThemedButton>
    </ThemedView>
  );
};

export default ModalScreen;

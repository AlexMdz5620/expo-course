import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { router } from "expo-router";

const ModalScreen = () => {
  return (
    <ThemedView
      className="justify-center items-center flex-1"
      bgColor="#A52182"
    >
      <ThemedText>Hola soy un modal</ThemedText>

      <ThemedButton
        className="my-4"
        onPress={() => router.push("/modal/modal-windows-2")}
      >
        Otro modal
      </ThemedButton>

      <ThemedButton onPress={() => router.dismiss()}>Cerrar</ThemedButton>
    </ThemedView>
  );
};

export default ModalScreen;

import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { Link, router } from "expo-router";

const ModalScreen = () => {
  return (
    <ThemedView>
      <Link asChild href="/modal/modal-windows" className="mx-4">
        <ThemedText className="text-light-text dark:text-dark-text my-2 text-xl">
          Abrir Modal
        </ThemedText>
      </Link>
      <ThemedButton
        onPress={() => router.push("/modal/modal-windows")}
        className="mx-4"
      >
        Abrir modal
      </ThemedButton>
    </ThemedView>
  );
};
export default ModalScreen;

import { Cast } from "@/infrastructure/interfaces/cast";
import { View, FlatList, Text } from "react-native";
import { ActorCard } from "../actor/ActorCard";

interface Props {
  cast: Cast[];
}

const MovieCast = ({ cast }: Props) => {
  return (
    <View className="mt-5">
      <Text className="font-bold text-2xl px-5">Actores</Text>
      <FlatList
        horizontal
        data={cast}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <ActorCard actor={item} />}
      />
    </View>
  );
};

export default MovieCast;

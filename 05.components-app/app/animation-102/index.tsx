import { useRef } from "react";
import { Animated, PanResponder } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Animation102Screen = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y,
        },
      ],
      {
        useNativeDriver: false,
      },
    ),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        { toValue: { x: 0, y: 0 }, useNativeDriver: false }, // Back to zero
      ).start();
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView
        // style={styles.container}
        className="justify-center items-center flex-1"
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={[pan.getLayout() /* , styles.box */]}
          className="bg-light-secondary dark:bg-dark-secondary rounded-xl w-40 h-40"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Animation102Screen;

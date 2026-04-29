import CustomMap from "@/presentation/components/map/CustomMap";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const MapScreen = () => {
  const { lastKnowLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (lastKnowLocation === null) getLocation();
  }, [getLocation, lastKnowLocation]);

  if (lastKnowLocation === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View>
      <CustomMap
        initialLocation={lastKnowLocation}
        // style={{ height: "50%" }}
      />
      {/* <CustomMap
        initialLocation={{
          latitude: 24.03620642471844,
          longitude: -104.64790109871339,
        }}
        style={{ height: "50%" }}
      /> */}
    </View>
  );
};

export default MapScreen;

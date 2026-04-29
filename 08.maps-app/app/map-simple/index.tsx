import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        // showsPointsOfInterest={false}
        style={styles.map}
        // 24.03620642471844, -104.64790109871339
        provider="google"
        initialRegion={{
          latitude: 24.03620642471844,
          longitude: -104.64790109871339,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 24.03620642471844,
            longitude: -104.64790109871339,
          }}
          title="Aquí ando"
          description="Esta es la oficina"
        />
        <Marker
          coordinate={{
            latitude: 24.03117065352717,
            longitude: -104.64924349345821,
          }}
          title="Aquí entreno"
          description="El gym"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
  },
});

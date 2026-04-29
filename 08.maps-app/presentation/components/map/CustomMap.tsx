import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import FAB from "../shared/FAB";

interface Props extends ViewProps {
  initialLocation: LatLng;
  showUserLocation?: boolean;
}

const CustomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) => {
  const mapRef = useRef<MapView>(null);

  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [isShowingPolyline, setIsShowingPolyline] = useState(true);

  const {
    watchLocation,
    clearWatchLocation,
    lastKnowLocation,
    getLocation,
    userLocationList,
  } = useLocationStore();

  useEffect(() => {
    watchLocation();

    return () => clearWatchLocation();
  }, [watchLocation, clearWatchLocation]);

  useEffect(() => {
    if (lastKnowLocation && isFollowingUser)
      moveCamaraToLocation(lastKnowLocation);
  }, [lastKnowLocation, isFollowingUser]);

  const moveCamaraToLocation = (latLng: LatLng) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({
      center: latLng,
    });
  };

  const moveToCurrentLocation = async () => {
    if (!lastKnowLocation) {
      moveCamaraToLocation(initialLocation);
    } else {
      moveCamaraToLocation(lastKnowLocation);
    }

    const location = await getLocation();
    if (!location) return;
    moveCamaraToLocation(location);
  };

  return (
    <View {...rest}>
      <MapView
        ref={mapRef}
        onTouchStart={() => setIsFollowingUser(false)}
        style={styles.map}
        showsUserLocation={showUserLocation}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // showsPointsOfInterest={false}
        // provider="google"
      >
        {isShowingPolyline && (
          <Polyline
            coordinates={userLocationList}
            strokeColor={"balck"}
            strokeWidth={5}
          />
        )}
      </MapView>

      <FAB
        iconName={isShowingPolyline ? "eye-outline" : "eye-off-outline"}
        onPress={() => setIsShowingPolyline(!isShowingPolyline)}
        style={{
          bottom: 140,
          right: 20,
        }}
      />

      <FAB
        iconName={isFollowingUser ? "walk-outline" : "accessibility-outline"}
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        style={{
          bottom: 80,
          right: 20,
        }}
      />

      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{
          bottom: 20,
          right: 20,
        }}
      />
    </View>
  );
};

export default CustomMap;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
  },
});

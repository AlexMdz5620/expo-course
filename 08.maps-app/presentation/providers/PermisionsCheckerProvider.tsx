import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { router } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";
import { usePermissionsStore } from "../store/usePermissionsStore";

const PermisionsCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionsStore();

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {
      router.replace("/map");
    } else if (locationStatus !== PermissionStatus.CHECKING) {
      router.replace("/permissions");
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, [checkLocationPermission]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // console.log(nextAppState);
      if (nextAppState === "active") {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [checkLocationPermission]);

  return <>{children}</>;
};

export default PermisionsCheckerProvider;

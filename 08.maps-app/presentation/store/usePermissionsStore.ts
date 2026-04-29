import {
  checkLocationPermission,
  requestLocationPermission,
} from "@/core/actions/permissions/location";
import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { create } from "zustand";

interface PermissionsState {
  // Props
  locationStatus: PermissionStatus;
  // Methods
  requestLocationPermission: () => Promise<PermissionStatus>;
  checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionsStore = create<PermissionsState>()((set) => ({
  locationStatus: PermissionStatus.CHECKING,

  requestLocationPermission: async () => {
    const status = await requestLocationPermission();
    set({ locationStatus: status });
    return status;
  },

  checkLocationPermission: async () => {
    const status = await checkLocationPermission();
    set({ locationStatus: status });
    return status;
  },
}));

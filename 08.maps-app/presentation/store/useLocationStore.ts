import {
  getCurrentLocation,
  watchCurrentPositions,
} from "@/core/actions/location/location";
import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
  lastKnowLocation: LatLng | null;
  userLocationList: LatLng[];
  watchSubscriptionID: LocationSubscription | null;

  // Methods
  getLocation: () => Promise<LatLng>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnowLocation: null,
  userLocationList: [],
  watchSubscriptionID: null,

  getLocation: async () => {
    const location = await getCurrentLocation();
    set({ lastKnowLocation: location });
    return location;
  },
  watchLocation: async () => {
    const oldSubscription = get().watchSubscriptionID;
    if (oldSubscription !== null) {
      get().clearWatchLocation();
    }

    const watchSubscription = await watchCurrentPositions((latLng) => {
      // console.log(latLng);
      set({
        lastKnowLocation: latLng,
        userLocationList: [...get().userLocationList, latLng],
      });
    });

    set({ watchSubscriptionID: watchSubscription });
  },
  clearWatchLocation: () => {
    const subscription = get().watchSubscriptionID;

    if (subscription !== null) subscription.remove();
  },
}));

import { create } from "zustand";
import { getTrackingData } from "../services/trackingService";

const useTrackingStore = create((set, get) => ({
  userLocation: {},
  loading: false,
  error: null,
  route: [], // Array of [lat, lng]

  fetchLocation: async () => {
    // Check if we're already loading to prevent duplicate requests
    if (get().loading) return;

    set({ loading: true, error: null });
    try {
      const response = await getTrackingData();
      const userData = response.data || response; // Handle both response formats

      // Validate data before updating state
      if (
        !userData ||
        typeof userData.latitude !== "number" ||
        typeof userData.longitude !== "number"
      ) {
        set({ loading: false, error: "Invalid data received from API" });
        return;
      }

      set((state) => {
        const newPoint = [userData.latitude, userData.longitude];

        // Check if the new point is different from the last point to avoid duplicates
        const lastPoint =
          state.route.length > 0 ? state.route[state.route.length - 1] : null;

        // Only add point if it's different from the last one
        const isNewPoint =
          !lastPoint ||
          lastPoint[0] !== newPoint[0] ||
          lastPoint[1] !== newPoint[1];

        const newRoute = isNewPoint ? [...state.route, newPoint] : state.route;

        return {
          userLocation: userData,
          route: newRoute,
          loading: false,
          error: null,
        };
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

// Selectors (similar to Pinia getters)
export const useUserLocation = () =>
  useTrackingStore((state) => state.userLocation);
export const useTrackingLoading = () =>
  useTrackingStore((state) => state.loading);
export const useTrackingError = () => useTrackingStore((state) => state.error);
export const useTrackingRoute = () => useTrackingStore((state) => state.route);
export const useFetchLocation = () =>
  useTrackingStore((state) => state.fetchLocation);

export default useTrackingStore;

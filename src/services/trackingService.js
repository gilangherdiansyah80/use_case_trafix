import { api } from "../lib/api";

export const getTrackingData = async () => {
  try {
    const response = await api.get("/track");
    return response.data;
  } catch (error) {
    console.error("Error fetching tracking data:", error);
    throw error;
  }
};

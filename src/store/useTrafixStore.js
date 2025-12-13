import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTrafixStore = create(
  persist(
    (set) => ({
      driver: {
        name: "Asep Gunawan",
        phone: "081234567890",
        email: "asep@gmail.com",
        fleetGroup: "Garuda",
        employment: "Full-time",
        workingHistory: "08:00 - 17:00",
        vehicle: "B 1234 VCD",
        status: "Moving",
        trips: 28,
        efficiency: 92.3,
      },
      notifications: [
        {
          id: 1,
          message: "12 Invoices have been paid",
          time: "12 min ago",
          read: false,
        },
        { id: 2, message: "Meeting with John", time: "45 min ago", read: true },
        {
          id: 3,
          message: "Create a new react project for client",
          time: "2 day ago",
          read: true,
        },
        {
          id: 4,
          message: "Create a new react project for client",
          time: "2 day ago",
          read: true,
        },
      ],
      activeTab: "overview",
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "trafix-storage",
    }
  )
);

export default useTrafixStore;

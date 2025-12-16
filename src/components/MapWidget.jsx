import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Card, CardHeader, CardBody } from "./ui/Card";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useTrafixStore from "../store/useTrafixStore";
import { useUserLocation, useFetchLocation } from "../store/useTrackingStore";

// Fix for default leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Create custom car icon
const createCarIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        background-color: #3b82f6;
        border-radius: 50%;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        border: 3px solid white;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
          <circle cx="6.5" cy="16.5" r="2.5"/>
          <circle cx="16.5" cy="16.5" r="2.5"/>
        </svg>
      </div>
    `,
    className: "custom-car-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

// Component to handle map initialization and marker
const MapController = ({ userLocation, activeTab }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map]);

  useEffect(() => {
    if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
      return;
    }

    const lat = parseFloat(userLocation.latitude);
    const lng = parseFloat(userLocation.longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return;
    }

    const newPos = [lat, lng];

    try {
      if (markerRef.current) {
        markerRef.current.setLatLng(newPos);

        if (activeTab === "live-tracking") {
          map.panTo(newPos, { animate: true, duration: 1 });
        }
      } else {
        const icon = createCarIcon();

        markerRef.current = L.marker(newPos, {
          icon: icon,
          zIndexOffset: 1000,
        })
          .addTo(map)
          .bindPopup(
            `
            <div style="text-align: center; min-width: 150px;">
              <strong style="font-size: 14px;">🚗 Tracked Vehicle</strong><br/>
              <div style="margin-top: 8px; font-size: 12px;">
                <strong>Latitude:</strong> ${lat.toFixed(6)}<br/>
                <strong>Longitude:</strong> ${lng.toFixed(6)}
              </div>
            </div>
          `
          )
          .openPopup();

        map.setView(newPos, 15);
      }
    } catch (error) {
      console.error("Error with marker:", error);
    }
  }, [userLocation, activeTab, map]);

  return null;
};

const MapWidget = () => {
  const activeTab = useTrafixStore((state) => state.activeTab);
  const userLocation = useUserLocation();
  const fetchLocation = useFetchLocation();

  const pollingIntervalRef = useRef(null);

  // Default center (Jakarta) if no data yet
  const defaultCenter = [-6.175392, 106.827153];

  // Start polling function
  const startPolling = () => {
    if (pollingIntervalRef.current) return;

    fetchLocation();
    pollingIntervalRef.current = setInterval(() => {
      fetchLocation();
    }, 3000);
  };

  // Stop polling function
  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  // Effect for live tracking
  useEffect(() => {
    if (activeTab === "live-tracking") {
      startPolling();
    } else {
      stopPolling();
      fetchLocation();
    }

    return () => {
      stopPolling();
    };
  }, [activeTab]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  return (
    <Card className="h-full flex flex-col w-full hide-scrollbar md:mt-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-wrap gap-2">
        <h1 className="text-lg font-bold text-gray-800">
          {activeTab === "live-tracking" ? "Live Tracking" : "Last Location"}
        </h1>
      </CardHeader>

      <CardBody className="flex-1 flex flex-col min-h-0 hide-scrollbar">
        <div className="flex-1 w-full rounded-xl overflow-hidden border border-gray-200 relative z-0 min-h-0 hide-scrollbar">
          <MapContainer
            center={defaultCenter}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            className="h-full w-full hide-scrollbar"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController userLocation={userLocation} activeTab={activeTab} />
          </MapContainer>
        </div>

        <div className="mt-2 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            {userLocation?.latitude && userLocation?.longitude ? (
              <span className="text-gray-700">
                <strong>Position:</strong>{" "}
                {parseFloat(userLocation.latitude).toFixed(6)},{" "}
                {parseFloat(userLocation.longitude).toFixed(6)}
              </span>
            ) : (
              <span className="text-gray-400">No location data</span>
            )}
          </div>
          <span className="text-gray-400">
            Last Updated:{" "}
            {userLocation?.timestamp
              ? new Date(userLocation.timestamp).toLocaleString()
              : "--"}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default MapWidget;

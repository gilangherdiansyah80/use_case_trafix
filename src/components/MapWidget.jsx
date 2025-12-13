import { useState, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { Card, CardHeader, CardBody } from "./ui/Card";
import "leaflet/dist/leaflet.css";
import { LocateFixed, Car } from "lucide-react";
import L from "leaflet";
import useTrafixStore from "../store/useTrafixStore";

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

const MapWidget = () => {
  const activeTab = useTrafixStore((state) => state.activeTab);

  const route = [
    [-6.914744, 107.60981],
    [-6.9148, 107.6105],
    [-6.9155, 107.611],
    [-6.9162, 107.612],
    [-6.917, 107.6118],
    [-6.9175, 107.6105],
    [-6.917, 107.609],
    [-6.916, 107.6085],
    [-6.915, 107.609],
    [-6.914744, 107.60981],
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const position = route[currentStep];

  useEffect(() => {
    if (activeTab !== "live-tracking") return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % route.length);
    }, 1000); // Move every 1 second

    return () => clearInterval(interval);
  }, [route.length, activeTab]);

  const customIcon = L.divIcon({
    html: renderToStaticMarkup(
      <div className="bg-blue-600 p-1.5 rounded-full text-white shadow-lg border-2 border-white flex items-center justify-center">
        <Car size={20} />
      </div>
    ),
    className: "", // Remove default class to avoid default styles interfering
    iconSize: [36, 36],
    iconAnchor: [18, 18], // Center the icon
  });

  return (
    <Card className="h-full flex flex-col w-full hide-scrollbar md:mt-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-wrap gap-2">
        <h1 className="text-lg font-bold text-gray-800">
          {activeTab === "live-tracking" ? "Live Tracking" : "Last Location"}
        </h1>
        <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
          See Map
        </button>
      </CardHeader>

      <CardBody className="flex-1 flex flex-col min-h-0 hide-scrollbar">
        <div className="flex-1 w-full rounded-xl overflow-hidden border border-gray-200 relative z-0 min-h-0 hide-scrollbar">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            className="h-full w-full hide-scrollbar"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Only show polyline (route) in live-tracking tab */}
            {activeTab === "live-tracking" && (
              <Polyline positions={route} color="blue" />
            )}
            <Marker position={position} icon={customIcon}>
              <Popup>Current Location</Popup>
            </Marker>
          </MapContainer>

          {/* Helper overlay for static feel if needed, but interactive is better */}
        </div>

        <div className="mt-2 flex justify-end">
          <p className="text-xs text-gray-400">
            Last Updated: 12/12/2025 12:12:12
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default MapWidget;

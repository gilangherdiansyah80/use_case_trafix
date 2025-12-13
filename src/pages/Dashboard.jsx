import useTrafixStore from "../store/useTrafixStore";
import Overview from "../components/Overview";
import DriverBehaviorDetail from "../components/DriverBehaviorDetail";
import Notifications from "../components/Notifications";
import MapWidget from "../components/MapWidget";

const Dashboard = () => {
  const activeTab = useTrafixStore((state) => state.activeTab);

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "live-tracking":
        return (
          <div className="w-full h-[calc(100vh-150px)] md:h-[calc(100vh-200px)] hide-scrollbar">
            <MapWidget />
          </div>
        );
      case "driver-behavior":
        return <DriverBehaviorDetail />;
      case "notifications":
        return <Notifications />;
      case "overview":
      default:
        return <Overview />;
    }
  };

  return <div className="w-full h-full hide-scrollbar">{renderContent()}</div>;
};

export default Dashboard;

import React from "react";
import DriverProfile from "./DriverProfile";
import DriverBehavior from "./DriverBehavior";
import MapWidget from "./MapWidget";
import TimelineWidget from "./TimelineWidget";

const Overview = () => {
  return (
    <div className="space-y-6 w-full hide-scrollbar">
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] gap-6 hide-scrollbar">
        {/* Left Column: Details & Driver Behavior */}
        <div className="space-y-6 w-full h-fit md:h-1/2 md:w-96 md:max-w-full hide-scrollbar">
          <DriverProfile />
          <DriverBehavior />
        </div>

        {/* Right Column: Map & Timeline */}
        <div className="space-y-6 h-1/2 hide-scrollbar">
          <MapWidget />
          <TimelineWidget />
        </div>
      </div>
    </div>
  );
};

export default Overview;

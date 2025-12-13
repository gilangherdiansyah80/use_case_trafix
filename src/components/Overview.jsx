import React from "react";
import DriverProfile from "./DriverProfile";
import DriverBehavior from "./DriverBehavior";
import MapWidget from "./MapWidget";
import TimelineWidget from "./TimelineWidget";

const Overview = () => {
  return (
    <div className="space-y-6 w-full">
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[theme(spacing.96)_1fr] gap-6">
        {/* Left Column: Details & Driver Behavior */}
        <div className="space-y-6 h-1/2 w-96">
          <DriverProfile />
          <DriverBehavior />
        </div>

        {/* Right Column: Map & Timeline */}
        <div className="space-y-6 h-1/2">
          <MapWidget />
          <TimelineWidget />
        </div>
      </div>
    </div>
  );
};

export default Overview;

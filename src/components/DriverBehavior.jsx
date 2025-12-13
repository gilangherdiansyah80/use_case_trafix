import React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";

const DriverBehavior = () => {
  return (
    <Card className="h-full flex flex-col w-full md:w-96 md:max-w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-0 flex-wrap gap-2">
        <CardTitle className="text-lg font-bold text-gray-800">
          Driver Behavior
        </CardTitle>
        <a
          href="#"
          className="text-xs text-gray-400 hover:text-gray-600 hover:underline"
        >
          See More
        </a>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-5 pt-2">
        {/* Score Section */}
        <div>
          <p className="text-gray-400 text-sm mb-1">28 Trips</p>
          <div className="flex items-end gap-3 flex-wrap">
            <h2 className="text-4xl font-bold text-gray-900 leading-none">
              92.3%
            </h2>
            <div className="flex flex-col mb-0.5">
              <span className="bg-red-50 text-red-500 border border-red-100 text-[10px] font-bold px-1.5 py-0.5 rounded-full w-fit flex items-center gap-1">
                ↓ 21%
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5">
                vs last month
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-lg h-10 overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full rounded-r-xl"
            style={{ width: "92.3%" }}
          ></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-1">
          <StatItem label="Overspeed" value="24" />
          <StatItem label="Harsh Acc" value="50" />
          <StatItem label="Harsh Brake" value="12" />
          <StatItem label="Hash Cornering" value="38" />
          <StatItem label="Overstay" value="12" />
          <StatItem label="Geofence Out" value="38" />
        </div>
      </CardContent>
    </Card>
  );
};

const StatItem = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-500 text-sm font-medium">{label}</span>
    <span className="bg-indigo-50 text-indigo-600 font-bold px-3 py-1.5 rounded-md text-sm min-w-[40px] text-center">
      {value}
    </span>
  </div>
);

export default DriverBehavior;

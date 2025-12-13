import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import DriverBehavior from "./DriverBehavior";

const DriverBehaviorDetail = () => {
  return (
    <div className="space-y-6 w-full hide-scrollbar">
      <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] gap-6 hide-scrollbar">
        <div className="space-y-6 w-full h-fit md:h-1/2 md:w-96 md:max-w-full hide-scrollbar">
          <DriverBehavior />
        </div>
        <div className="space-y-6 hide-scrollbar">
          <Card className="hide-scrollbar">
            <CardHeader className="flex flex-row items-center justify-between pb-0 flex-wrap gap-2">
              <CardTitle className="text-lg font-bold text-gray-800">
                Behavior Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 hide-scrollbar">
              <div className="space-y-4 hide-scrollbar">
                <div className="hide-scrollbar">
                  <h3 className="font-medium text-gray-700 mb-2">
                    Safety Score
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: "92.3%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1 flex-wrap">
                    <span>Poor</span>
                    <span className="font-medium text-gray-800">92.3%</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="pt-4 hide-scrollbar">
                  <h3 className="font-medium text-gray-700 mb-3">
                    Risk Factors
                  </h3>
                  <div className="space-y-3 hide-scrollbar">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-gray-600">Overspeed</span>
                      <span className="font-medium text-red-600">High</span>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-gray-600">Harsh Acceleration</span>
                      <span className="font-medium text-yellow-500">
                        Medium
                      </span>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-gray-600">Harsh Braking</span>
                      <span className="font-medium text-green-600">Low</span>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-gray-600">Cornering</span>
                      <span className="font-medium text-yellow-500">
                        Medium
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hide-scrollbar">
            <CardHeader className="flex flex-row items-center justify-between pb-0 flex-wrap gap-2">
              <CardTitle className="text-lg font-bold text-gray-800">
                Recent Incidents
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 hide-scrollbar">
              <div className="space-y-3 hide-scrollbar">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="font-medium text-gray-800">
                      Overspeed Detected
                    </p>
                    <p className="text-sm text-gray-500">Today, 09:30 AM</p>
                  </div>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    High Risk
                  </span>
                </div>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="font-medium text-gray-800">
                      Harsh Acceleration
                    </p>
                    <p className="text-sm text-gray-500">Yesterday, 03:45 PM</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    Medium Risk
                  </span>
                </div>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="font-medium text-gray-800">Harsh Braking</p>
                    <p className="text-sm text-gray-500">Dec 10, 11:20 AM</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    Low Risk
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverBehaviorDetail;

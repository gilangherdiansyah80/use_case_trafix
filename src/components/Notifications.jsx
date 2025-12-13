import React from "react";
import useTrafixStore from "../store/useTrafixStore";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";

const Notifications = () => {
  const notifications = useTrafixStore((state) => state.notifications);

  return (
    <div className="space-y-6 w-full hide-scrollbar">
      <Card className="hide-scrollbar">
        <CardHeader className="flex flex-row items-center justify-between pb-0 flex-wrap gap-2">
          <CardTitle className="text-lg font-bold text-gray-800">
            Notifications
          </CardTitle>
          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
            Mark all as read
          </button>
        </CardHeader>
        <CardContent className="pt-4 hide-scrollbar">
          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read
                    ? "bg-gray-50 border-gray-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex justify-between flex-wrap gap-2">
                  <p className="font-medium text-gray-800">
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-blue-600"></span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;

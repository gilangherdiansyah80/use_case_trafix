import useTrafixStore from "../store/useTrafixStore";
import { Card, CardHeader, CardBody } from "./ui/Card";

const TimelineWidget = () => {
  const notifications = useTrafixStore((state) => state.notifications);

  // Define colors for timeline dots based on index or type
  const getDotColor = (index) => {
    const colors = [
      "bg-orange-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-yellow-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className="h-full w-full hide-scrollbar">
      <CardHeader className="text-lg font-bold text-gray-800">
        Driver Activity Timeline
      </CardHeader>

      <CardBody className="hide-scrollbar">
        <div className="relative pl-2 max-h-[calc(100vh-300px)] overflow-y-auto hide-scrollbar">
          {/* Vertical Line */}
          <div className="absolute left-[7px] top-2 bottom-4 w-0.5 bg-gray-100"></div>

          <div className="space-y-6 pr-2 hide-scrollbar">
            {notifications.map((item, index) => (
              <div
                key={item.id}
                className="relative flex items-start pl-6 gap-3 group flex-wrap hide-scrollbar"
              >
                {/* Dot */}
                <div
                  className={`absolute left-0 mt-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${getDotColor(
                    index
                  )}`}
                ></div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                    {item.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {index === 0
                      ? "Invoices have been paid to the company"
                      : index === 1
                      ? "Project meeting with John @10:15am"
                      : "5 team members in a project"}
                  </p>
                </div>

                <div className="text-xs text-gray-400 whitespace-nowrap">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TimelineWidget;

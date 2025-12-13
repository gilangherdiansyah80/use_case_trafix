import { Card, CardBody } from "./ui/Card";

const StatCard = ({ title, value, subValue, trend, className }) => {
  return (
    <Card className={className}>
      <CardBody className="p-6">
        <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          {subValue && (
            <span className="text-sm text-gray-400 mb-1">{subValue}</span>
          )}
        </div>
        {trend && (
          <div
            className={`mt-2 text-xs px-2 py-1 rounded inline-block font-medium ${
              trend.positive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {trend.value} {trend.label}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default StatCard;

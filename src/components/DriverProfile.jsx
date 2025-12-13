import useTrafixStore from "../store/useTrafixStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import { Card, CardHeader, CardBody } from "./ui/Card";

const DetailRow = ({ label, value, isStatus }) => (
  <div className="flex py-2.5 border-b border-gray-100 last:border-0">
    <div className="w-1/3 text-sm text-gray-500 font-normal">{label}</div>
    <div
      className={`w-2/3 text-sm font-medium pl-4 ${
        isStatus ? "text-green-600" : "text-gray-900"
      }`}
    >
      {isStatus ? (
        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
          {value}
        </span>
      ) : (
        value
      )}
    </div>
  </div>
);

const DriverProfile = () => {
  const driver = useTrafixStore((state) => state.driver);

  return (
    <Card className="w-96 h-full">
      <Tabs defaultValue="details" className="w-full">
        <CardHeader>
          <h1 className="text-lg font-bold text-gray-800">Details</h1>
        </CardHeader>

        <CardBody className="-mt-10">
          <TabsContent value="details">
            <div className="">
              <DetailRow label="Name" value={driver.name} />
              <DetailRow label="Phone Number" value={driver.phone} />
              <DetailRow label="Email" value={driver.email} />
              <DetailRow label="Fleet Group" value={driver.fleetGroup} />
              <DetailRow label="Employment" value={driver.employment} />
              <DetailRow label="Working Hour" value={driver.workingHistory} />
              <DetailRow
                label="Vehicle"
                value={
                  <span className="text-blue-500 font-medium underline decoration-blue-500/30 underline-offset-4">
                    {driver.vehicle}
                  </span>
                }
              />
              <DetailRow label="Status" value={driver.status} isStatus />
            </div>
          </TabsContent>
        </CardBody>
      </Tabs>
    </Card>
  );
};

export default DriverProfile;

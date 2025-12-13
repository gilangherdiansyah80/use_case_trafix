import { useState } from "react";
import {
  UserIcon,
  MapPinIcon,
  BookmarkIcon,
  KebabMenuIcon,
  BellIcon,
  CarIcon,
} from "@programmer-molor/my-icons";
import { Button } from "@programmer-molor/ui-components";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
} from "../components/ui/Modal";
import { Dropdown, DropdownItem } from "../components/ui/Dropdown";

import useTrafixStore from "../store/useTrafixStore";

const DashboardLayout = ({ children }) => {
  const { activeTab, setActiveTab } = useTrafixStore();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "OVERVIEW", icon: UserIcon },
    { id: "live-tracking", label: "LIVE TRACKING", icon: MapPinIcon },
    { id: "driver-behavior", label: "DRIVER BEHAVIOR", icon: BookmarkIcon },
    { id: "notifications", label: "NOTIFICATIONS", icon: BellIcon },
  ];

  return (
    <div className="flex h-screen w-full p-4 md:p-6 bg-gray-100 flex-col hide-scrollbar">
      {/* Main Content */}
      <div className="flex flex-col w-full gap-y-4 md:gap-y-6 flex-1 min-h-0">
        {/* Header */}
        <header className="flex flex-col z-10 w-full gap-y-4 md:gap-y-6">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
            <section className="flex items-center gap-x-2">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 border-gray-300 flex justify-center items-center">
                <CarIcon size={24} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  Asep Gunawan
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                  081234567890
                </p>
              </div>
            </section>
            <section className="flex gap-x-2 md:gap-x-3 w-full sm:w-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-gray-300 rounded-lg flex justify-center items-center cursor-pointer">
                <Dropdown
                  trigger={
                    <div className="w-full h-full flex justify-center items-center">
                      <KebabMenuIcon size={16} />
                    </div>
                  }
                >
                  <DropdownItem onClick={() => console.log("Logout clicked")}>
                    Logout
                  </DropdownItem>
                </Dropdown>
              </div>
              <Button
                onClick={() => setIsEditOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base transition-colors whitespace-nowrap"
              >
                Edit Driver
              </Button>
            </section>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 overflow-x-auto hide-scrollbar">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="bg-transparent p-0 gap-4 md:gap-8 flex min-w-max">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 pb-3 md:pb-4 px-1 flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold tracking-wider transition-all border-b-2 border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300 rounded-none bg-transparent shadow-none whitespace-nowrap"
                    >
                      <Icon size={12} />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">
                        {tab.label.split(" ")[0]}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full mb-4 md:mb-10 flex-1 min-h-0 overflow-auto hide-scrollbar">
          <div className="w-full h-full">{children}</div>
        </main>
      </div>

      {/* Edit Driver Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <ModalHeader>
          <ModalTitle>Edit Driver</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                defaultValue="Asep Gunawan"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                defaultValue="081234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </ModalContent>
        <ModalFooter>
          <Button
            variant="outline"
            className="border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg text-gray-700"
            onClick={() => setIsEditOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            onClick={() => setIsEditOpen(false)}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DashboardLayout;

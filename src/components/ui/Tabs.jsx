import React, { createContext, useContext, useState } from "react";

const TabsContext = createContext();

const Tabs = ({
  value,
  defaultValue,
  onValueChange,
  children,
  className = "",
}) => {
  const [internalState, setInternalState] = useState(defaultValue);

  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalState;

  const setActiveTab = (newValue) => {
    if (!isControlled) {
      setInternalState(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className = "" }) => (
  <div className={`flex border-b border-gray-200 ${className}`}>{children}</div>
);

const TabsTrigger = ({ value, children, className = "" }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium transition-all border-b-2 outline-none
        ${
          isActive
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        } ${className}`}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className = "" }) => {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div className={`mt-4 ${className}`}>{children}</div>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };

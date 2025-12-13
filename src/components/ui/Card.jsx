import React from "react";

const Card = ({ className = "", children, ...props }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`text-lg font-bold text-gray-800 ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardBody = CardContent;

export { Card, CardHeader, CardTitle, CardContent, CardBody };

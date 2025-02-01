import React from "react";

// Card Component
export const Card = ({ children }) => <div className="card p-4 border rounded-lg shadow-md">{children}</div>;

// CardHeader Component
export const CardHeader = ({ title }) => (
  <div className="text-lg font-bold border-b pb-2">{title}</div>
);

// CardContent Component
export const CardContent = ({ children }) => (
  <div className="text-gray-700 p-2">{children}</div>
);

// Default export
export default Card;

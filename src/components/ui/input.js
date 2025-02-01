// Input.js
import React from "react";

// Input Component
export const Input = ({ placeholder, type = "text", value, onChange }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
 

// Textarea.js
import React from "react";

// Textarea Component
export const Textarea = ({ placeholder, value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
	 

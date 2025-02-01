import * as React from "react"

export const Progress = ({ className, value, ...props }) => (
  <div className={`h-2 w-full overflow-hidden rounded-full bg-secondary ${className}`} {...props}>
    <div
      className="h-full bg-primary transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);
"use client";
import React from "react";

type AlertProps = {
  type: "success" | "error" | "warning" | "info";
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClose?: () => void;
};

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  description,
  icon,
  onClose,
}) => {
  const baseStyle = "px-4 py-3 rounded relative mb-4 flex items-start";
  let typeStyle = "";

  switch (type) {
    case "success":
      typeStyle = "bg-success-50 border border-success-400 text-success-700";
      break;
    case "error":
      typeStyle = "bg-error-50 border border-error-400 text-error-700";
      break;
    case "warning":
      typeStyle = "bg-warning-50 border border-warning-500 text-warning-700";
      break;
    case "info":
      typeStyle = "bg-info-100 border border-info-400 text-info-700";
      break;
    default:
      typeStyle = "bg-gray-50 border border-gray-400 text-gray-700";
      break;
  }

  return (
    <div className={`${baseStyle} ${typeStyle}`} role="alert">
      {icon && (
        <div className="mr-2 w-6 h-6 flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <strong className="font-bold">{title}</strong>
        <span className="block">{description}</span>
      </div>
      <button type="button" className="px-2" onClick={onClose}>
        <span className="text-2xl">&times;</span>
      </button>
    </div>
  );
};

export default Alert;

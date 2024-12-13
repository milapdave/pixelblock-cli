import React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to combine class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Color =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
type Radius = "full" | "lg" | "md" | "sm" | "none";

interface InputFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    "size"
  > {
  color?: Color;
  radius?: Radius;
  label?: string;
  type?: "text" | "textarea" | "number" | "password" | "email";
}

const InputField: React.FC<InputFieldProps> = ({
  color = "default",
  radius = "md",
  label,
  type = "text", // Default to 'input'
  ...props
}) => {
  let inputClassName =
    "w-full py-2 px-4 border bg-transparent rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none";

  // Handle color prop
  switch (color) {
    case "primary":
      inputClassName +=
        " border-primary-500 focus:border-primary-700 focus:ring-primary-400";
      break;
    case "secondary":
      inputClassName +=
        " border-secondary-500 focus:border-secondary-700 focus:ring-secondary-400";
      break;
    case "success":
      inputClassName +=
        " border-success-500 bg-success-50 focus:border-success-600 focus:ring-success-400";
      break;
    case "warning":
      inputClassName +=
        " border-warning-500 text-black bg-warning-50 focus:border-warning-600 focus:ring-warning-400";
      break;
    case "danger":
      inputClassName +=
        " border-error-500 bg-error-50 focus:border-error-600 focus:ring-error-400";
      break;
    default:
      inputClassName +=
        " border-gray-400 dark:border-white/10 focus:border-gray-400 focus:ring-gray-800";
      break;
  }

  // Apply radius classes based on the radius prop
  switch (radius) {
    case "full":
      inputClassName += " rounded-full";
      break;
    case "lg":
      inputClassName += " rounded-lg";
      break;
    case "md":
      inputClassName += " rounded-md";
      break;
    case "sm":
      inputClassName += " rounded-sm";
      break;
    case "none":
      inputClassName += " rounded-none";
      break;
    default:
      break;
  }

  const combinedClasses = cn(inputClassName);

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={props.id}
          className="text-gray-900 dark:text-zinc-100 text-sm pointer-events-none transition-all duration-200 ease-in-out pb-1 block"
        >
          {label}
        </label>
      )}
      {/* Render the appropriate input type based on the 'type' prop */}
      {type === "textarea" ? (
        <textarea
          className={`${combinedClasses} resize-y min-h-36`}
          {...props}
        ></textarea>
      ) : (
        <input type={type} className={combinedClasses} {...props} />
      )}
    </div>
  );
};

export default InputField;

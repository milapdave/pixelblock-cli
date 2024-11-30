import React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to combine class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Color = "primary" | "secondary" | "info" | "success" | "warning" | "error";

type ButtonVariant = "solid" | "outline" | "ghost" | "link" | "shadow";

type ButtonSize = "sm" | "md" | "lg";

type Radius = "full" | "lg" | "md" | "sm" | "none";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  icon?: React.ReactNode;
  radius?: Radius;
  color?: Color;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  color = "primary", // Default color
  variant = "solid",
  size = "md",
  radius = "md",
  children,
  onClick,
  icon,
  className,
  ...props
}) => {
  let buttonClassName =
    "inline-flex gap-2 items-center whitespace-nowrap disabled:opacity-50 justify-center rounded-md transition-all relative overflow-hidden duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

  // Size classes
  switch (size) {
    case "sm":
      buttonClassName += " h-7 px-4 text-sm font-medium";
      break;
    case "md":
      buttonClassName += " py-2 px-4 text-sm md:text-base font-medium";
      break;
    case "lg":
      buttonClassName += " h-12 px-12 text-base font-medium";
      break;
    default:
      break;
  }

  // Apply radius classes based on the radius prop
  switch (radius) {
    case "full":
      buttonClassName += " rounded-full";
      break;
    case "lg":
      buttonClassName += " rounded-lg";
      break;
    case "md":
      buttonClassName += " rounded-md";
      break;
    case "sm":
      buttonClassName += " rounded-sm";
      break;
    case "none":
      buttonClassName += " rounded-none";
      break;
    default:
      break;
  }

  // Handle variant styles
  switch (variant) {
    case "solid":
      switch (color) {
        case "primary":
          buttonClassName +=
            " bg-primary-500 text-white hover:bg-primary-500/90 border-primary hover:shadow-Button focus:shadow-none";
          break;
        case "secondary":
          buttonClassName +=
            " bg-secondary-500 text-white hover:bg-secondary-700 border-secondary";
          break;
        case "info":
          buttonClassName +=
            " bg-info-500 text-white hover:bg-info-700 border-info";
          break;
        case "success":
          buttonClassName +=
            " bg-success-500 text-white hover:bg-success-700 border-success";
          break;
        case "warning":
          buttonClassName +=
            " bg-warning-500 text-black hover:bg-warning-700 border-warning";
          break;
        case "error":
          buttonClassName +=
            " bg-error-500 text-white hover:bg-error-700 border-error";
          break;
        default:
          break;
      }
      break;
    case "outline":
      switch (color) {
        case "primary":
          buttonClassName +=
            " bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white";
          break;
        case "secondary":
          buttonClassName +=
            " bg-transparent border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-white";
          break;
        case "info":
          buttonClassName +=
            " bg-transparent border-2 border-info-500 text-info-500 hover:bg-info-500 hover:text-white";
          break;
        case "success":
          buttonClassName +=
            " bg-transparent border-2 border-success-500 text-success-500 hover:bg-success-500 hover:text-white";
          break;
        case "warning":
          buttonClassName +=
            " bg-transparent border-2 border-warning-500 text-warning-500 hover:bg-warning-500 hover:text-white";
          break;
        case "error":
          buttonClassName +=
            " bg-transparent border-2 border-error-500 text-error-500 hover:bg-error-500 hover:text-white";
          break;
        default:
          break;
      }
      break;
    case "ghost":
      switch (color) {
        case "primary":
          buttonClassName +=
            " bg-transparent border-2 border-primary-500/10 text-primary-500 hover:bg-primary-500/10";
          break;
        case "secondary":
          buttonClassName +=
            " bg-transparent border-2 border-secondary-500/10 text-secondary-500 hover:bg-secondary-500/10";
          break;
        case "info":
          buttonClassName +=
            " bg-transparent border-2 border-info-500/10 text-info-500 hover:bg-info-500/10";
          break;
        case "success":
          buttonClassName +=
            " bg-transparent border-2 border-success-500/10 text-success-500 hover:bg-success-500/10";
          break;
        case "warning":
          buttonClassName +=
            " bg-transparent border-2 border-warning-500/10 text-warning-500 hover:bg-warning-500/10";
          break;
        case "error":
          buttonClassName +=
            " bg-transparent border-2 border-error-500/10 text-error-500 hover:bg-error-500/10";
          break;
        default:
          break;
      }
      break;
    case "link":
      switch (color) {
        case "primary":
          buttonClassName += " !p-0 bg-transparent text-primary-500 hover:underline";
          break;
        case "secondary":
          buttonClassName +=
            " bg-transparent text-secondary-500 hover:underline";
          break;
        case "info":
          buttonClassName += " bg-transparent text-info-500 hover:underline";
          break;
        case "success":
          buttonClassName += " bg-transparent text-success-500 hover:underline";
          break;
        case "warning":
          buttonClassName += " bg-transparent text-warning-500 hover:underline";
          break;
        case "error":
          buttonClassName += " bg-transparent text-error-500 hover:underline";
          break;
        default:
          break;
      }
      break;
    case "shadow":
      buttonClassName += " shadow-lg hover:shadow-xl";
      break;
    default:
      break;
  }

  const combinedClasses = cn(buttonClassName);

  return (
    <button
      className={`${combinedClasses}  ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children && <span className="relative z-10">{children}</span>}
    </button>
  );
};

export default Button;

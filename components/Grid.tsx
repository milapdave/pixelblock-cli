import React, { ReactNode } from "react";

interface GridProps {
  columns?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Number of columns (1-12)
  gap?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 8
    | 10
    | 12
    | 14
    | 16
    | 20
    | 24
    | 28
    | 32
    | 40
    | 48
    | 56
    | 64; // Gap between items (using valid Tailwind gap classes)
  alignItems?: "start" | "center" | "end" | "stretch"; // Align items vertically
  justifyItems?: "start" | "center" | "end" | "stretch"; // Align items horizontally
  justifyContent?:
    | "none"
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly"; // Justify grid content horizontally
  alignContent?:
    | "none"
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly"; // Align grid content vertically
  className?: string; // Additional Tailwind classes
  children: ReactNode; // Grid items
}

const Grid: React.FC<GridProps> = ({
  columns = 1,
  gap = 0,
  alignItems = "stretch",
  justifyItems = "stretch",
  justifyContent = "none",
  alignContent = "none",
  className = "",
  children,
}) => {
  const getColumnsClass = (columns: GridProps["columns"]) => {
    switch (columns) {
      case 1:
        return "lg:grid-cols-1";
      case 2:
        return "lg:grid-cols-2";
      case 3:
        return "lg:grid-cols-3";
      case 4:
        return "lg:grid-cols-4";
      case 5:
        return "lg:grid-cols-5";
      case 6:
        return "lg:grid-cols-6";
      case 7:
        return "lg:grid-cols-7";
      case 8:
        return "lg:grid-cols-8";
      case 9:
        return "lg:grid-cols-9";
      case 10:
        return "lg:grid-cols-10";
      case 11:
        return "lg:grid-cols-11";
      case 12:
        return "lg:grid-cols-12";
      default:
        return " ";
    }
  };

  const getGapClass = (gap: GridProps["gap"]) => {
    switch (gap) {
      case 1:
        return "gap-1 lg:gap-1";
      case 2:
        return "gap-2 lg:gap-2";
      case 3:
        return "gap-3 lg:gap-3";
      case 4:
        return "gap-4 lg:gap-4";
      case 5:
        return "gap-5 lg:gap-5";
      case 6:
        return "gap-6 lg:gap-6";
      case 8:
        return "gap-8 lg:gap-8";
      case 10:
        return "gap-5 lg:gap-10";
      case 12:
        return "gap-6 lg:gap-12";
      case 14:
        return "gap-7 lg:gap-14";
      case 16:
        return "gap-8 lg:gap-16";
      case 20:
        return "gap-10 lg:gap-20";
      case 24:
        return "gap-12 lg:gap-24";
      case 28:
        return "gap-14 lg:gap-28";
      case 32:
        return "gap-16 lg:gap-32";
      case 40:
        return "gap-20 lg:gap-40";
      case 48:
        return "gap-24 lg:gap-48";
      case 56:
        return "gap-28 lg:gap-56";
      case 64:
        return "gap-32 lg:gap-64";
      default:
        return "";
    }
  };

  const getAlignItemsClass = (alignItems: GridProps["alignItems"]) => {
    switch (alignItems) {
      case "start":
        return "items-start";
      case "center":
        return "items-center";
      case "end":
        return "items-end";
      case "stretch":
        return "items-stretch";
      default:
        return "items-stretch";
    }
  };

  const getJustifyItemsClass = (justifyItems: GridProps["justifyItems"]) => {
    switch (justifyItems) {
      case "start":
        return "justify-items-start";
      case "center":
        return "justify-items-center";
      case "end":
        return "justify-items-end";
      case "stretch":
        return "justify-items-stretch";
      default:
        return "justify-items-stretch";
    }
  };

  const getJustifyContentClass = (
    justifyContent: GridProps["justifyContent"]
  ) => {
    switch (justifyContent) {
      case "start":
        return "justify-start";
      case "center":
        return "justify-center";
      case "end":
        return "justify-end";
      case "between":
        return "justify-between";
      case "around":
        return "justify-around";
      case "evenly":
        return "justify-evenly";
      default:
        return " ";
    }
  };

  const getAlignContentClass = (alignContent: GridProps["alignContent"]) => {
    switch (alignContent) {
      case "start":
        return "content-start";
      case "center":
        return "content-center";
      case "end":
        return "content-end";
      case "between":
        return "content-between";
      case "around":
        return "content-around";
      case "evenly":
        return "content-evenly";
      default:
        return " ";
    }
  };

  return (
    <div
      className={`grid ${getColumnsClass(columns)} ${getGapClass(
        gap
      )} ${getAlignItemsClass(alignItems)} ${getJustifyItemsClass(
        justifyItems
      )} ${getJustifyContentClass(justifyContent)} ${getAlignContentClass(
        alignContent
      )} ${className}`}
    >
      {children}
    </div>
  );
};

export default Grid;

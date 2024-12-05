"use client";
import React, { ReactNode, useState, ReactElement } from "react";

type AccordionItemProps = {
  title: string;
  children: ReactNode;
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
  isOpen?: boolean; // Controls open/close state
  onToggle?: () => void; // Handles toggle logic
};

type AccordionProps = {
  children: ReactElement<AccordionItemProps>[]; // Enforce AccordionItem type for children
  singleOpen?: boolean; // Enables single-open mode
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  openIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12h16M12 4v16"
        stroke="#292D33"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  closeIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12h16"
        stroke="#292D33"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  isOpen = false,
  onToggle,
}) => {
  return (
    <div
      className={`rounded-lg shadow-lg border ${isOpen ? "border-blue-600" : ""}`}
    >
      <button
        className="w-full text-left focus:outline-none font-semibold text-base lg:text-lg lg:p-6 p-4"
        onClick={onToggle} // Bind the toggle function here
        aria-expanded={isOpen}
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <span aria-hidden="true">{isOpen ? closeIcon : openIcon}</span>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-sm lg:px-6 px-4 lg:pb-6 pb-4 max-w-[95%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  singleOpen = true,
}) => {
  const [openIndex, setOpenIndex] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (singleOpen) {
      setOpenIndex((prevIndex) => (prevIndex[0] === index ? [] : [index]));
    } else {
      setOpenIndex(
        (prevIndex) =>
          prevIndex.includes(index)
            ? prevIndex.filter((i) => i !== index) // Close if already open
            : [...prevIndex, index] // Open the new item
      );
    }
  };

  return (
    <div className="mx-auto grid gap-6">
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              isOpen: openIndex.includes(index), // Compare index for open behavior
              onToggle: () => handleToggle(index), // Pass toggle function to each item
            })
          : child
      )}
    </div>
  );
};

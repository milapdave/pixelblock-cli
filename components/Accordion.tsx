"use client";
import React, { ReactNode, useState, ReactElement, useId } from "react";

type AccordionItemProps = {
  id?: string;
  title: string;
  children: ReactNode;
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
};

type AccordionProps = {
  children: ReactElement<AccordionItemProps> | ReactElement<AccordionItemProps>[];
  singleOpen?: boolean;
  defaultOpenIndex?: number | number[];
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id: providedId,
  title,
  children,
  openIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="dark:invert"
      aria-hidden="true"
    >
      <path
        d="M4 12h16M12 4v16"
        stroke="currentColor"
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
      className="dark:invert"
      aria-hidden="true"
    >
      <path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  isOpen = false,
  onToggle,
}) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  const contentId = `accordion-content-${id}`;

  return (
    <div
      className={`rounded-lg shadow-lg border transition-colors duration-200 ${
        isOpen ? "border-primary-600" : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <button
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg font-semibold text-base lg:text-lg lg:p-6 p-4"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <span className="transition-transform duration-300">
            {isOpen ? closeIcon : openIcon}
          </span>
        </div>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
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
  defaultOpenIndex = [],
}) => {
  // Convert defaultOpenIndex to array if it's a number
  const initialOpenIndexes = Array.isArray(defaultOpenIndex)
    ? defaultOpenIndex
    : [defaultOpenIndex];

  const [openIndexes, setOpenIndexes] = useState<number[]>(initialOpenIndexes);

  const handleToggle = (index: number) => {
    if (singleOpen) {
      setOpenIndexes(openIndexes[0] === index ? [] : [index]);
    } else {
      setOpenIndexes(
        openIndexes.includes(index)
          ? openIndexes.filter((i) => i !== index)
          : [...openIndexes, index]
      );
    }
  };

  // Handle case where children is a single element
  const childrenArray = React.Children.toArray(children) as ReactElement<AccordionItemProps>[];

  return (
    <div className="grid w-full gap-6">
      {childrenArray.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              key: `accordion-item-${index}`,
              id: child.props.id || `accordion-item-${index}`,
              isOpen: openIndexes.includes(index),
              onToggle: () => handleToggle(index),
            })
          : null
      )}
    </div>
  );
};
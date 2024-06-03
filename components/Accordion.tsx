"use client"
import React, { ReactNode, useState } from 'react';

type AccordionItemProps = {
  title: string;
  children: ReactNode;
};
type AccordionProps = {
  children: ReactNode;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`rounded-lg  shadow-lg border ${isOpen ? 'border-blue-600' : ''}`}>
      <button
        className="w-full text-left focus:outline-none font-semibold text-lg  p-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <span>{isOpen ? '-' : '+'}</span>
        </div>
      </button>
      {isOpen && <div className="text-sm  px-6 pb-6 max-w-[95%] ">{children}</div>}
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return <div className="mx-auto mt-8 grid gap-6">{children}</div>;
};

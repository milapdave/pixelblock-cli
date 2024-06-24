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
    <div className={`rounded-lg shadow-lg border ${isOpen ? 'border-blue-600' : ''}`}>
      <button
        className="w-full text-left focus:outline-none font-semibold text-base lg:text-lg p-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <span>{isOpen ? '-' : '+'}</span>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-dvh opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="text-sm px-6 pb-6 max-w-[95%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return <div className="mx-auto mt-8 grid gap-6">{children}</div>;
};

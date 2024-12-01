import React, { ReactNode } from "react";

interface SectionProps {
  className?: string;
  children: ReactNode;
}

const Section = ({ className = "", children }: SectionProps) => {
  const defaultClasses = "";
  return (
    <section className={`${defaultClasses} ${className}`}>
      <div className="max-w-screen-xl mx-auto lg:px-8 px-6">{children}</div>
    </section>
  );
};

export default Section;

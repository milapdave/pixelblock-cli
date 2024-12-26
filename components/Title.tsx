"use client";
import React, { FC, ReactNode, ElementType, useEffect } from "react";

interface TitleProps {
  title: ReactNode; // Allows any ReactNode, including strings and JSX
  content?: string;
  className?: string;
  as?: ElementType; // Allows any valid tag or custom component
  fontSize?: string; // Allow a string for custom font size
  fontWeight?: "sm" | "md" | "lg" | "xl"; // Customizable font weights
  ariaLevel?: number; // Optional for setting aria-level on non-heading tags
  color?: string; // Optional for custom text color
}

const Title: FC<TitleProps> = ({
  title,
  content,
  className = "",
  as: Tag = "h2", // Default to <h2> for SEO and accessibility
  fontSize = "lg:text-[2.85rem] text-3xl",
  fontWeight = "lg", // Default font weight
  ariaLevel,
  color = "text-black", // Default color to black
}) => {
  // Map fontWeight to respective Tailwind classes
  const fontWeightClasses = {
    sm: "font-medium",
    md: "font-semibold",
    lg: "font-bold",
    xl: "font-extrabold",
  };

  const fontWeightClass = fontWeightClasses[fontWeight] || "font-normal";

  // Determine whether to add role and aria-level attributes
  const isHeadingTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(
    Tag as string
  );
  const shouldHaveAriaLevel = !isHeadingTag && ariaLevel;

  // Development warning for SEO and accessibility best practices
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (Tag === "h1") {
        console.warn("Using <h1> tag. Ensure only one <h1> is used per page.");
      } else if (shouldHaveAriaLevel) {
        console.warn(
          "Using non-heading tag with aria-level. Ensure it's appropriate for accessibility."
        );
      }
    }
  }, [Tag, shouldHaveAriaLevel]);

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <Tag
        className={` ${color} ${fontSize} ${fontWeightClass}`}
        {...(isHeadingTag || ariaLevel
          ? {
              role: "heading",
              "aria-level": isHeadingTag ? undefined : ariaLevel, // Set aria-level only for non-heading elements
            }
          : {})}
      >
        {/* Render the title as a ReactNode to support color customization */}
        {title}
      </Tag>
      {content && (
        <p className="lg:text-lg" aria-live="polite">
          {content}
        </p>
      )}
    </div>
  );
};

export default Title;
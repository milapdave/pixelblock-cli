// components/Cards.tsx

import React, { ReactNode } from "react";

interface BlokProps {
  icon?: ReactNode; // New prop for rendering an icon
  title?: string;
  description?: string;
  date?: string;
  image?: string;
  readMoreLink?: string;
  tags?: string[]; // Optional array of tags
  author?: {
    name: string;
    role: string;
  }; // Optional author section
}

interface CardsProps {
  blok?: BlokProps;
  variant?: "center" | "left" | "right";
  shadow?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg";
  children?: ReactNode; // Allow custom content as children
}

const Cards: React.FC<CardsProps> = ({
  variant = "left",
  shadow = "md",
  radius = "md",
  blok,
  children,
}) => {
  const { title, description, date, image, readMoreLink, tags, icon, author } =
    blok || {}; // Use blok data if provided

  // Determine alignment classes
  const alignmentClasses =
    variant === "center"
      ? "text-center items-center"
      : variant === "right"
      ? "text-right items-end"
      : " ";

  // Determine shadow classes
  const shadowClasses =
    shadow === "sm"
      ? "shadow-Card1"
      : shadow === "lg"
      ? "shadow-Card3"
      : "shadow-Card2"; // default to "md" shadow

  // Determine radius classes
  const radiusClasses =
    radius === "sm"
      ? "rounded-sm"
      : radius === "lg"
      ? "rounded-lg"
      : "rounded-md"; // default to "md" radius

  return (
    <article
      className={`bg-white w-full grid relative border border-primary-500/5 ${alignmentClasses} ${shadowClasses} ${radiusClasses}`}
      role="group"
    >
      {image && !author && (
        <div className="relative w-full">
          <img
            src={image}
            height={400}
            width={600}
            alt={title || ""}
            className="w-full rounded-t-lg"
          />
        </div>
      )}
      <div
        className={` flex flex-col gap-4 grow ${
          image && !author ? "p-7" : "px-9 py-11"
        } ${alignmentClasses}`}
      >
        {/* Render the icon if it exists */}
        {icon && <div className="mb-4">{icon}</div>}
        {/* Render author section if author data exists */}
        {author && (
          <>
            {/* Author's image if it exists */}
            {image && (
              <div className="flex -space-x-2 overflow-hidden top-0 -mt-20">
                <img
                  src={image}
                  height={80}
                  width={80}
                  alt={title || ""}
                  className="inline-block h-20 w-20 rounded-full"
                />
              </div>
            )}
          </>
        )}
        {date && <div className="text-sm">{date}</div>}
        {title && (
          <h2 className="font-manrope text-2xl font-bold text-black line-clamp-2">
            {title}
          </h2>
        )}
        {description && <p className="line-clamp-4 grow">{description}</p>}
        {/* Render tags if available */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="border-2 border-primary-500/10 text-primary-500 hover:bg-primary-500/10 px-4 py-1 rounded-md text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {readMoreLink && (
          <a
            href={readMoreLink}
            className="text-primary-500 hover:underline font-semibold"
            aria-label="Read more"
          >
            Read More
          </a>
        )}

        {/* Render author section if author data exists */}
        {author && (
          <div className="font-manrope mt-4">
            <div className="text-black font-bold">{author.name}</div>
            <span className="">{author.role}</span>
          </div>
        )}

        {/* Render custom children content */}
        {children}
      </div>
    </article>
  );
};

export default Cards;

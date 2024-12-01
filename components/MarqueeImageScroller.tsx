"use client";
import React from "react"; // Add this line

interface MarqueeImageScrollerProps {
  images: { id: string; filename: string; alt: string }[];
  speed?: number; // Add optional speed prop (default will be handled in the component)
}

const MarqueeImageScroller = ({
  images,
  speed = 50,
}: MarqueeImageScrollerProps) => {
  const marqueeStyle = {
    animation: `scroll ${speed}s linear infinite`, // Use the speed prop
    animationPlayState: "running",
  };

  return (
    <div
      aria-label="Scrolling image gallery"
      className="w-full overflow-hidden"
    >
      <div className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-6 relative  before:content-[''] before:absolute before:top-0 before:left-0 before:w-[100px] before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:content-[''] after:absolute after:top-0 after:right-0 after:w-[100px] after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:z-10">
        <div
          className="relative flex w-full select-none overflow-hidden"
          role="region"
          aria-live="polite"
          aria-label={"Active scrolling"}
        >
          <ul
            className="marquee__content m-0 flex  min-w-[709px] flex-shrink-0 justify-around p-0 md:min-w-full"
            style={marqueeStyle}
          >
            {images.map((image, index) => (
              <li
                key={`${image.id}-${index}`}
                className="flex max-w-72 grow items-center justify-center px-4"
              >
                <img
                  src={image.filename}
                  alt={image.alt || ""}
                  width={300}
                  height={144}
                  className="h-[144px] object-contain"
                />
              </li>
            ))}
          </ul>

          <ul
            className="marquee__content m-0 flex min-w-[709px] flex-shrink-0 justify-around p-0 md:min-w-full"
            aria-hidden="true"
            style={marqueeStyle}
          >
            {images.map((image, index) => (
              <li
                key={`${image.id}-duplicate-${index}`}
                className="flex max-w-72 grow items-center justify-center px-4"
              >
                <img
                  src={image.filename}
                  alt={image.alt || ""}
                  width={300}
                  height={144}
                  className="h-[144px] object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Inline styles for the animation */}
      <style>
        {`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MarqueeImageScroller;

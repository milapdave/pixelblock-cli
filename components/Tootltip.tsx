"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  delay?: number;
  defaultPosition?: "top" | "bottom" | "left" | "right";
  bgClass?: string;
  arrowClass?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  delay = 0,
  defaultPosition = "top",
  bgClass = "bg-black text-white",
  arrowClass = "bg-black",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const mouseInTooltip = useRef(false);
  const mouseInTarget = useRef(false);
  const [position, setPosition] = useState<"top" | "bottom" | "left" | "right">(defaultPosition);
  const [tooltipStyles, setTooltipStyles] = useState({});

  useEffect(() => {
    if (isVisible && tooltipRef.current && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const spacing = 8; // Space between target and tooltip

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = targetRect.top - tooltipRect.height - spacing;
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          break;
        case "bottom":
          top = targetRect.bottom + spacing;
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          break;
        case "left":
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          left = targetRect.left - tooltipRect.width - spacing;
          break;
        case "right":
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          left = targetRect.right + spacing;
          break;
      }

      setTooltipStyles({
        top: `${top}px`,
        left: `${left}px`,
      });
    }
  }, [isVisible, position]);

  const hideTooltip = () => {
    setTimeout(() => {
      if (!mouseInTooltip.current && !mouseInTarget.current) {
        setIsVisible(false);
      }
    }, 100);
  };

  const getArrowPosition = () => {
    switch (position) {
      case "top":
        return "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45";
      case "bottom":
        return "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45";
      case "left":
        return "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45";
      case "right":
        return "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45";
    }
  };

  const getTooltipClasses = () => {
    const baseClasses = `fixed z-50 px-3 py-2 rounded ${bgClass}`;
    return baseClasses;
  };

  return (
    <div
      ref={targetRef}
      className="relative inline-block"
      tabIndex={0} // Make it focusable
      aria-describedby={isVisible ? "tooltip-id" : undefined} // Associate tooltip
      onMouseEnter={() => {
        mouseInTarget.current = true;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (delay) {
          timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
        } else {
          setIsVisible(true);
        }
      }}
      onMouseLeave={() => {
        mouseInTarget.current = false;
        hideTooltip();
      }}
      onFocus={() => setIsVisible(true)} // Show on focus
      onBlur={() => setIsVisible(false)} // Hide on blur
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={getTooltipClasses()}
          style={tooltipStyles}
          role="tooltip"
          id="tooltip-id" // Unique ID for screen readers
          aria-hidden={!isVisible} // Manage visibility
          onMouseEnter={() => {
            mouseInTooltip.current = true;
          }}
          onMouseLeave={() => {
            mouseInTooltip.current = false;
            hideTooltip();
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsVisible(false); // Close on Escape key
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
          <div
            className={`absolute w-2 h-2 ${getArrowPosition()} ${arrowClass}`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;

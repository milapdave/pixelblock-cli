"use client";

import React, { Fragment, useState } from "react";

interface NavLink {
  linkLabel: string;
  link: {
    cached_url: string;
    linktype: string;
    target?: string;
  };
}

interface NavItem {
  title: string;
  navLinks?: NavLink[];
  titleLink?: {
    cached_url: string;
    linktype: string;
  };
}

interface MenuAccordionProps {
  navItems: NavItem[];
}

const MenuAccordion: React.FC<MenuAccordionProps> = ({ navItems }) => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (index: number) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const baseLinkClasses =
    "inline-block py-1 hover:text-primary-500 hover:underline";
  const activeClasses = "active:text-primary-900 active:underline";
  const focusClasses = "focus:text-primary focus:outline focus:outline-1";

  return (
    <ul className="m-0 flex w-full list-none flex-col flex-wrap p-0 md:flex-row md:gap-6 md:gap-y-16 text-black">
      {navItems.map((navItem, index) => {
        const key = navItem.title.toLowerCase().replace(/\s+/g, "");

        return (
          <li key={index} className="w-full md:max-w-[204px] px-1">
            {navItem.navLinks && navItem.navLinks.length > 0 ? (
              <Fragment>
                {/* Mobile view: Accordion button */}
                <button
                  onClick={() => toggleSubmenu(index)}
                  aria-expanded={openSubmenus[index]}
                  aria-controls={`submenu-${index}`}
                  className={`flex w-full items-center justify-between gap-x-1 py-3 text-left text-base font-semibold  ${
                    openSubmenus[index]
                      ? ""
                      : "border-b border-primary-50/25 lg:border-0"
                  }`}
                >
                  {navItem.title}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className={`h-6 w-6 flex-none text-primary-500 transition duration-200 md:hidden p-1 ${
                      openSubmenus[index] ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {/* Mobile view: Collapsible submenu */}
                <ul
                  id={`submenu-${key}`}
                  className={`m-0 list-none flex-col border-b border-primary-50/25 pl-0  md:mb-0 md:border-none md:pb-0 ${
                    openSubmenus[index]
                      ? " mb-2 max-h-screen pb-2 opacity-100"
                      : " max-h-0 overflow-hidden opacity-0 md:max-h-max md:opacity-100"
                  } transition-all duration-300 ease-in-out md:flex`}
                >
                  {navItem.navLinks.map((subitem, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href={`${subitem.link.linktype === "url" ? "" : "/"}${
                          subitem.link.cached_url
                        }`}
                        aria-label={`Go to ${subitem.linkLabel}`}
                        target={subitem.link.target}
                        className={`${baseLinkClasses} ${focusClasses} ${activeClasses}`}
                      >
                        {subitem.linkLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </Fragment>
            ) : (
              <a
                href={`${navItem.titleLink?.linktype === "url" ? "" : "/"}${
                  navItem.titleLink?.cached_url
                }`}
                className="block py-2 font-medium hover:text-primary-500"
              >
                {navItem.title}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MenuAccordion;

import React, { useState } from 'react';

function Tabs({ defaultValue, className, variant, children , radius }: any) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      <div className="flex flex-col gap-5">
        {React.Children.map(children, (child) => {
          if (child.type === TabsList) {
            return React.cloneElement(child, { activeTab, setActiveTab, variant , radius});
          } else if (child.type === TabsContent && child.props.value === activeTab) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
}

function TabsList({ children, className, activeTab, setActiveTab, variant = 'underline' , radius  }: any) {

  const styleClass = (() => {
    switch (variant) {
      case 'solid':
        return 'inline-flex h-10 items-center justify-center bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400 ';
      case 'underline':
        return 'flex gap-2';
      default:
        return 'border-black';
    }
  })();

  const borderRadiusStyle = (() => {
    switch (radius) {
      case 'full':
        return 'rounded-full';
      case 'lg':
        return 'rounded-lg';
      case 'md':
        return 'rounded-md';
      case 'sm':
        return 'rounded-sm';
      default:
        return 'rounded-sm';
    }
  })();

  return (
    <div className={`${className}`} role="tablist">
      <div className={` ${styleClass} ${borderRadiusStyle}`}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { activeTab, setActiveTab, variant , radius});
        })}
      </div>
    </div>
  );
}

function TabsTrigger({ value, children, className, activeTab, setActiveTab, variant = 'underline' , radius }: any) {
  const isActive = activeTab === value;

  const styleClass = (() => {
    switch (variant) {
      case 'solid':
        return 'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50';
      case 'underline':
        return `inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-b-2 border-transparent data-[state=active]:border-black dark:data-[state=active]:text-gray-50 dark:data-[state=active]:border-white data-[state=active]:text-gray-950 '}`;
      default:
        return 'border-black';
    }
  })();

  const borderRadiusStyle = (() => {
    switch (radius) {
      case 'full':
        return 'rounded-full';
      case 'lg':
        return 'rounded-lg';
      case 'md':
        return 'rounded-md';
      case 'sm':
        return 'rounded-sm';
      default:
        return 'rounded-sm';
    }
  })();

  return (
    <button
      className={`${className} ${styleClass} ${borderRadiusStyle}`}
      onClick={() => setActiveTab(value)} data-state={isActive ? "active" : "inactive"}
      role="tab"
      aria-selected={isActive ? "true" : "false"}
      tabIndex={isActive ? 0 : -1}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children }: any) {
  return value ? children : null;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

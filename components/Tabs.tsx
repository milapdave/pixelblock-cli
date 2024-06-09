import React, { useState } from 'react';

function Tabs({ defaultValue, className, children }:any) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      <div className="flex flex-col gap-5">
        {React.Children.map(children, child => {
          if (child.type === TabsList) {
            return React.cloneElement(child, { activeTab, setActiveTab });
          } else if (child.type === TabsContent && child.props.value === activeTab) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
}

function TabsList({ children, className, activeTab, setActiveTab }:any) {
  return (
    <div className={className}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
}

function TabsTrigger({ value, children, className, activeTab, setActiveTab }:any) {
  const isActive = activeTab === value;

  return (
    <button
      className={`${className}  text-base border-b-2 border-transparent ${isActive ? 'active border-black' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children }:any) {
  return value ? children : null;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

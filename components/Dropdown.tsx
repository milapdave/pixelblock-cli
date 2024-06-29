"use client"
import React, { useState, useEffect, useRef } from 'react';

interface DropdownProps {
  options: { value: string; label: string; disabled?: boolean }[];
  withSearch?: boolean;
  placeholder: string;
  onSelect: (selected: string[]) => void;
  multiple?: boolean;
  renderOption?: (option: { value: string; label: string; disabled?: boolean }) => React.ReactNode;
  searchPlaceholder?: string;
  selectedOptions?: string[];
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  withSearch = false,
  placeholder,
  onSelect,
  multiple = false,
  renderOption,
  searchPlaceholder = 'Search...',
  selectedOptions = [],
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selected, setSelected] = useState<string[]>(selectedOptions);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  useEffect(() => {
    if (selectedOptions) {
      setSelected(selectedOptions);
    }
  }, [selectedOptions]);

  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (option: string) => {
    let newSelected;
    if (multiple) {
      if (selected.includes(option)) {
        newSelected = selected.filter(item => item !== option);
      } else {
        newSelected = [...selected, option];
      }
    } else {
      newSelected = [option];
      setIsOpen(false);
    }
    setSelected(newSelected);
    onSelect(newSelected);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      onOpenChange?.(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderOptionDefault = (option: { value: string; label: string; disabled?: boolean }) => (
    <div className={`p-2 ${option.disabled ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}>
      {option.label}
    </div>
  );

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <div
        className="bg-white border border-gray-300 rounded-md p-2 flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>{selected.length > 0 ? selected.map(sel => options.find(opt => opt.value === sel)?.label).join(', ') : placeholder}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10">
          {withSearch && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border-b border-gray-300"
              placeholder={searchPlaceholder}
            />
          )}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className={`p-2 hover:bg-gray-100 ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => !option.disabled && handleSelect(option.value)}
              >
                {renderOption ? renderOption(option) : renderOptionDefault(option)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

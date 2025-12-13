import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ trigger, children, align = "end" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute ${
            align === "end" ? "right-0" : "left-0"
          } z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-100`}
        >
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ children, onClick, className = "" }) => (
  <button
    onClick={(e) => {
      onClick && onClick(e);
    }}
    className={`block w-full text-left px-3 md:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors ${className}`}
  >
    {children}
  </button>
);

export { Dropdown, DropdownItem };

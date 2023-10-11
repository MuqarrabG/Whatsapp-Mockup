import React, { useState, useEffect, useRef } from "react";

function Header({ chat }) {
  return (
    <div className="bg-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center">
        {chat.user.avatar ? (
          <img
            src={chat.user.avatar}
            alt={`Avatar of ${chat.name}`}
            className="inline-block w-12 h-12 rounded-full mr-4"
          />
        ) : (
          <span className="inline-inline-block w-12 h-12 rounded-full mr-4 bg-gray-300 flex items-center justify-center w-12 h-12 rounded-full mr-4">
            <ion-icon name="people-outline" class="text-3xl"></ion-icon>
          </span>
        )}
        <span className="font-medium text-xl">{chat.user.name}</span>
      </div>
      <DropdownMenu />
    </div>
  );
}

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMenuClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          onClick={handleMenuClick}
          className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-400 active:bg-gray-700 focus:outline-none focus:ring focus:ring-black"
        >
          <ion-icon name="ellipsis-vertical" class="text-3xl"></ion-icon>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Edit Name
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Change Background Colour
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Add into Group
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

import React, {useState, useEffect, useRef} from "react";
import * as randomService from "./../../services/randomService.js";

function TopBar() {
  //fetch some random user
  const [user, setUser] = useState([]);

  useEffect(() => {
    randomService
      .getUser()
      .then((response) => {
        console.log(response);
        setUser(response);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);


  //TODO Make a dropdown menu

  return (
    <div className="bg-gray-200 p-4 flex justify-between items-center">
      <img
        src={user.avatar}
        alt="User Profile"
        className="rounded-full h-12 w-12 object-cover"
      />
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
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
  
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <button 
            onClick={handleMenuClick} 
            className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-400 active:bg-gray-700 focus:outline-none focus:ring focus:ring-black"
          >
            <ion-icon name="menu-sharp" class="text-4xl"></ion-icon>
          </button>
        </div>
  
        {isOpen && (
          <div 
            className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Create Group</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Delete Group</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Block user</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Log out</a>
            </div>
          </div>
        )}
      </div>
    );
  }

export default TopBar;

/*
    When using ion-icons use class to adjust the css properties
*/

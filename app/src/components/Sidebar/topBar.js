import React, {useState, useEffect} from "react";
import { ellipsisVerticalOutline, menu, menuSharp } from "ionicons/icons";
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
      <ion-icon name="menu-sharp" class="text-4xl"></ion-icon>
    </div>
  );
}

export default TopBar;

/*
    When using ion-icons use class to adjust the css properties
*/

import React, { useEffect, useState } from "react";
import SignupPage from "./signupPage.js";
import * as randomService from "./../services/randomService.js";
import MessagingPanel from "./Messaging Panel/messagingPanel.js";
import SideBar from "./Sidebar/sideBar.js";

function HomePage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    randomService.getRandomUsers(10).then((response) => {
      console.log(response);
      setUsers(response);
    }).catch((error) => {
      console.error("Failed to fetch users:", error);
    });
  }, []);

  return (
    <div className="flex w-full h-screen overflow-y-hidden">
      <SideBar />
      <MessagingPanel />
    </div>
  );
}

export default HomePage;

import React, { useState } from "react";
import { logoReact, menuSharp } from "ionicons/icons";
import TopBar from "./topBar";
import SearchBar from "./searchBar";
import ChatList from "./chatList";
import fakeData from "./../fakeData.json"

function Sidebar() {
  const userChats = fakeData.chats;

  return (
    <div className="min-w-[30%] bg-blue-200 h-screen overflow-auto border-r border-black">
      <TopBar />
      <SearchBar />
      <ChatList chats={userChats} />
      <p>Component 1 TEST</p>
    </div>
  );
}
export default Sidebar;

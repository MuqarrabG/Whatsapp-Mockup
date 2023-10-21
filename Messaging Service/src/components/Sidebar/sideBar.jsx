/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { logoReact, menuSharp } from "ionicons/icons";
import TopBar from "./topBar";
import SearchBar from "./searchBar";
import ChatList from "./chatList";
import fakeData from "../fakeData.json"

function Sidebar() {
  const userChats = fakeData.chats;

  return (
    <div className="w-1/3 border flex flex-col border-black">
      <TopBar />
      <SearchBar />
      <ChatList chats={userChats} />
    </div>
  );
}
export default Sidebar;

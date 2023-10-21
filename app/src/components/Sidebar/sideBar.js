import React, { useState } from "react";
import { logoReact, menuSharp } from "ionicons/icons";
import TopBar from "./topBar";
import SearchBar from "./searchBar";
import ChatList from "./chatList";
import fakeData from "./../fakeData.json"

function Sidebar({ user }) {
  const userChats = fakeData.chats;

  return (
    <div className="w-1/3 border flex flex-col border-black">
      <TopBar user={user} />
      <SearchBar />
      <ChatList user={user} chats={userChats} />
    </div>
  );
}
export default Sidebar;

import React, {useState} from "react";
import { logoReact, menuSharp } from 'ionicons/icons';
import TopBar from "./topBar";
import SearchBar from "./searchBar";
import ChatList from "./chatList";

function Sidebar() {

    const userChats = [
        { id: 1, user: { name: 'Alice', avatar: 
        "https://robohash.org/sapientemolestiaeneque.png?size=300x300&set=set1" }, lastMessage: 'See you soon!' },
        { id: 2, user: { name: 'Bob', avatar: 
        "https://robohash.org/sapientemolestiaeneque.png?size=300x300&set=set1" }, lastMessage: 'Where are you?' },
        // ...more chats
      ];

    return (
        <div className="min-w-[30%] bg-blue-200 h-screen overflow-auto">
            <TopBar />
            <SearchBar />
            <ChatList chats={userChats} />
            <p>Component 1</p>
        </div>
    );
}
export default Sidebar;
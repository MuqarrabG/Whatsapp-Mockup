import React, {useState} from "react";
import { logoReact, menuSharp } from 'ionicons/icons';
import TopBar from "./topBar";
import SearchBar from "./searchBar";
import ChatList from "./chatList";

function Sidebar() {

    const userChats = [
        { id: 1, user: { name: 'Alice', avatar: 
        "https://robohash.org/sapientemolestiaeneque.png?size=300x300&set=set1" }, lastMessage: { sender: 'You', message: 'See you soon!'}, timestamp: '2023-10-06T09:15:00Z'},
        { id: 2, user: { name: 'Bob', avatar: 
        "https://robohash.org/sapientemolestiaeneque.png?size=300x300&set=set1" }, lastMessage: { sender: 'Alice', message: 'Where are you?'}, timestamp: '2023-10-06T08:30:00Z' },
        // ...more chats
      ];

    return (
        <div className="min-w-[30%] bg-blue-200 h-screen overflow-auto">
            <TopBar />
            <SearchBar />
            <ChatList chats={userChats} />
            <p>Component 1 TEST</p>
        </div>
    );
}
export default Sidebar;
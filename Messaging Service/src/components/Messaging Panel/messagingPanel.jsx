/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Header from "./header";
import ChatMessages from "./chatMessages";
import MessageInput from "./messageInput";

function MessagingPanel({ socket, messages }) {
  const [selectedChat, setSelectedChat] = useState(() => {
    // Initially set state from localStorage.
    return JSON.parse(localStorage.getItem("selectedChat"));
  });

  const [loading, setLoading] = useState(true);

  //Need to improve logic
  const sendMessage = (message) => {
    // Handle sending the message here
    console.log("Sent:", message);
  };

  useEffect(() => {
    const handleChatSelection = () => {
      // Update state when a new chat is selected.
      setSelectedChat(JSON.parse(localStorage.getItem("selectedChat")));
      setLoading(false)
    };

    window.addEventListener("chatSelected", handleChatSelection);

    // Cleanup: Remove event listener on component unmount.
    return () => {
      window.removeEventListener("chatSelected", handleChatSelection);
    };
  }, []);

  if (loading) {
    return <h1>No Chats selected</h1>;
  }

  // Add text input
  return (
    <div className="w-2/3 border flex flex-col">
      <Header chat={selectedChat}/>
      <ChatMessages messages={selectedChat.messages} currentUser={selectedChat.user.name}/>
      <MessageInput socket={socket} currentUser={selectedChat.user.name} sendMessage={sendMessage} />
    </div>
  );
}

export default MessagingPanel;

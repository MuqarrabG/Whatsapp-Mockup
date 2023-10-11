import React, { useState, useEffect } from "react";
import Header from "./header";
import ChatMessages from "./chatMessages";
import MessageInput from "./messageInput";

function MessagingPanel() {
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
    <div className="min-w-[70%] bg-red-200 h-screen overflow-hidden overscroll-contain">
      <Header chat={selectedChat}/>
      <ChatMessages messages={selectedChat.messages} currentUser={selectedChat.user.name}/>
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default MessagingPanel;

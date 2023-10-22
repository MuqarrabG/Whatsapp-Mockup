import React, { useState, useEffect } from "react";
import Header from "./header";
import ChatMessages from "./chatMessages";
import MessageInput from "./messageInput";
import { getChatById } from "../../services/api";
import makeToast from "../Toaster";

function MessagingPanel({ socket, messages, user }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);

  // ... rest of your component's code ...

  useEffect(() => {
    const handleChatSelection = (event) => {
      // Extract the selected chat ID from the event detail.
      const newChatId = event.detail;
      setSelectedChat(newChatId);

      // It might be a good idea to set loading to true here if fetching the chat takes time.
      setLoading(true);

      getChatById(newChatId)
        .then((res) => {
          setChat(res.data);
          setLoading(false);
          makeToast("success", "Messages Retrieved");
        })
        .catch((error) => {
          console.error(error);
          makeToast("error", "We have a problem");
          setLoading(false);
        });
    };

    // Listen for the "chatSelected" event.
    window.addEventListener("chatSelected", handleChatSelection);

    // Cleanup: Remove event listener on component unmount.
    return () => {
      window.removeEventListener("chatSelected", handleChatSelection);
    };
  }, []); // Empty dependency array means this useEffect runs once when the component mounts and cleans up when it unmounts.

  // ... rest of your component's code ...

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!chat) {
    return <h1>No Chats selected</h1>;
  }
  const sendMessage = (message) => {
    // Handle sending the message here
    console.log("Sent:", message);
  };
  // Add text input
  return (
    <div className="w-2/3 border flex flex-col">
      <Header chat={chat} currentUser={user} />
      <ChatMessages messages={chat.messages} currentUser={user} />
      <MessageInput
        socket={socket}
        currentUser={user}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default MessagingPanel;

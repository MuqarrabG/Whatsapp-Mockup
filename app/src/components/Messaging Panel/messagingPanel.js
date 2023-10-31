import React, { useState, useEffect, useRef } from "react";
import Header from "./header";
import ChatMessages from "./chatMessages";
import MessageInput from "./messageInput";
import { getChatById } from "../../services/api";
import makeToast from "../Toaster";

function MessagingPanel({ socket, user }) {
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const handleChatSelection = (event) => {
      // Extract the selected chat ID from the event detail.
      const newChatId = event.detail;

      setLoading(true);

      getChatById(newChatId)
        .then((res) => {
          setChat(res.data);
          setMessages(res.data.messages);
          //setMessages(prevState => [...prevState, newMessage])
          setLoading(false);
          //console.log("Message state is: ", typeof messages, messages)
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
  }, []);

  useEffect(() => {
    if (chat && chat.groupId) {
      socket.emit("join_chat", chat.groupId);
    }
  }, [socket, chat]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socket && messages) {
      const handler = ({ newMessage }) => {
        setMessages((prevState) => [...prevState, newMessage]);
        console.log(newMessage);
      };
      socket.on("messageResponse", handler);
      // Cleanup function
      return () => socket.off("messageResponse", handler);
    }
  }, [socket, messages]);

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
      <ChatMessages messages={messages} currentUser={user} lastMessageRef={lastMessageRef}/>
      <MessageInput
        socket={socket}
        currentUser={user}
        sendMessage={sendMessage}
        chatId={chat.groupId}
      />
    </div>
  );
}

export default MessagingPanel;

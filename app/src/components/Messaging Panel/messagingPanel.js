import React, { useState, useEffect, useRef } from "react";
import Header from "./header";
import ChatMessages from "./chatMessages";
import MessageInput from "./messageInput";
import { getChatById } from "../../services/api";
import makeToast from "../Toaster";

function MessagingPanel({ socket, user }) {
  // useState hooks to maintain state for the selected chat, loading status, and the array of messages.
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  // useRef hook to create a mutable ref object that can hold a reference to DOM elements or values that persist across renders without triggering a re-render.
  const lastMessageRef = useRef(null);
  
  // useEffect hook without dependencies array, meaning it runs once on mount and cleanup runs on unmount.
  useEffect(() => {
    // handleChatSelection is a function that gets called when the 'chatSelected' event is emitted.
    const handleChatSelection = (event) => {
      // Extracts the chat ID from the emitted event detail.
      const newChatId = event.detail;
  
      // Sets the loading state to true, which could be used to display a loading indicator in the UI.
      setLoading(true);
  
      // Calls getChatById, which likely sends an HTTP request to retrieve the chat data for the given ID.
      getChatById(newChatId)
        .then((res) => {
          // On successful retrieval, updates the chat state with the received data.
          setChat(res.data);
          // Updates the messages state with the messages from the received data.
          setMessages(res.data.messages);
          // Resets the loading state to false as the operation is complete.
          setLoading(false);
          // Displays a success toast notification to the user.
          makeToast("success", "Messages Retrieved");
        })
        .catch((error) => {
          // Logs the error to the console for debugging purposes.
          // console.error(error);
          // Displays an error toast notification to the user.
          makeToast("error", "We have a problem");
          // Resets the loading state to false as the operation has ended with an error.
          setLoading(false);
        });
    };
    // Adds an event listener to the window object that listens for the 'chatSelected' event.
    window.addEventListener("chatSelected", handleChatSelection);
  
    // Cleanup function: removes the event listener from the window object when the component unmounts.
    return () => {
      window.removeEventListener("chatSelected", handleChatSelection);
    };
  // The empty dependencies array ensures this effect runs only once after the initial render.
  }, []);


  // joins the socket on that the selected chatid is on so the messages stay within the selected chat and no leak to others
  useEffect(() => {
    if (chat && chat.groupId) {
      socket.emit("join_chat", chat.groupId);
    }
  }, [socket, chat]); // Load active chats of the logged in user.

  // Auto scrolls to the bottom when a message is recieved
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]); // Autoscroll to latest message.

  // useEffect hook is used to perform side effects in function components.
  useEffect(() => {
    // Check if the 'socket' object and 'messages' state are available (truthy).
    if (socket && messages) {
      // Defines a handler function that takes an object with a 'newMessage' property.
      const handler = ({ newMessage }) => {
        // Updates the 'messages' state by calling 'setMessages'.
        // It takes the previous state, spreads it to retain existing messages, and appends the 'newMessage'.
        setMessages((prevState) => [...prevState, newMessage]);
        // console.log(newMessage);
      };
      // Sets up a 'messageResponse' event listener on the 'socket' with the handler to receive new messages.
      socket.on("messageResponse", handler);
      // Cleanup function: This function is returned by the useEffect hook to clean up the effect.
      // It removes the 'messageResponse' event listener from the socket when the component unmounts,
      // or before the next time the effect runs to prevent memory leaks and unnecessary event listener registrations.
      return () => socket.off("messageResponse", handler);
    }
  }, [socket, messages]); // This effect depends on 'socket' and 'messages' and will re-run if either changes.


  // if the chat is selected but takes time to recieve a response from the server it shows a loading message
  if (loading) {
    return <h1>Loading...</h1>;
  }
  // if the chat isn't selected it renders this
  if (!chat) {
    return <h1>No Chats selected</h1>;
  }

  // Redundant code 
  // const sendMessage = (message) => {
  //   // Handle sending the message here
  //   console.log("Sent:", message);
  // };
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

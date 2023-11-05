import React, { useState, useRef, useEffect } from "react";

const MessageInput = ({ socket, typingStatus, currentUser, chatId}) => {
  // State hook for message text, initialized as an empty string.
  const [message, setMessage] = useState("");
  // Ref hook for the textarea element to manipulate its properties directly.
  const textareaRef = useRef(null);
  // State hook for the typing indicator status, initialized as null.
  const [isTyping, setIsTyping] = useState(null);
  // Ref hook to store the typing timeout identifier.
  const typingTimeoutRef = useRef(null);
  
  // Function to handle sending messages.
  const handleSendMessage = (event) => {
    // Prevents the default form submit behavior.
    event.preventDefault();
    // Checks if the message is not just whitespace before sending.
    if (message.trim()) {
      const newMessage = {
        // Content of the message.
        content: message,
        // The username of the current user.
        author: currentUser.username, 
        // The unique identifier of the current user.
        authorID: currentUser.userId,
        // The timestamp of when the message was created, in ISO format with the 'Z' designation for UTC.
        createdAt: new Date().toISOString().split(".")[0] + "Z",
      }
      // Emit a 'message' event to the server through the socket connection, passing the message and chat ID.
      socket.emit("message", {newMessage, chatId});
    }
    // Resets the message state to an empty string after sending.
    setMessage("");
  };
  
  // Function to emit a typing event.
  const handleTyping = () => {
    // Emit a 'typing' event with the current user's username and chat ID.
    socket.emit('typing', {username: currentUser.username, chatId})
  };
  
  // Function to handle key presses in the textarea.
  const handleKeyDown = (event) => {
    // Checks for the Enter key press without the Shift key.
    if (event.key === "Enter" && !event.shiftKey) {
      // Prevents default behavior to avoid line breaks in the textarea.
      event.preventDefault();
      // Calls the send message handler.
      handleSendMessage(event);
    } else {
      // Otherwise, calls the typing handler.
      handleTyping()
    }
  };
  
  // Effect for handling the typing response from the server.
  useEffect(() => {
    // Listening for 'typingResponse' events from the server.
    socket.on("typingResponse", (data) => {
      // Clears any existing typing timeout.
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
  
      // Sets the typing status with the received data.
      setIsTyping(data);
      
      // Starts a new timeout to remove the typing status after 1.5 seconds.
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(null);
      }, 1500);
    });
  
    // Cleanup function to remove the event listener and clear the timeout when the component unmounts.
    return () => {
      socket.off("typingResponse");
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [socket]);
  
  // Effect to adjust the height of the textarea based on its content.
  useEffect(() => {
    // Resets the height to 'auto' before recalculating to prevent incorrect sizing.
    textareaRef.current.style.height = "auto";
    // Sets the height to the scrollHeight, ensuring the content fits without scrollbars.
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    // Scrolls to the bottom of the textarea to make the latest content visible.
    textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
  }, [message]);


  return (
    <div class="bg-gray-200 px-4 py-4 flex flex-col items-start overflow-auto">
      {isTyping && (
        <div class="self-stretch py-2 text-gray-700">
          <p class="text-sm px-4">{isTyping.username} is typing...</p>
        </div>
      )}
      <div class="flex w-full items-center">
        <div>
          <ion-icon
            icon="attach-sharp"
            class="text-3xl cursor-pointer"
          ></ion-icon>
        </div>
        <div class="flex-1 mx-4">
          <textarea
            type="text"
            ref={textareaRef}
            placeholder="Write message here!"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            className="w-full border rounded-lg px-2 py-2"
            onKeyDown={handleKeyDown}
            style={{ maxHeight: "200px" }}
          ></textarea>
        </div>
        <div>
          <button onClick={handleSendMessage} className="">
            <ion-icon
              name="send-sharp"
              class="text-2xl hover:text-green-500"
            ></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;

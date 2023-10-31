import React, { useState, useRef, useEffect } from "react";

const MessageInput = ({ socket, typingStatus, currentUser, chatId}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(null);
  const typingTimeoutRef = useRef(null);

  const handleSendMessage = (event) => {
    // handles sending the message via socket.io server event.
    event.preventDefault();
    if (message.trim()) {
      const newMessage = {
        content: message,
        author: currentUser.username, // need to change from local storage, only use for development.
        authorID: currentUser.userId,
        createdAt: new Date().toISOString().split(".")[0] + "Z",
      }
      socket.emit("message", {newMessage, chatId});
    }
    setMessage(""); // Clear the input once the message has been sent.
  };

  const handleTyping = () => {
    //function to display if a user is typing.
    socket.emit('typing',  {username: currentUser.username, chatId}) // need to change from local storage, only use for development.
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Check for the Enter key; the shiftKey check allows for new lines when Shift+Enter is pressed
      event.preventDefault();
      handleSendMessage(event);
    } else {
      handleTyping()
    }
  };
  useEffect(() => {
    socket.on("typingResponse", (data) => {
      // Clear the old timeout if there's one
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      setIsTyping(data); // Set new typing data
      
      // Set a timeout to clear the typing indicator after 1.5 seconds
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(null);
      }, 1500); // 1.5 seconds until the typing status expires
    });

    // Cleanup the effect on unmount
    return () => {
      socket.off("typingResponse");
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [socket]);
  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
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

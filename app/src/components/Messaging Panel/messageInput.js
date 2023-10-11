import React, { useState, useRef, useEffect } from "react";

const MessageInput = ({ sendMessage, socket }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if(message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  const handleSendClick = () => {
    if (message.trim()) {
      // Check if message is not only whitespace
      sendMessage(message);
      setMessage(""); // Clear the input after sending
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = (textareaRef.current.scrollHeight) + 'px';
    textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
  }, [message]);

  return (
    <div className="p-4 bg-gray-200 flex items-end overscroll-contain">
      <ion-icon
        icon="attach-sharp"
        class="text-3xl cursor-pointer mr-4"
      ></ion-icon>
      <textarea
        ref={textareaRef}
        placeholder="Type a message"
        value={message}
        onChange={handleInputChange}
        className="flex-grow p-2 border rounded-lg resize-none overflow-auto"
        style={{ maxHeight: "200px" }} // Limit the growth
      ></textarea>
      <button onClick={handleSendClick} className="p-2 ml-4">
        <ion-icon name="send-sharp" class="text-2xl"></ion-icon>
      </button>
    </div>
  );
};

export default MessageInput;

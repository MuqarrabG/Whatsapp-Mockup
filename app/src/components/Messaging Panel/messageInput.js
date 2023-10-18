import React, { useState, useRef, useEffect } from "react";

const MessageInput = ({ sendMessage, socket, typingStatus, currentUser }) => {

  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSendMessage = (event) => { // handles sending the message via socket.io server event.
    event.preventDefault();
    if(message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: currentUser, // need to change from local storage, only use for development.
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    console.log({ userName: `${currentUser}`, message })
    setMessage(''); // Clear the input once the message has been sent.
  };

  const handleTyping = () => { // function to display if a user is typing.
    socket.emit('typing', `${currentUser} is typing` ) // need to change from local storage, only use for development.
  }

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
    <div className="p-4 bg-gray-200 flex items-end overscroll-contain overflow-auto">
      <ion-icon
        icon="attach-sharp"
        class="text-3xl cursor-pointer mr-4"
      ></ion-icon>
      <div className="message-typing-stauts">
        <p>{typingStatus}</p>
      </div>
      <textarea
        type="text"
        ref={textareaRef}
        placeholder="Write message here!"
        value={message} // Value of the message.
        onChange={(event) => setMessage(event.target.value)} // Use the input value as the message to send.
        className="flex-grow p-2 border rounded-lg resize-none overflow-auto"
        onKeyDown={handleTyping} // Reports when a user has pressed a key.
        style={{ maxHeight: "200px" }} // Limit the growth
      ></textarea>
      <button onClick={handleSendMessage} className="p-2 ml-4">
        <ion-icon name="send-sharp" class="text-2xl"></ion-icon>
      </button>
    </div>
  );
};

export default MessageInput;

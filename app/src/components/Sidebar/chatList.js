import React from "react";

function ChatList({ chats }) {
  const handleChatClick = (chat) => {
    //Add logic to navigate to detailed view
    localStorage.setItem("selectedChat", JSON.stringify(chat));
    window.dispatchEvent(new Event("chatSelected"));

    //TEST
    console.log(`Navigating to chat with ${chat.user.name}`);
  };

  // Formatting the timestamp
  // May need work in the future
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="chat-list">
      {chats.map((chat, index) => (
        <button
          key={index}
          className="chat-summary w-full text-left p-4 border-b border-gray-200 flex items-center hover:bg-lime-200"
          onClick={() => handleChatClick(chat)}
        >
          {chat.user.avatar ? (
            <img
              src={chat.user.avatar}
              alt={`Avatar of ${chat.name}`}
              className="inline-block w-12 h-12 rounded-full mr-4"
            />
          ) : (
            <span className="inline-inline-block w-12 h-12 rounded-full mr-4 bg-gray-300 flex items-center justify-center w-12 h-12 rounded-full mr-4">
              <ion-icon name="people-outline" class="text-3xl"></ion-icon>
            </span>
          )}
          <div className="chat-info flex-grow">
            <p className="chat-name font-medium">{chat.user.name}</p>
            <p className="chat-last-message text-gray-700 text-sm">
              {chat.lastMessage.sender + ": "} {chat.lastMessage.message}
            </p>
          </div>
          <div className="chat-time mr-auto">
            <p className="text-gray-500 text-sm">
              {formatTimestamp(chat.lastMessage.timestamp)}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ChatList;

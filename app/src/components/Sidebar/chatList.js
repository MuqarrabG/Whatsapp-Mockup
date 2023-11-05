import React from "react";

function ChatList({ chats, user }) {
  const handleChatClick = (chat) => {
    // Dispatched an event to so the message panel component can update it self to the selected chat
    const event = new CustomEvent("chatSelected", {
      detail: chat.groupId,
    });
    window.dispatchEvent(event);
    //TEST
    // console.log(`Navigating to chat with ${chat.groupId}`);
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
    <div className="chat-list overflow-auto">
      {chats.map((chat, index) => (
        <button
          key={index}
          className="chat-summary w-full text-left p-4 border-b border-gray-200 flex items-center hover:bg-lime-200"
          onClick={() => handleChatClick(chat)}
        >
          {chat.isGroup ? (
            // This is a group chat
            <React.Fragment>
              <span className="inline-block w-12 h-12 rounded-full mr-4 bg-gray-300 flex items-center justify-center w-12 h-12 rounded-full mr-4">
                <ion-icon name="people-outline" class="text-3xl"></ion-icon>
              </span>
              <div className="chat-info flex-grow">
                <p className="chat-name font-medium">{chat.name}</p>
                {chat.lastMessage ? (
                  <p className="chat-last-message text-gray-700 text-sm">
                    {chat.lastMessage.author + ": "} {chat.lastMessage.content}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">No messages yet</p>
                )}
              </div>
            </React.Fragment>
          ) : (
            // This is a direct message
            <React.Fragment>
              {chat.avatar ? (
                <img
                  src={chat.user.avatar}
                  alt={`Avatar of ${chat.user.name}`}
                  className="inline-block w-12 h-12 rounded-full mr-4"
                />
              ) : (
                <span className="inline-block w-12 h-12 rounded-full mr-4 bg-gray-300 flex items-center justify-center w-12 h-12 rounded-full mr-4">
                  <ion-icon name="person-outline" class="text-3xl"></ion-icon>
                </span>
              )}
              <div className="chat-info flex-grow">
                <p className="chat-name font-medium">
                  {chat.members.find((member) => member.id !== user.userId)
                    ?.nickname || "Unknown User"}
                </p>
                {chat.lastMessage ? (
                  <p className="chat-last-message text-gray-700 text-sm">
                    {chat.lastMessage.author + ": "} {chat.lastMessage.content}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">No messages yet</p>
                )}
              </div>
            </React.Fragment>
          )}
          {chat.lastMessage && (
            <div className="chat-time mr-auto">
              <p className="text-gray-500 text-sm">
                {formatTimestamp(chat.lastMessage.createdAt)}
              </p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

export default ChatList;

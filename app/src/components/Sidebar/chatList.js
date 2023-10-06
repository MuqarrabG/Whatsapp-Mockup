import React from 'react';

function ChatList({ chats }) {
  return (
    <div className="chat-list p-4">
      {chats.map((chat) => (
        <div key={chat.id} className="chat-summary p-4 border-b flex items-center">
          <img 
            src={chat.user.avatar} 
            alt={`${chat.user.name} avatar`} 
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl">{chat.user.name}</h2>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;

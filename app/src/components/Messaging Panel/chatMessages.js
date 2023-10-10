import React from 'react';

function ChatMessages({ messages, currentUser }) {
  return (
    <div className="p-4 overflow-y-auto h-[86.5vh] bg-red-500">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 max-w-md mx-auto ${
            message.sender === currentUser ? 'text-right' : 'text-left'
          }`}
        >
          <span className="inline-block bg-gray-200 rounded-lg px-4 py-2 text-sm">
            {message.text}
            <span className="font-normal text-xs text-gray-500">
              {` ${new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;

import React, { useState } from "react";

function ChatMessages({ messages, currentUser }) {
  return (
    <div class="flex-1 overflow-auto bg-[#DAD3CC]">
      <div className="py-2 px-3">
        {messages.map((message, index) =>
          message.sender === currentUser ? (
            <div key={index} class="flex justify-end mb-2">
              <div class="rounded py-2 px-3 bg-[#E2F7CB]">
                <p class="text-sm mt-1">{message.text}</p>
                <p class="text-right text-xs text-grey-dark mt-1">{` ${new Date(
                  message.timestamp
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}</p>
              </div>
            </div>
          ) : (
            <div key={index} class="flex mb-2">
              <div class="rounded py-2 px-3 bg-[#F2F2F2]">
                <p class="text-sm text-teal">{message.sender}</p>
                <p class="text-sm mt-1">
                  {message.text}
                </p>
                <p class="text-right text-xs text-grey-dark mt-1">{` ${new Date(
                  message.timestamp
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ChatMessages;

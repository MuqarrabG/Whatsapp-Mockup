/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from 'prop-types'

function ChatMessages({ messages, currentUser }) {
  return (
    <div className="flex-1 overflow-auto bg-[#DAD3CC]">
      <div className="py-2 px-3">
        {messages.map((message, index) =>
          message.sender === currentUser ? (
            <div key={index} className="flex justify-end mb-2">
              <div className="rounded py-2 px-3 bg-[#E2F7CB]">
                <p className="text-sm mt-1">{message.text}</p>
                <p className="text-right text-xs text-grey-dark mt-1">{` ${new Date(
                  message.timestamp
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}</p>
              </div>
            </div>
          ) : (
            <div key={index} className="flex mb-2">
              <div className="rounded py-2 px-3 bg-[#F2F2F2]">
                <p className="text-sm text-teal">{message.sender}</p>
                <p className="text-sm mt-1">
                  {message.text}
                </p>
                <p className="text-right text-xs text-grey-dark mt-1">{` ${new Date(
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

export default ChatMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      // Add any other keys with their types here if your message objects have more keys
    })
  ).isRequired,
  currentUser: PropTypes.string.isRequired,
};


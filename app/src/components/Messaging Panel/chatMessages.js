function ChatMessages({ messages, currentUser, lastMessageRef}) {
  // console.log("CHATMESASAGES", currentUser, messages)
  return (
    <div className="flex-1 overflow-auto bg-[#DAD3CC]">
      <div className="py-2 px-3">
        {messages.map((message, index) =>
          message.authorID.toString() === currentUser.userId.toString() ? (
            <div key={index} className="flex justify-end mb-2">
              <div className="rounded py-2 px-3 bg-[#E2F7CB]">
                <p className="text-sm mt-1">{message.content}</p>
                <p className="text-right text-xs text-gray-400 mt-1">{` ${new Date(
                  message.createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}</p>
              </div>
            </div>
          ) : (
            <div key={index} className="flex mb-2">
              <div className="rounded py-2 px-3 bg-[#F2F2F2]">
                <p className="text-sm text-teal">{message.author}</p>
                <p className="text-sm mt-1">
                  {message.content}
                </p>
                <p className="text-right text-xs text-gray-400 mt-1">{` ${new Date(
                  message.createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div ref={lastMessageRef}/>
    </div>
  );
}

export default ChatMessages;

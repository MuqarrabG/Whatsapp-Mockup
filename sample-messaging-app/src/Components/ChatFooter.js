import React, { useState } from 'react';

const ChatFooter = ({ socket }) => {

    const [message, setMessage] = useState('');

    const handleTyping = () => {
        socket.emit('typing', `${localStorage.getItem('userName')} is typing`);
    }

    const handleSendMessage = (event) => {
        event.preventDefault();
        if(message.trim() && localStorage.getItem('userName')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
        }
        console.log({ userName: localStorage.getItem('userName'), message });
        setMessage('');
    };

    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message here"
                    className="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="sendBtn">Send</button>
            </form>
        </div>
    );
};

export default ChatFooter;
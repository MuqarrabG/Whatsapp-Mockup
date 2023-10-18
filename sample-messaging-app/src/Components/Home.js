import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
    
    const navigate = useNavigate();
    const [userName, setUsername] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('userName', userName);
        socket.emit('newUser', { userName, socketID: socket.id });
        navigate("/chat");
    };

    return (
        <form className="home_container" onSubmit={handleSubmit}>
            <h2 className="home_header">Sign In to Open the App</h2>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                minLength={6}
                name="username"
                id="username"
                className="username_input"
                value={userName}
                onChange={(event) => setUsername(event.target.value)}
            />
            <button className="home_cta">Sign in!</button>
        </form>
    );
};

export default Home;
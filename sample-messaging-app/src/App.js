import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home.js';
import ChatPage from './Components/ChatPage.js';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');
function App() {
  return(
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket}/>}/>
          <Route path="/chat" element={<ChatPage socket={socket}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import socketIO from 'socket.io-client'
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/homePage"
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import SettingPage from "./components/settingPage"
import './index.css';
import { useState } from "react";

// import { useEffect } from "react";
// import axios from "axios";

const socket = socketIO.connect('http://localhost:4000') // connects to socket server.


function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/> 
        <Route path="/setting" element={<SettingPage />}/> 
        <Route path="/WhatsApp" element={<pages />}/> 
        <Route path="/home" element={<HomePage socket={socket}/>}/>
      </Routes>
    </Router>
  );
}

export default App



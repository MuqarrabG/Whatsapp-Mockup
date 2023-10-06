import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import socketIO from 'socket.io-client';
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import HomePage from "./components/homePage";
import './index.css';
import './App.css';

const socket = socketIO.connect('http://localhost:4000')
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/> 
        <Route path="/home" element={<HomePage />}/>
      </Routes>
    </Router>
  );
}

export default App;

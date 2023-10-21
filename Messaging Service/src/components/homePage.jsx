/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
//import SignupPage from "./signupPage.jsx";
import * as randomService from "../services/randomService";
import MessagingPanel from "./Messaging Panel/messagingPanel";
import SideBar from "./Sidebar/sideBar";

function HomePage({ socket }) {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    randomService.getRandomUsers(10).then((response) => {
      console.log(response);
      setUsers(response);
    }).catch((error) => {
      console.error("Failed to fetch users:", error);
    });
  }, []);

  return (
    <div className="flex w-full h-screen overflow-y-hidden">
      <SideBar />
      <MessagingPanel messages={messages} socket={socket}/>
    </div>
  );
}

export default HomePage;

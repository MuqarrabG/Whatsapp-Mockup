import React, { useEffect, useState } from "react";
import SignupPage from "./signupPage.js";
import * as randomService from "./../services/randomService.js";
import MessagingPanel from "./Messaging Panel/messagingPanel.js";
import SideBar from "./Sidebar/sideBar.js";
import { getLocalStorage } from "./setGetLocal.js";
import { useNavigate } from 'react-router-dom';
import makeToast from "./Toaster.js";

function HomePage({ socket }) {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate()

  //This prevent unlogged in user to access the app
  // useEffect(() => {
  //   const loggedUser = getLocalStorage("loggedUser");
  //   if (loggedUser) {
  //     setUser(loggedUser);
  //   } else {
  //     makeToast("error", "Please Login to Access the app");
  //     navigate('/');
  //   }
  // }, [navigate]); 

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

import React, { useEffect, useState } from "react";
import * as randomService from "./../services/randomService.js";
import MessagingPanel from "./Messaging Panel/messagingPanel.js";
import SideBar from "./Sidebar/sideBar.js";
import { getLocalStorage } from "./setGetLocal.js";
import { useNavigate } from "react-router-dom";
import makeToast from "./Toaster.js";
import AddChatModal from "./addChatModal.js";

function HomePage({socket}) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [openAddChat, setOpenAddChat] = useState(false); 
  const navigate = useNavigate();

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

  //Temporary code swap it out for the above comment code
  
  useEffect(() => {
    setUser({
      userId: 11112,
      username: "Thruster69",
    });
  }, []);

  const getChats = async () => {
    // requestHandler(
    //   async () => await getUserChats(),
    //   setLoadingChats,
    //   (res) => {
    //     const { data } = res;
    //     setChats(data || []);
    //   },
    //   alert
    // );
    console.log("Got chats")
  };

  // useEffect(() => {
  //   socket.on("messageResponse", (data) => setMessages([...messages, data]));
  // }, [socket, messages]);

  useEffect(() => {
    randomService
      .getRandomUsers(10)
      .then((response) => {
        console.log(response);
        setUsers(response);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);


  useEffect(() => {
    const handleCreateChat = () => {
      setOpenAddChat(true)
    };
    window.addEventListener("createChat", handleCreateChat);
    // Cleanup: Remove event listener on component unmount.
    return () => {
      window.removeEventListener("createChat", handleCreateChat);
    };
  }, []);

  return (
    <>
      <AddChatModal
        user={user}
        open={openAddChat}
        onClose={() => {
          setOpenAddChat(false);
        }}
        onSuccess={() => {
          getChats();
        }}
      />
  
      <div className="flex w-full h-screen overflow-y-hidden">
        <SideBar user={user} />
        <MessagingPanel messages={messages} socket={socket} />
      </div>
    </>
  );
  
}

export default HomePage;

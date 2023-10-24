import React, { useEffect, useState } from "react";
import * as randomService from "./../services/randomService.js";
import MessagingPanel from "./Messaging Panel/messagingPanel.js";
import SideBar from "./Sidebar/sideBar.js";
import { getLocalStorage } from "./setGetLocal.js";
import { useNavigate } from "react-router-dom";
import makeToast from "./Toaster.js";
import AddChatModal from "./addChatModal.js";
import { getUserChats } from "../services/api.js";

function HomePage({socket}) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  //const [messages, setMessages] = useState([]);
  const [openAddChat, setOpenAddChat] = useState(false); 
  const [chats, setChats] = useState([])
  const navigate = useNavigate();


  //This prevent unlogged in user to access the app
  useEffect(() => {
    // Check if the 'user' array is empty
    if (!user || user.length === 0) {
      const loggedUser = getLocalStorage("loggedUser");
  
      if (loggedUser) {
        setUser(loggedUser);
        //getChats()
      } else {
        makeToast("error", "Please Login to Access the app");
        navigate('/');
      }
    }
    // This console.log will now show updates every time 'user' changes
    console.log("user logged in", user)

    //getChats()
  }, [user, navigate]); // 'user' is now a dependency, so this effect runs whenever 'user' changes
  

  //Temporary code swap it out for the above comment code
  
  // useEffect(() => {
  //   setUser({
  //     userId: 11112,
  //     username: "Thruster69",
  //   });
  //   getChats()
  // }, []);

  const getChats = async () => {
    //await delay(3000);
    console.log(user.userId)
    await getUserChats(user.userId).then(res => {
      setChats(res.data);
    }).catch(error => {
      makeToast("error", "Error retrieving chats")
      console.log("Got error on user chats", error)
    })
  };

  // useEffect(() => {
  //   socket.on("messageResponse", (data) => setMessages([...messages, data]));
  // }, [socket, messages]);

  // useEffect(() => {
  //   randomService
  //     .getRandomUsers(10)
  //     .then((response) => {
  //       console.log(response);
  //       setUsers(response);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch users:", error);
  //     });
  // }, []);


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

  useEffect(() => {
    if (user.userId) {
      getChats();
    }
  }, [user]);

  useEffect(() => {
    console.log("Got chats", chats);
  }, [chats]);
  

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
        <SideBar user={user} chats={chats} />
        <MessagingPanel user={user} socket={socket} />
      </div>
    </>
  );
  
}

export default HomePage;

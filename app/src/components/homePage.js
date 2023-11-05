import React, { useEffect, useState } from "react";
import MessagingPanel from "./Messaging Panel/messagingPanel.js";
import SideBar from "./Sidebar/sideBar.js";
import { getLocalStorage } from "./setGetLocal.js";
import { useNavigate } from "react-router-dom";
import makeToast from "./Toaster.js";
import AddChatModal from "./addChatModal.js";
import { getUserChats } from "../services/api.js";

function HomePage({socket}) {
  const [user, setUser] = useState([]);
  const [openAddChat, setOpenAddChat] = useState(false); 
  const [chats, setChats] = useState([])
  const navigate = useNavigate();


  //This prevent unlogged in user to access the app
  useEffect(() => {
    // Check if the 'user' array is not empty
    if (!user || user.length === 0) {
      const loggedUser = getLocalStorage("loggedUser");
      // Check if the there is user logged in    
      if (loggedUser) {
        setUser(loggedUser);
        //getChats()
      } else {
        // if there isn't user logged in it redirects them the home page
        makeToast("error", "Please Login to Access the app");
        navigate('/');
      }
    }
    // This console.log will now show updates every time 'user' changes
    // console.log("user logged in", user)

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
  // Defines an asynchronous function named getChats.
  const getChats = async () => {
    // console.log(user.userId)
    // Awaits the resolution of getUserChats API call with the user's userId as an argument.
    await getUserChats(user.userId).then(res => {
      // If the API call is successful, sets the chats state with the response data.
      setChats(res.data);
    }).catch(error => {
      // If the API call fails, it displays an error toast notification.
      makeToast("error", "Error retrieving chats")
      // Additionally, logs the error to the console with a custom message for debugging purposes.
      // console.log("Got error on user chats", error)
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
    // gets chats that user is in
    if (user.userId) {
      getChats();
    }
    // If someone creates a new chat with user it automatically updates the chatlist
    if (socket && user.userId) {
      socket.on("new_chat_event", getChats);
      // Cleanup function
      return () => socket.off("new_chat_event", getChats);
    }
  });

  useEffect(() => {
    const handleCreateChat = () => {
      setOpenAddChat(true)
    };
    // This event is dispatched from topbar when create group chat button is clicked.
    window.addEventListener("createChat", handleCreateChat);
    // Cleanup: Remove event listener on component unmount.
    return () => {
      window.removeEventListener("createChat", handleCreateChat);
    };
  }, []);

  // Code below is commented as is used for debugging purposes

  // useEffect(() => {
  //   console.log("Got chats", chats);
  // }, [chats]);
  

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
          // if(socket) {
          //   socket.emit("new_chat");
          // }
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

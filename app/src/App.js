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

//testing on both these imports
import { getPosts } from './API/axios'
import { useEffect } from 'react' //might need to add useState back into it
import SearchBar from './components/SearchBar'
import ListPage from './components/ListPage'



const socket = socketIO.connect('http://localhost:4000') // connects to socket server.


function App() {

  //testing, nothing is changed above other than those with my comments 
  const [Posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    getPosts().then(json => {
      setPosts(json)
      return json
    }).then(json => {
      setSearchResults(json)
    })
  }, [])
  
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/> 
        <Route path="/setting" element={<SettingPage />}/> 
        <Route path="/WhatsApp" element={<pages />}/> 
        <Route path="/home" element={<HomePage socket={socket}/>}/>
        {/* <Route path="/ListPage" element={<ListPage searchResults={searchResults} />}/>
        <Route path="/SearchBar" element={ <SearchBar Posts={Posts} setSearchResults={searchResults} />}/> */}
        
        {/* //testing SearchBar
        <SearchBar Posts={Posts} setSearchResults={searchResults} /> */}
        {/* <ListPage searchResults={searchResults} /> */}
        
      </Routes>
    </Router>


  );
}

export default App



import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Person2Icon from '@mui/icons-material/Person2';
import { Divider, Input } from "@mui/material";

/* Modified section start*/
import SearchBar from "../SearchBar" 
import ListPage from "../ListPage"
import { getPosts } from '../../API/axios'

function HeaderLeft () {

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

        <div style={{flexDirection: 'row', height: '10%', width: '100%'}} className="TopRightBar">
            <Box sx={{ width: '80%', height: '100%', maxWidth: 360, bgcolor: 'background.paper', flexDirection: "row"}}>

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <Person2Icon />
              </ListItemIcon>
          </ListItem>

  <Divider></Divider> 
    <SearchBar Posts={Posts} setSearchResults={searchResults} />  
      <div style={{position:'relative', left: '380px', top: '-20px'}}>Settings</div>

  </List>
    </Box>
      </div>
    )
}

export default HeaderLeft
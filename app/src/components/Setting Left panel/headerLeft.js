import React, { useState } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DraftsIcon from '@mui/icons-material/Drafts';
import Person2Icon from '@mui/icons-material/Person2';


import {searchOutline} from "ionicons/icons"


function HeaderLeft () {
    
    const [query, setQuery] = useState("");

    const handleInputChange = (a) => {

        const newQuery = a.target.value;
        setQuery(setQuery);
    };
    
    return (

        <div style={{flexDirection: 'row', height: '10%', width: '100%'}} className="TopRightBar">
            <Box sx={{ width: '80%', height: '50%', maxWidth: 360, bgcolor: 'background.paper', flexDirection: "row"}}>
                <List>

            <ListItem disablePadding>
            {/* <ListItemButton> */}
              <ListItemIcon>
                <Person2Icon />
              </ListItemIcon>
            {/* </ListItemButton> */}
          </ListItem>
         
            </List>
           
          {/* -- search box -- */}
        <div className="w-4/4">
            <input type="text" value={query}
                onChange={handleInputChange}
                    placeholder="Search"
                      border solid
                        className="pl-10 pr-4 py-2 w-full rounded-md border-5" />
       
        <ion-icon name="search-outline" 
            class="absolute left-3 top-16 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none border-solid">    
                </ion-icon>

       
    {/* <div style={{display: 'flex', height: '100%', width: '100%', flexDirection: 'row'}}>
    <div style={{flexDirection: 'column', height: '100%', width: '100%'}} className="LowerBar">
    <Box sx={{ width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper', flexDirection: "row"}}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Change Name" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
    </div>
   
    </div> */}
   

                 </div>
             </Box>
        </div>
    )
}

export default HeaderLeft
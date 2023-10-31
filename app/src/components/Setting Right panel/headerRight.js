import React from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

function HeaderRight () {
    return (
        
      //bottom left box created for Notification, Change Name and Logout buttons
      <div style={{flexDirection: 'column', height: '100%', width: '100%'}} className="LowerSideBar">

        {/* //Main box of the entire setting SettingPage */}
        <Box sx={{ width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper', flexDirection: "column"}}>

          <nav aria-label="main mailbox folders">

          <List>

            {/* //Change Name button created */}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary="Change Name" />
              </ListItemButton>
            </ListItem>

            {/* //Notification button created */}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notification" />
              </ListItemButton>
            </ListItem>

            {/* //Logout button function to allow user to return to log in page */}
            <ListItem disablePadding onClick={() => {
                        window.location= '/'
              }}>
              <ListItemButton >
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
   
    )
}

export default HeaderRight
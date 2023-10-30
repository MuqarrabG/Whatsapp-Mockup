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
        
    <div style={{display: 'flex', height: '90%', width: '100%', flexDirection: 'row'}}>
      <div style={{flexDirection: 'column', height: '100%', width: '100%'}} className="LowerSideBar">
        <Box sx={{ width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper', flexDirection: "column"}}>
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

            <ListItem disablePadding onClick={() => {
              // console.log("test successfully");
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
    </div>
   
    )
}

export default HeaderRight
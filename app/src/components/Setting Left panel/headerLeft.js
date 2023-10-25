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
import { Input } from "@mui/material";


function HeaderLeft () {

   
    return (

        <div style={{flexDirection: 'row', height: '10%', width: '100%'}} className="TopRightBar">
            <Box sx={{ width: '80%', height: '100%', maxWidth: 360, bgcolor: 'background.paper', flexDirection: "row"}}>
                <List>

            <ListItem disablePadding>
            {/* <ListItemButton> */}
              <ListItemIcon>
                <Person2Icon />
              </ListItemIcon>
            {/* </ListItemButton> */}
          </ListItem>
         
         {/* -- search box --
   <div className="w-4/4">   
   <input
      onChange={handleChange}
          placeholder="Search"
            border solid
              className="pl-10 pr-4 py-2 w-full rounded-md border-5" /> 

<ion-icon name="search-outline" 
            class="absolute left-3 top-16 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none border-solid">    
                </ion-icon> */}

            </List>
            </Box>
{/* </div>
</div> */}
</div>
    )

}

{/* const SearchBar = () => {
    
  const [searchInput, setSearchInput] = useState("");

  const Settings = [
    {name: ChangeName},
    {name: LogOut}
  ];
  

  if (searchInput.length > 0) {
    Settings.filter((settings) => {
    return settings.name.match(searchInput);
});
}

const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
};
  
<table>
  <tr>
    <th>Name</th>
  </tr>

{settings.map((settings) => {

<div>
  <tr>
    <td>{settings.name}</td>
  </tr>
</div>

})}
</table>
return(

)

</div>
} */}

export default HeaderLeft
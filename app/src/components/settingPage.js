// src/SettingPage.js

import Divider from '@mui/material/Divider'
import HeaderLeft from "./Setting Left panel/headerLeft"
import HeaderRight from "./Setting Right panel/headerRight"

function SettingPage() {

    return(
      
      // {/* // main background feature of setting page */}
      <div className="min-w-[30%] bg-green-200 h-screen overflow-auto border-r border-black">
        
        {/* //import HeaderLeft and HeaderRight and apply divider to spilt both header apart */}
        <HeaderLeft />
          <Divider></Divider>
            <HeaderRight />

      </div>
    );
  }

export default SettingPage
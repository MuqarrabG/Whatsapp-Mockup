// src/SettingPage.js

import React, {useState, useEffect} from "react"
import Divider from '@mui/material/Divider'
import HeaderLeft from "./Setting Left panel/headerLeft"
import HeaderRight from "./Setting Right panel/headerRight"

function SettingPage() {

    return(
      <div className="min-w-[30%] bg-green-200 h-screen overflow-auto border-r border-black">
        
        <HeaderLeft />
          <Divider></Divider>
            <HeaderRight />

      </div>
    );
  }

export default SettingPage
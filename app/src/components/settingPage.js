// src/SettingPage.js

import React, {useState} from "react";
import {searchOutline} from "ionicons/icons";
import Divider from '@mui/material/Divider';

import HeaderLeft from "./Setting Left panel/headerLeft";
import HeaderRight from "./Setting Right panel/headerRight";

function settingPage() {

    return(
        <div className="min-w-[30%] bg-green-200 h-screen overflow-auto border-r border-black">
        
        <HeaderLeft />
        <Divider></Divider>
        <HeaderRight />

       

      </div>
    );
  }

export default settingPage
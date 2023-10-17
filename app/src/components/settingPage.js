// src/SettingPage.js

import React, {useState} from "react";
import {searchOutline} from "ionicons/icons";

import HeaderLeft from "./Setting Left panel/headerLeft";
import HeaderRight from "./Setting Right panel/headerRight";

function settingPage() {

    return(
        <div className="min-w-[30%] bg-blue-200 h-screen overflow-auto border-r border-black">
        <HeaderLeft />
        <HeaderRight />
      </div>
    );
    }
        

        // <div className="max-w-none w-full max-h-28 grid grid-cols-2 divide-x-1/3 flex-item-centre font-bold text-3xl bg-gray-300 shadow-md">
        //     <div>User Name</div>
        //     <div>Settings</div>

        

        // <div className="mt-2 text text-2xl items-center text-black-900"></div>
        //     <div className="mt-2 text text-2xl items-centre text-black-900"></div>    

           
                
        // {/* -- search box -- */}
        // <label class="relative block">
        //     <span class="sr-only">Search</span>
        //         <span class="absolute inset-y-0 left-0 flex items-centre pl-5">
        //             <svg class="h-5 w-5 fill-slate-300" viewbox="0 0 20 20">
        //         </svg>
        //     </span>
        // <input class="placeholder: italic placeholder:text-slate-400 block bg-white w-full border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm" placeholder="Search" type="text" name="search"/>
        
        // </label>

        // <ion-icon name="search-outline" class="absolute left-3 top-16 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></ion-icon>

        //  </div>
        

           

//      )
// }

export default settingPage
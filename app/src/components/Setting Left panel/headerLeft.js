import React, { useState } from "react";
import {searchOutline} from "ionicons/icons"

function HeaderLeft () {
    
    const [query, setQuery] = useState("");

    const handleInputChange = (a) => {

        const newQuery = a.target.value;
        setQuery(setQuery);
    };
    
    return (

        //  {/* -- search box -- */}
        <div className="relative block">
            <input type="text" value={query}
                onChange={handleInputChange}
                    placeholder="Seach"
                        className="pl-10 pr-4 py-2 w-full border rounded-md" />
       
        
        {/* <input class="placeholder: italic 
            placeholder:text-slate-400 block bg-white w-full border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm" placeholder="Search" type="text" name="search"/>
         */}
        <ion-icon name="search-outline" 
            class="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none">    
                </ion-icon>
       
        </div>
    )
}

export default HeaderLeft
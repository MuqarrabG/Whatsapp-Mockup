import React from "react";

function header () {
    return (

        //  {/* -- search box -- */}
        <label class="relative block">
            <span class="sr-only">Search</span>
                <span class="absolute inset-y-0 left-0 flex items-centre pl-3">
                    <svg class="h-5 w-5 fill-slate-300" viewbox="0 0 20 20">
                </svg>
            </span>
       
        <input class="placeholder: italic placeholder:text-slate-400 block bg-white w-full border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 sm:text-sm" placeholder="Search" type="text" name="search"/>
        
        </label>
    )
}

export default header
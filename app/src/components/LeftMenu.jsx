import React from "react";
import RoundedBtn from "./Common/RoundedBtn";
import { MdPeopleOutline } from "react-icons/md"

function leftMenu() {
    return (
        // leftMenu container
        <div className="flex flex-col border-r border-neutral-700 w-100 h-100"> 
            {/* Profile nav */}
            <div className="flex justify-between items-center bg-[#202d33] h-[60px] p-3">
                {/* Profile picture */}               
                <img src="" alt="profile_picture" />
            
            {/* Profile nav buttons */}               
            <div className="flex justify-between w-[175px]">
            <RoundedBtn icon={<MdPeopleOutline />} />
            <RoundedBtn />
           

            </div>
        </div>

            {/* Search and filter */}
            {/* Chats */}
        </div>
    )

}

export default leftMenu
import React from "react";
import leftMenu from "../components/LeftMenu";
import ChatDetail from "../components/ChatDetail";

function WhatsApp() {
    return (
        //main container
        <div className="w-screen h-screen overflow-hidden"> 
            {/* 2 components container */}
            <div className="flex justify-start whatsapp-bp:justify-centre items-center bg-[#111a21] h-screen">
            {/* leftMenu */}
            <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
                <leftMenu />
            </div>

            {/* Chat Detail */}
            <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
                <ChatDetail />
                </div>
            </div>
        </div>
    )
}

export default WhatsApp
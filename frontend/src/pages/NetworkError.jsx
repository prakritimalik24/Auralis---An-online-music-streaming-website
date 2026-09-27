import React from "react";
import Networkerr from "../assets/Networkerr.jpg";

function NetworkError() {
    return (
        <div className="fixed inset-0 z-[999] bg-black">
            <img
                src={Networkerr}
                className="w-full h-full object-cover"
            />
        </div>
    );
}

export default NetworkError;
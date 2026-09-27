import React from "react";
import Notfound from "../assets/Notfound.jpg";
import { useNavigate } from "react-router-dom";


function NotFound () {

    const navigate = useNavigate();
    return (
   <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">

    <img
    src={Notfound}
    className="object-cover "/>


            <button
                onClick={() => navigate("/")}
                className="mt-8 p-3 px-6 rounded-full bg-mauve-500 text-black font-bold cursor-pointer hover:scale-105 transition-all duration-150"
            >
                Go Home
            </button>
</div>
    )
}

export default NotFound;
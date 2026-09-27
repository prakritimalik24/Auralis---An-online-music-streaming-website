import React from "react";
import { useNavigate } from "react-router-dom";

function Nav() {

    const navigate = useNavigate();
    return (
         <div className="flex relative z-50 items-center p-4 justify-between h-20  w-full">
          <div className="cursor-pointer text-center p-2.5 px-0.5 mt-1.5">
            <h1 className="font-bold text-3xl text-transparent  bg-clip-text bg-linear-to-r to-mauve-500 via-mauve-400 from-mauve-300 ">
    Auralis
</h1>
          </div>



        
       <div className="flex gap-2">
        <div className="  text-center h-16 p-2"><button onClick={ () => 
          navigate("/register")
        }
         className="  text-center  p-3 px-6 rounded-full bg-mauve-500 text-black font-bold cursor-pointer hover:text-[17px] transition-all duration-200 ">Be a user</button></div>

                <div className="relative text-center h-16 p-2"><button 
                onClick={() => navigate("/register/artist")}
                className=" text-center  p-3 px-5 rounded-full bg-mauve-500 text-black font-bold cursor-pointer hover:text-[17px] transition-all duration-200 ">Be an Artist</button>

</div>


                <div className="relative text-center h-16 p-2"><button 
                onClick={() => navigate("/login")}
                className=" text-center  p-3 px-5 rounded-full bg-mauve-500 text-black font-bold cursor-pointer hover:text-[17px] transition-all duration-200 ">Login</button>

</div>
</div>
</div>
    )
}

export default Nav;
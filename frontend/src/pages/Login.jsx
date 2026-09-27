import React from "react";
import { Link,useNavigate } from "react-router-dom";
import{useState ,useContext} from "react";
import api from "../services/api";
import AuthContext from "../context/AuthContext";
import {Eye} from "lucide-react"




function Login(){
  
 const {setUser} = useContext(AuthContext);


            const [identifier,setidentifier] = useState(""); 
            const [password,setpassword] = useState(""); 
            const[error,seterror] = useState("");
        const [showpassword,setshowpassword] = useState(false); 

            const navigate = useNavigate();

            const handlelogin = async (e) => {
                e.preventDefault();
                seterror("");

                try {
                    const response = await api.post("/api/auth/login",{
                        identifier,
                        password,
                    });
                    setUser(response.data.user);
                    const role = response.data.user.role;

                    if(role== "user"){
                        navigate("/home/user")
                    }
                    if(role== "artist"){
                        navigate("/home/artist")
                    }
                }
                catch(err) {
    seterror(err.response?.data?.message || "Something went wrong.Please try again")
}


            
            }

              return (

        <div className="bg-gray-950  flex items-center justify-center min-h-screen">

            
<div className=" w-full pr-10 pl-10 pb-20 max-w-md gap-12 items-center justify-center flex flex-col">

<h1 className="text-4xl font-bold text-center text-white">Welcome back</h1>

<form
onSubmit={handlelogin}
className=" w-full p-2 flex flex-col gap-4" >
<div className= "w-full  flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Username/Email</label>
    <input 
    type="text"
    className="w-full border-2 border-amber-50 rounded-lg p-2 text-white text-lg"
    value={identifier}
    onChange={(e) => setidentifier(e.target.value)}/>
</div>

<div className= "w-full flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Password</label>
    <div className="w-full relative">
        <input 
        type={showpassword ? "text" : "password"}
        className="w-full border-2 border-amber-50 rounded-lg p-2 text-white text-lg"
        value={password}
        onChange={(e) => setpassword(e.target.value)}/>
        <button
        type="button"
        className="absolute right-3 top-1/4 cursor-pointer" onClick={() => setshowpassword(!showpassword)}><Eye className="text-white"/></button>
       </div>
</div>
 
 {error && 
(
<p className="text-xs font-bold text-red-600 text-center">{error}</p>
)}
 
 <button
 className="text-white text-[15px] hover:border-2 border-black p-4 cursor-pointer transition-all duration-200 mt-10 rounded-full w-full font-bold hover:text-lg hover:bg-mauve-700 bg-mauve-500">Login</button>

</form>

<Link to="/register" className=" text-gray-300 hover:text-white cursor-pointer ">Don't have an account? Register</Link>

 </div>
        </div>
    )
}

export default Login;
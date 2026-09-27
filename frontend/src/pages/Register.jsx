import React from "react";
import { useState } from "react";
import {Link ,useNavigate} from "react-router-dom";
import api from "../services/api";
import { Eye } from 'lucide-react';


function Register(){

    const [username,setusername] = useState(""); 
    const [email,setemail] = useState(""); 
    const [password,setpassword] = useState(""); 
        const [showpassword,setshowpassword] = useState(false); 
     const [confirmpass,setconfirmpass] = useState(""); 
    const [error,seterror] = useState(""); 

    const navigate = useNavigate();

 const handleregister = async (e) => {
    e.preventDefault();
    seterror("");

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    if(password !== confirmpass){
        alert("Your passsword does not match")
        return;
    }

   try
   { const response = await api.post("/api/auth/register",{
        username,
        email,
        password
    }) ;

    console.log(response.data);
    navigate("/login");
 }
catch(err) {
    seterror(err.response?.data?.message || "Something went wrong.Please try again")
}
 }



    return (
            <div className="bg-gray-950  flex items-center justify-center min-h-screen">

            
<div className=" w-full pr-10 pl-10 pb-20 max-w-md  items-center justify-center flex flex-col">


<h1 className="text-4xl font-bold text-center mb-8 text-white">Create an account</h1>

<form
onSubmit={handleregister}
className=" w-full p-2 flex flex-col gap-4" >
<div className= "w-full  flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Username</label>
    <input 
    type="text"
    className="w-full border-2 border-amber-50 rounded-lg p-2 text-white text-lg"
    value={username}
    onChange={(e) => setusername(e.target.value)}/>
</div>

<div className= "w-full  flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Email</label>
    <input 
    type="email"
    className="w-full border-2 border-amber-50 rounded-lg p-2 text-white text-lg"
    value={email}
    onChange={(e) => setemail(e.target.value)}/>
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

<div className= "w-full flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Confirm Password</label>
    <div className="w-full relative">
    <input 
    type={showpassword ? "text" : "password"}
    className="w-full border-2 border-amber-50 rounded-lg p-2 text-white text-lg"
    value={confirmpass}
    onChange={(e) => setconfirmpass(e.target.value)}/>
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
 className="text-white text-[15px] hover:border-2 border-black p-4 cursor-pointer transition-all duration-200 mt-8 rounded-full w-full font-bold hover:text-lg hover:bg-mauve-700 bg-mauve-500">Register</button>

</form>

<Link to="/login" className="text-gray-300 cursor-pointer hover:text-white">Already have an account? Login</Link>

 </div>
        </div>
   
    )
}

export default Register;
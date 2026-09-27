import React from "react";
import { Link,useNavigate } from "react-router-dom";
import{useState ,useContext} from "react";
import api from "../services/api";
import AuthContext from "../context/AuthContext";




function SongForm({onsongsubmit , onClose}){
  
 const {user} = useContext(AuthContext);


            const [title,settitle] = useState(""); 
            const [music,setmusic] = useState(null); 
            const[coverimage,setcoverimage] = useState(null);
            const[error,seterror] = useState("");

            const navigate = useNavigate();

            const handlesubmit = async (e) => {
                e.preventDefault();
                seterror("");
    if(!title || !music || !coverimage){
        seterror("Please fill all the details");
        return;
    }

onsongsubmit({
    title:title,
    music:music,
    cover:coverimage
})
            
            }

              return (

        <div className="bg-gray-950 flex-col flex items-center z-50 inset-0 fixed ">

 <button
                onClick={onClose}
                className="mb-6 text-white hover:font-semibold text-center mt-10 cursor-pointer rounded-full bg-mauve-500 p-4 hover:text-[17px] hover:scale-102 transition-all duration-150"
            >
                ← Back
            </button>
            
<div className=" w-full pr-10 pl-10 pb-20 max-w-md gap-12 items-center justify-center flex flex-col">

<h1 className="text-4xl font-bold text-center text-white">Upload your song</h1>

<form
onSubmit={handlesubmit}
className=" w-full p-2 flex flex-col gap-4" >
<div className= "w-full  flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Song Title</label>
    <input 
    type="text"
    className="w-full border-2 border-amber-50 rounded-lg p-2 text-white text-lg"
    value={title}
    onChange={(e) => settitle(e.target.value)}/>
</div>

<div className= "w-full flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Add song</label>
    <div className="w-full relative">
        <input 
        type="file"
        accept="audio/*"
        className="w-full border-2 border-amber-50 rounded-lg p-3.5 text-white text-xs"
        onChange={(e) => setmusic(e.target.files[0])}/>

   </div>
</div>

<div className= "w-full flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Add Cover</label>
    <div className="w-full relative">
        <input 
        type="file"
        accept="image/*"
        className="w-full border-2 border-amber-50 rounded-lg p-3.5 text-white text-xs"
        onChange={(e) => setcoverimage(e.target.files[0])}/>

   </div>
</div>
 
 {error && 
(
<p className="text-xs font-bold text-red-600 text-center">{error}</p>
)}
 
 <button
 
 className="text-white text-[15px] hover:border-2 border-black p-4 cursor-pointer transition-all duration-200 mt-10 rounded-full w-full font-bold hover:text-lg hover:bg-mauve-700 bg-mauve-500">Add Song</button>

</form>


 </div>
        </div>
    )
}

export default SongForm;
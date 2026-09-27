import React  , {useState , useContext ,useNavigate} from "react";
import ArtistNavbar from "./ArtistNavbar";
import api from "../services/api";
import SongForm from "./SongForm";
import AuthContext from "../context/AuthContext";
import Albumploadsuccess from "./Albumuploadsuccess";

function Uploadalbum() {
 const {setUser} = useContext(AuthContext);


            const [title,settitle] = useState(""); 
            const [songs,setsongs] = useState([]); 
            const[albumcover,setalbumcover] = useState(null);
            const[showsongform,setshowsongform] = useState(false);
            const[loading,setloading] = useState(false);
            const[error,seterror] = useState("");
            const[showsuccess,setshowsuccess] = useState(false);


            const handlesongsubmit = (song) => {
                setsongs([
                    ...songs,
                    song
                  
                ]);

                setshowsongform(false);
            }

            const handlealbumsubmit = async (e) => {
                e.preventDefault();
                seterror("");

            

        const formdata = new FormData();

                formdata.append("title" , title);
                formdata.append("albumcover" , albumcover);

                const musictitles = [];

                songs.forEach((song) => {
                    musictitles.push(song.title);

                    formdata.append("musicfiles",song.music);
                                        formdata.append("musiccovers",song.cover);

                });

                                    formdata.append("musictitles",JSON.stringify(musictitles));


                try {

                    for (let [key, value] of formdata.entries()) {
    console.log(key, value);
}
                    const response = await api.post("/api/music/album",
                        formdata);
                        
            
                    console.log(response.data);

                    settitle("");
                    setalbumcover(null);
                    setsongs([]);
                    setshowsuccess(true);

                  
                }
                catch(err) {
    seterror(err.response?.data?.message || "Something went wrong.Please try again")
}

            
            }

              return (

        <div className="bg-black  flex pb-30 flex-col items-center justify-center min-h-screen">
           <ArtistNavbar/>
 
<div className=" w-full pr-10 pl-10 pb-20 max-w-md gap-12 items-center justify-center flex flex-col">

<h1 className="text-4xl mt-5 font-bold text-center text-white">Upload Album</h1>

<form
onSubmit={handlealbumsubmit}
className=" w-full p-2 flex flex-col gap-4" >
<div className= "w-full  flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Album Title</label>
    <input 
    type="text"
    className="w-full border-2 border-amber-50 rounded-lg p-2 text-white text-lg"
    value={title}
    onChange={(e) => settitle(e.target.value)}/>
</div>

<div className= "w-full flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Add Cover</label>
    <div className="w-full relative">
        <input 
        type="file"
        accept="image/*"
        className="w-full border-2 border-amber-50 rounded-lg p-3.5 text-white text-xs"
        onChange={(e) => setalbumcover(e.target.files[0])}/>

   </div>
</div>

{songs.length > 0 && (
<div className= "w-full flex flex-col gap-3 p-1">
    <label className="text-white text-xs font-bold">Songs</label>

    {songs.map((song,index) => 
    <div className="w-full border-2 border-amber-50 rounded-lg p-3.5 bg-amber-50 text-gray-950  font-semibold text-[14px]">
       <span>{song.title}</span>

   </div>
    )}
</div>
              )}

                
 


              {songs.length< 10 && (

 
 <button
 onClick={() => setshowsongform(true)}
 type = "button"
 
 className="text-white text-[15px] hover:border-2 border-black p-4 cursor-pointer transition-all duration-200 mt-10 rounded-full w-full font-bold hover:text-lg hover:bg-mauve-700 bg-mauve-500">Add Song</button>

              )}

               {error && 
(
<p className="text-xs font-bold text-red-600 text-center">{error}</p>
)}

<button
type="submit"
 className="text-white text-[15px] hover:border-2 border-black p-4 cursor-pointer transition-all duration-200 mt-10 rounded-full w-full font-bold hover:text-lg hover:bg-mauve-700 bg-mauve-500">Upload Album</button>

</form>


 </div>

 {showsongform && (
    <SongForm 
    onsongsubmit = {handlesongsubmit}
    onClose = {()=> setshowsongform(false)}/>
 )}

 {showsuccess && 
 <Albumploadsuccess
 onClose={() => setshowsuccess(false)}/>}
        </div>

  
    )
}

export default Uploadalbum;
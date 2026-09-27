import React, { useState , useEffect} from "react";
import Navbar from "./Navbar";
import Playlistform from "./Playlistform";
import api from "../services/api";
import Playlistcard from "./Playlistcard";
import Playlistdetails from "./Playlistdetails";

function Playlistpage() {
    const[showplaylistform ,setshowplaylistform] = useState(false);
    const[playlists,setplaylists] = useState([]);
    const[selectedplaylist, setselectedplaylist] = useState(null);


    const getplaylists = async () => {
            try{
                const response = await api.get("/api/playlists/my");

                setplaylists(response.data.playlists);
            } catch(err) {
                console.log(err);
            }
        };
  
    useEffect(() => {
        
        getplaylists();
    } ,[])




    return (
 <div className="bg-black pb-30 flex flex-col h-screen">
    <Navbar/>
    <div className="w-full flex flex-wrap gap-10 px-10 py-10">
        {playlists.map((playlist) => (
            <Playlistcard 
            key = {playlist._id}
            playlist = {playlist}
            onClick={() => setselectedplaylist(playlist._id)}/>
        ))}
        </div>
        <div className="w-full flex justify-center mt-10">
        <button
 onClick={() => setshowplaylistform(true)}
 className="text-white text-[15px] hover:border-2 border-black p-4 cursor-pointer w-1/3 bottom-0 transition-all duration-200 rounded-full font-bold hover:text-lg hover:bg-mauve-700 bg-mauve-500">Create new Playlist</button>
</div>
    


    {showplaylistform &&
    <Playlistform
    onPlaylistcreated ={getplaylists}
    onClose={() => setshowplaylistform(false)}/>
}

{selectedplaylist && (
    <Playlistdetails
        playlistId={selectedplaylist}
        onClose={() => setselectedplaylist(null)}
    />
)}

 </div>
    )
}
export default Playlistpage;
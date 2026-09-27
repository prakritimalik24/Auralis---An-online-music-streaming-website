import React from "react";
import api from "../services/api";
import {useState , useEffect} from "react";
import MusicCard from "./MusicCard";
import MusicPlayer from "../components/MusicPlayer";
import { useContext } from "react";
import MusicContext from "../context/MusicContext";
import {Play , Pause} from "lucide-react";

function Playlistdetails({onClose , playlistId}) {

    const {setcurrentTrack , isplaying , currentTrack , setisplaying , setTracks} = useContext(MusicContext);
    const[playlistdetails , setplaylistdetails] = useState(null);

   const [isplaylistplaying, setisplaylistplaying] = useState(false);

    useEffect(() => {

        if (!playlistId) {
            return;
        }

        const getplaylistdetails = async () => {

            try { 
                const response = await api.get(`/api/playlists/${playlistId}`);


                setplaylistdetails(response.data.playlist);

            } catch(err) {
                console.log(err)
            }
        }

        getplaylistdetails();
    },[playlistId]);

 


       if (!playlistId) {
        return null;
    }

    if (!playlistdetails) {
    return null;
}

const handleplaylistplay = () => {

    if (isplaylistplaying) {
        setisplaylistplaying(false);
        setisplaying(false);
        return;
    }

    const tracks = playlistdetails.musics.map(
        item => item.music
    );

    setTracks(tracks);
    setcurrentTrack(tracks[0]);
    setisplaying(true);
    setisplaylistplaying(true);
};

    return(
        <div className="bg-neutral-950  text-white fixed inset-0 overflow-y-auto pb-30 z-50 min-h-screen p-8">

            <button
                onClick={onClose}
                className="mb-6 text-white hover:font-semibold text-center cursor-pointer rounded-full bg-mauve-500 p-3 hover:text-[17px] hover:p-3.5 transition-all duration-150"
            >
                ← Back
            </button>


           <div className="flex flex-col gap-10 p-4 w-full ">

<div className="flex justify-between gap-20 w-full p-3">

<div className="flex flex-col gap-8 w-[70%]">
    <div className="font-bold text-4xl overflow-x-auto w-full hide-scrollbar">{playlistdetails.name}</div>
    
                    <button
                    onClick={handleplaylistplay}
                     className="text-white mt-1 hover:h-15 hover:w-15 hover:p-4.5 transition-all duration-200 bg-mauve-500 h-12 w-12 rounded-full p-3 text-center cursor-pointer border-none outline-0 ">{isplaylistplaying ? < Pause/> : <Play/>}</button>
    
</div>
</div>

          <h2 className = "text-white font-bold p-3 text-xl">Songs</h2> 

<div className="flex flex-wrap gap-5">

    {playlistdetails?.musics?.length > 0 ? 
          
          ( playlistdetails.musics.map((song , index) => (
 
        
            <MusicCard
            key={song.music?._id || song.music?.id || index}
    track={song.music}
    title={
        song.source === "local"
            ? song.music?.title
            : song.music?.name
    }
    artist={
        song.source === "local"
            ? song.music?.artist?.username
            : song.music?.artist_name
    }
    image={
        song.source === "local"
            ? song.music?.coverimage
            : song.music?.album_image
    }
/>
          ))
    ) : (<h2 className="text-gray-300 text-center text-2xl font-bold">No songs available for this album</h2>) }
</div>
           </div>
        </div>
    )
}

export default Playlistdetails;
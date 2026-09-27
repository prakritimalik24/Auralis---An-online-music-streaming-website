import React from "react";
import api from "../services/api";
import {useState , useEffect} from "react";
import MusicCard from "./MusicCard";
import MusicPlayer from "../components/MusicPlayer";
import { useContext } from "react";
import MusicContext from "../context/MusicContext";
import {Play , Pause} from "lucide-react";

function AlbumDetails({onClose , album}) {

    const {setcurrentTrack , isplaying , currentTrack , setisplaying , setTracks} = useContext(MusicContext);

    const [albumdetails , setalbumdetails] = useState(null);

   

    useEffect(() => {

        if (!album) {
            return;
        }

        const getalbumdetails = async () => {

            try { 
                const response = await api.get(`/api/music/jamendo/${album.id}`);


                setalbumdetails(response.data.album);

            } catch(err) {
                console.log(err)
            }
        }

        getalbumdetails();
    },[album]);

 


       if (!album) {
        return null;
    }

    if (!albumdetails) {
    return null;
}

const isalbumplaying =
    isplaying &&
    albumdetails?.tracks?.some(
        track => track.id === currentTrack?.id
    );

 const handlealbumplay =() => {

        if (isalbumplaying) {
        setisplaying(false);
    } else {

        setTracks(albumdetails.tracks);
        setcurrentTrack(albumdetails.tracks[0]);
        setisplaying(true);
    }
}

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
<img 
src={albumdetails.image}
className="object-cover h-65 w-65 rounded-lg"/>
<div className="flex flex-col gap-8 w-[70%]">
    <div className="font-bold text-4xl overflow-x-auto w-full hide-scrollbar">{albumdetails.name}</div>
    <div className="font-semibold text-lg text-gray-300 overflow-x-auto w-full hide-scrollbar">{albumdetails.artist_name}</div>
    
                    <button
                    onClick={handlealbumplay}
                     className="text-white mt-1 hover:h-15 hover:w-15 hover:p-4.5 transition-all duration-200 bg-mauve-500 h-12 w-12 rounded-full p-3 text-center cursor-pointer border-none outline-0 ">{isalbumplaying ? < Pause/> : <Play/>}</button>
    
</div>
</div>
          <h2 className = "text-white font-bold p-3 text-xl">Songs</h2> 

<div className="p-3 flex flex-wrap gap-10 grid grid-cols-5" >

    {albumdetails?.tracks?.length > 0 ? 
          
          ( albumdetails.tracks.map((track) => (
            <MusicCard
            key={track.id}
            track ={track}
            title = {track.name}
            artist = {track.artist_name}
            image = {track.image}
            />
        ))
    ) : (<h2 className="text-gray-300 text-center text-2xl font-bold">No songs available for this album</h2>) }
</div>
           </div>
<MusicPlayer/>
        </div>
    )
}

export default AlbumDetails;
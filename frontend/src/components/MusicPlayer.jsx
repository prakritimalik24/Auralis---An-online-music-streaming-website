import React, { useState } from "react";
import { CircleChevronLeft } from 'lucide-react';
import { CircleChevronRight } from 'lucide-react';
import { Play ,Pause} from 'lucide-react';
import { Volume2 , VolumeX } from 'lucide-react';
import { Heart } from 'lucide-react';
import { useContext } from "react";
import MusicContext from "../context/MusicContext";
import { useRef } from "react";
import { useEffect } from "react";
import api from "../services/api";
import FavContext from "../context/FavContext";


function MusicPlayer() {
    const { currentTrack , setcurrentTrack ,isplaying , setisplaying , tracks} = useContext(MusicContext);
    const { favorites,  setfavorites } = useContext(FavContext);

    const currentindex = tracks.findIndex(
    (track) => String(track.id || track._id) === String( currentTrack?.id || currentTrack?._id)
);

    const[currentTime , setcurrentTime] = useState(0);
    const[duration , setduration] = useState(0);
    const[ismuted ,setismuted] = useState(false);
    const audioref = useRef(null);


   useEffect(() => {

        if (!currentTrack || !audioref.current) return;

        if (isplaying) {
            audioref.current.play()
                .catch((err) => console.log(err));
        } else {
            audioref.current.pause();
        }

    }, [isplaying, currentTrack]);

    useEffect(() => {
if(!currentTrack) {
    return;
}



const addrecentlyplayed = async () => {
    if(!currentTrack){
        return;
    }
    try { 

        if(currentTrack._id){
            await api.post("/api/recentlyplayed/" ,{
                source:"local",
                music: currentTrack._id
            })
        }

         else if(currentTrack.id){
            await api.post("/api/recentlyplayed/",{
                source:"jamendo",
                jamendoid: currentTrack.id
            })
        }
    } catch(err) {
        console.log(err);
    }
};

addrecentlyplayed();
    },[currentTrack])

   



    const handleplaypause = () => {
        setisplaying(!isplaying);
    };


    const formatTime = (time) => {
        const min = Math.floor(time/60);
        const sec = Math.floor(time%60);
        return `${min}:${sec.toString().padStart(2,"0")}`;
    }

    const handletimeupdate = () => {
        setcurrentTime(audioref.current.currentTime);
    }

    const handleduration = () => {
        setduration(audioref.current.duration);
    }

    const handleseek = (e) => {
      audioref.current.currentTime = e.target.value;
    }

    const handlenext =() => {
        const currentindex = tracks.findIndex(
    (track) =>
        String(track.id || track._id) ===
        String(currentTrack?.id || currentTrack?._id)
);
      
        const nextTrack = tracks[currentindex + 1];

        if(nextTrack) {
            setcurrentTrack(nextTrack);
            setisplaying(true);
        }
    }


      const handleprev =() => {
       
        const currentindex = tracks.findIndex(
    (track) =>
        String(track.id || track._id) ===
        String(currentTrack?.id || currentTrack?._id)
);
        const prevTrack = tracks[currentindex - 1];

        if(prevTrack) {
            setcurrentTrack(prevTrack);
            setisplaying(true);
        }
    }

    const handlemute = () => {
        setismuted(!ismuted);
        audioref.current.muted = !ismuted;
    }
    

  const isfavorite = favorites.some((fav) => {

    if (fav.source === "local") {
        return String(fav.music?._id) === String(currentTrack?._id);
    }

    if (fav.source === "jamendo") {
        return String(fav.music?.id) === String(currentTrack?.id);
    }

    return false;
});

const handlefav = async () => {
    try {
         const existingfav = favorites.find((fav) => {

            if (fav.source === "local") {
                return String(fav.music?._id) === String(currentTrack?._id);
            }

            if (fav.source === "jamendo") {
                return String(fav.music?.id) === String(currentTrack?.id);
            }

            return false;
        });

        if (existingfav) {
            await api.delete(`/api/fav/${existingfav.favid}`);

            setfavorites(
                favorites.filter(
                    (fav) => fav.favid !== existingfav.favid
                )
            );
            return;

        } 
 if (currentTrack?._id) {

            const response = await api.post("/api/fav/add", {
                source: "local",
                music: currentTrack._id
            });

            setfavorites([
                ...favorites,
                {
                    favid: response.data.fav._id,
                    source: "local",
                    music: currentTrack
                }
            ]);

            return;
        }

        if(currentTrack?.id) {
            const response = await api.post("/api/fav/add", {
                source: "jamendo",
                jamendoid: currentTrack.id,
                jamendomusic: currentTrack
            });
            console.log("song added")

              setfavorites([
                ...favorites,
                {
                    favid: response.data.fav._id,
                    source: "jamendo",
                    music: currentTrack
                }
            ]);

        }
    } catch (err) {
        console.log(err);
    }
};

const audiourl = currentTrack?.audio || currentTrack?.uri;
const tracktitle = currentTrack?.name || currentTrack?.title;
const trackimage = currentTrack?.album_image || currentTrack?.coverimage;
const trackartist = currentTrack?.artist_name || "";



return (
<>
    <audio
    ref={audioref}
    src={audiourl}
    onTimeUpdate={handletimeupdate}
    onLoadedMetadata={handleduration}
    onEnded={handlenext}
      onError={() => alert("This content is no longer available")}
   >
</audio>

    <div className=" text-white z-50 fixed flex p-2 gap-20 justify-around items-center bottom-0 left-0 right-0 w-full h-25 bg-neutral-800">
<div className="flex items-center gap-4 p-4 w-1/4 min-w-0">
 <img
 src={trackimage}
 className="h-15 w-15 object-cover"/>
 <div className="flex flex-col gap-2">
    <div className="text-white font-bold truncate">{tracktitle}</div>
    <div className="text-white font-normal text-xs truncate">{trackartist}</div>
 </div>
</div>

<div className="flex items-center flex-col p-4 gap-5 w-1/2">
    <div className="flex items-center gap-10 justify-center">
        <button
        onClick={handleprev}
        disabled = {currentindex <= 0}
         className=" disabled:opacity-40 disabled:cursor-not-allowed h-10 w-10 rounded-full bg-mauve-600 p-2 text-white cursor-pointer border-none outline-none hover:h-11 hover:w-11 hover:p-2.5"><CircleChevronLeft/></button>
        <button 
        onClick={handleplaypause}
        className="h-10 w-10 rounded-full bg-mauve-600 p-2 text-white cursor-pointer border-none outline-none hover:h-11 hover:w-11 hover:p-2.5">{isplaying ? <Pause/> : <Play/>}</button>
        <button 
        onClick={handlenext}
        disabled={currentindex === tracks.length -1}
        className=" disabled:opacity-40 disabled:cursor-not-allowed h-10 w-10 rounded-full bg-mauve-600 p-2 text-white cursor-pointer border-none outline-none hover:h-11 hover:w-11 hover:p-2.5"><CircleChevronRight/></button>
    </div>  
       
       <div className="flex items-center gap-4 w-full">
         <div className="text-white text-xs">{formatTime(currentTime)}</div>
         <input
         type="range"
         min="0"
         max={duration || 0}
         value={currentTime}
         onChange={handleseek}
         className="flex-1 cursor-pointer h-1 music-slider"
         style={{
    background: `linear-gradient(to right, #ffffff ${(currentTime / duration) * 100}%, #525252 ${(currentTime / duration) * 100}%)`
}}
         />

         <div className="text-white text-xs">{formatTime(duration)}</div> 
</div>

</div>

<div className="w-1/4 mb-4 p-4 flex justify-center items-center gap-10">

<button 
onClick={handlefav}
className="h-12 w-12 cursor-pointer left-10 rounded-full text-white p-2 "><Heart fill={isfavorite ? "currentColor" : "none"}/></button>

<button 
onClick={handlemute}
className="h-12 w-12 left-10 rounded-full cursor-pointer text-white p-2"> {ismuted ? <VolumeX/> : <Volume2/>}</button>


</div>



    </div>
    </>
)
}
export default MusicPlayer;
import React from "react";
import { Play , Pause} from 'lucide-react';
import { useContext  ,useEffect , useRef} from "react";
import MusicContext from "../context/MusicContext";

function Musiccardartist({title ,artist ,image ,track}) { 

    if (!track) {
    return null;
}

  const {currentTrack, setcurrentTrack, isplaying, setisplaying , setTracks} = useContext(MusicContext);

  
const handleplaypause = () => {

        if (String(currentTrack?.id || currentTrack?._id) ===
    String(track.id || track._id)) {
            setisplaying(!isplaying);
        } else {
            console.log("LOCAL TRACK:", track);
            setcurrentTrack(track);
            setisplaying(true);
        }

    };


  
      

return (
<>
  


    <div className=" shrink-0 hover:bg-neutral-900 h-75 w-50 rounded-lg p-3 flex flex-col gap-2 hover:h-74 transition-all duration-200"> 
      <img 
      src={track.coverimage}
      className="w-44 h-40 rounded-lg object-cover"/>
      <div className="flex justify-between">
      <div className="flex flex-col gap-1 ml-1 overflow-hidden">
        <div className="text-white font-bold cursor-pointer text-[15px] transition-all duration-200 truncate">{track.title}</div>

        </div> 

                <button
                onClick={handleplaypause}
                 className="text-white mt-1 hover:h-15 hover:w-15 hover:p-4.5 transition-all duration-200 bg-mauve-500 h-12 w-12 rounded-full p-3 text-center cursor-pointer border-none outline-0 ">{String(currentTrack?.id || currentTrack?._id) ===
 String(track.id || track._id) && isplaying ? < Pause/> : <Play/>}</button>

        </div> 
    </div>

    </>
)
}

export default Musiccardartist;
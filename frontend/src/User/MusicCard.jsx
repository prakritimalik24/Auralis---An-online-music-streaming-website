import React from "react";
import { Play , Pause} from 'lucide-react';
import { useContext} from "react";
import MusicContext from "../context/MusicContext";

function MusicCard({title ,artist ,image ,track}) { 

    if (!track) {
    return null;
}

  const {currentTrack, setcurrentTrack, isplaying, setisplaying } = useContext(MusicContext);

  
  const handleplaypause = () => {

    const isSameTrack =
        (track?._id && currentTrack?._id === track?._id) ||
        (track?.id && currentTrack?.id === track?.id);

    if (isSameTrack) {
        setisplaying(!isplaying);
    } else {
        setcurrentTrack(track);
        setisplaying(true);
    }
};

const isSameTrack =
    (track?._id && currentTrack?._id === track?._id) ||
    (track?.id && currentTrack?.id === track?.id);

  
      

return (
<>
  


    <div className=" shrink-0 hover:bg-neutral-900 h-75 w-50 rounded-lg p-3 flex flex-col gap-2 hover:h-74 transition-all duration-200"> 
      <img 
      src={image}
      className="w-44 h-40 rounded-lg object-cover"/>
      <div className="flex justify-between">
      <div className="flex flex-col gap-1 ml-1 overflow-hidden">
        <div className="text-white font-bold cursor-pointer text-[15px] transition-all duration-200 truncate">{title}</div>
              <div className="text-gray-300 font-semibold text-xs cursor-pointer transition-all duration-200 truncate">{artist}</div>

        </div> 

                <button
                onClick={handleplaypause}
                 className="text-white mt-1 hover:h-15 hover:w-15 hover:p-4.5 transition-all duration-200 bg-mauve-500 h-12 w-12 rounded-full p-3 text-center cursor-pointer border-none outline-0 ">{isSameTrack && isplaying ? < Pause/> : <Play/>}</button>

        </div> 
    </div>

    </>
)
}

export default MusicCard;
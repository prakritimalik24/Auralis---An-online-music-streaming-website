import React from "react";
import { Play } from 'lucide-react';

function AlbumCard({title ,artist ,image , onClick}) { 
return (
    <div 
    onClick = {onClick}
    className="shrink-0 hover:bg-neutral-900 h-65 w-50 rounded-lg p-3 flex flex-col gap-2 hover:h-70 cursor-pointer transition-all duration-200"> 
      <img 
      src={image}
      className="w-44 h-40 rounded-lg object-cover"/>
      <div className="flex justify-between">
      <div className="flex flex-col gap-1 ml-1 overflow-hidden">
        <div className="text-white font-bold cursor-pointer text-[15px] transition-all duration-200 truncate">{title}</div>
              <div className="text-gray-300 font-semibold text-xs cursor-pointer hover:text-[13px] transition-all duration-200 truncate">{artist}</div>

        </div> 


        </div> 
    </div>
)
}

export default AlbumCard;
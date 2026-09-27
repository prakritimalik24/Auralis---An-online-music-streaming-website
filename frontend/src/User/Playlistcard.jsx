import React from "react";

function Playlistcard ({onClick,playlist}) {
    return (
        <div 
    onClick = {onClick}
    className="shrink-0 hover:bg-neutral-900 h-20 w-80 rounded-lg p-3 flex flex-col gap-2 hover:scale-110 cursor-pointer transition-all duration-200 bg-neutral-800"> 
    <h2 className="font-bold text-lg text-white">{playlist.name}</h2>
    <p className="text-sm text-gray-400">
        {playlist.musics.length} songs</p>
   </div>
    )
}

export default Playlistcard;
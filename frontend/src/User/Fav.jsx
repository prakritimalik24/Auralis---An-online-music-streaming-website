import React, { useContext } from "react";
import MusicCard from "./MusicCard";
import FavContext from "../context/FavContext";
import Navbar from "./Navbar"

function Fav() {

    const { favorites } = useContext(FavContext);

    return (
        <div className="bg-black pb-30 flex flex-col min-h-screen">
            <Navbar/>
            <div className="p-5">

            <h1 className="text-3xl font-bold  text-white mb-6">
                Your Favorites ❤️
            </h1>

            <div className="flex flex-wrap gap-5">
                {favorites.map((fav) => (
                    fav.music && (
                   <MusicCard
    key={fav.favid}
    track={fav.music}
    title={
        fav.source === "local"
            ? fav.music?.title
            : fav.music?.name
    }
    artist={
        fav.source === "local"
            ? fav.music?.artist?.username
            : fav.music?.artist_name
    }
    image={
        fav.source === "local"
            ? fav.music?.coverimage
            : fav.music?.album_image
    }
/>)
                ))}
            </div>
</div>
        </div>
    );
}

export default Fav;
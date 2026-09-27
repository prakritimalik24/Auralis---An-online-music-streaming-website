import React , {useState ,useEffect}from "react";
import api from "../services/api";
import MusicCard from "./MusicCard";

function Recentlyplayed() {

    const [recentlyplayed, setrecentlyplayed] = useState([]);

    useEffect(() => {
        const getrecentlyplayed = async () => {
            try{
                const response = await api.get("/api/recentlyplayed/");

                setrecentlyplayed(response.data.recentlyplayed);
            } catch(err){
console.log(err);
            }
        };

        getrecentlyplayed();
    },[]);


    return (
       
    <div className="p-5">
                <div className="text-white font-bold ml-5 mb-5 mt-8 text-2xl">Recently Played</div>
            <div className="flex overflow-x-auto gap-15 hide-scrollbar overflow-y-hidden">
                {recentlyplayed.map((recentlyplayed) => (
                    recentlyplayed.music && (
                   <MusicCard
    track={recentlyplayed.music}
    title={
        recentlyplayed.source === "local"
            ? recentlyplayed.music?.title
            : recentlyplayed.music?.name
    }
    artist={
        recentlyplayed.source === "local"
            ? recentlyplayed.music?.artist?.username
            : recentlyplayed.music?.artist_name
    }
    image={
        recentlyplayed.source === "local"
            ? recentlyplayed.music?.coverimage
            : recentlyplayed.music?.album_image
    }
/>)))}
                
            
</div>
</div>
    )
}
export default Recentlyplayed;
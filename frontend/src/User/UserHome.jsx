import React from "react";
 import { useContext ,useState ,useEffect} from "react";
 import AuthContext from "../context/AuthContext";
 import Navbar from "./Navbar";
 import MusicCard from "./MusicCard";
 import api from "../services/api";
 import AlbumCard from "./AlbumCard";
 import ArtistCard from "./ArtistCard";
import MusicContext from "../context/MusicContext";
import AlbumDetails from "./AlbumDetails";
import ArtistDetails from "./ArtistDetails";
import Recentlyplayed from "./Recentlyplayed";
import FooterUser from "./FooterUser";

function UserHome(){
 const {user} = useContext(AuthContext);
 const {setTracks , setisplaying , setcurrentTrack} =useContext(MusicContext);
 const[music,setmusic] = useState([]);
 const[album,setalbum] = useState([]);
 const[artist,setartist] = useState([]);
 const[selectedalbum,setselectedalbum] = useState(null);
 const[selectedartist,setselectedartist] = useState(null);





 useEffect(()=>{
    const getmusic = async () => {
try{
    const response = await api.get("/api/music/jamendo");

    const tracks = response.data.tracks;

const uniqueTracks = [];
const albumIds = new Set();

for (const track of tracks) {
    if (!albumIds.has(track.album_id)) {
        albumIds.add(track.album_id);
        uniqueTracks.push(track);
    }
}

setmusic(uniqueTracks);
setTracks(tracks);

} catch(err) {
    console.log("getmusic",err);
}
    };
    getmusic();
 },[])



 useEffect(()=>{
    const getalbums = async () => {
try{
    const response = await api.get("/api/music/jamendo/albums");

  

setalbum(response.data.albums);

} catch(err) {
    console.log("albums",err);
}
    };
    getalbums();
 },[])


 useEffect(()=>{
    const getartists = async () => {
try{
    const response = await api.get("/api/music/jamendo/artists");

  

setartist(response.data.artists);

} catch(err) {
    console.log("artist",err);
}
    };
    getartists();
 },[]);

  useEffect (() => {
    const getrecentlyplayed = async() => {
        try {
            const response = await api.get("/api/recentlyplayed/");

            const recentlyplayed = response.data.recentlyplayed;

            if(recentlyplayed.length > 0){
                const lastplayed = recentlyplayed[0];

                setcurrentTrack(lastplayed.music);
                setisplaying(false);
            }
        } catch(err) {
            console.log( "recentlyplayed" ,err);
        }
    }

    getrecentlyplayed();
 },[]);


    return(
        
        <div className="bg-black pb-30 flex flex-col min-h-screen">
            <Navbar/>

            <Recentlyplayed/>
            <div className="p-5">
                <div className="text-white font-bold ml-5 mb-5 mt-8 text-2xl">Popular songs</div>
            <div className="flex overflow-x-auto gap-15 hide-scrollbar overflow-y-hidden">
                {music.map((track) => 
                    <MusicCard title={track.name} artist={track.artist_name} image={track.album_image} track={track}/>
                )}
            
</div>
</div>


<div className="p-5">
                <div className="text-white font-bold ml-5 mb-5 mt-8 text-2xl">Popular Albums</div>
            <div className="flex overflow-x-auto gap-15 mt-10 hide-scrollbar overflow-y-hidden">
                {album.map((album) => 
                    <AlbumCard title={album.name} artist={album.artist_name} image={album.image}
                    onClick = {() => {
                        setselectedartist(null);
                        setselectedalbum(album)}}/>
                )}
            
</div>
</div>

<div className="p-5">
                <div className="text-white font-bold ml-5 mb-5 mt-8 text-2xl">Popular Artists</div>
            <div className="flex overflow-x-auto gap-15 mt-10 hide-scrollbar overflow-y-hidden">
                {artist.map((artist) => 
                    <ArtistCard artist={artist.name} image={artist.image}
                    onClick = {() => {
                                    setselectedalbum(null);
setselectedartist(artist)}}/>
                )}
            
</div>
</div>


<AlbumDetails
album={selectedalbum}
onClose={() => setselectedalbum(null)}/>

<ArtistDetails
artist={selectedartist}
onClose={() => setselectedartist(null)}/>

      <FooterUser/>
        </div>

      
    )
}

export default UserHome;
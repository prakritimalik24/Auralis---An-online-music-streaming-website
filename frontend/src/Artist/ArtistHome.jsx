import React from "react";
 import { useContext ,useState ,useEffect} from "react";
 import AuthContext from "../context/AuthContext";
 import ArtistNavbar from "./ArtistNavbar";
 import Musiccardartist from "./Musiccardartist";
 import api from "../services/api";
 import Albumcardartist from "./Albumcardartist";
import MusicContext from "../context/MusicContext";
import Albumdetailsartist from "./Albumdetailsartist";
import FooterArtist from "./FooterArtist";

function ArtistHome(){

     const {user} = useContext(AuthContext);
const {setTracks , setcurrentTrack ,setisplaying} =useContext(MusicContext);
 const[music,setmusic] = useState([]);
 const[album,setalbum] = useState([]);
  const[selectedalbum,setselectedalbum] = useState(null);
 


 useEffect(()=>{
    const getmysongs = async () => {
try{
    const response = await api.get("/api/music/my-music");

  setmusic(response.data.musics);
  setTracks(response.data.musics);


} catch(err) {
    console.log(err);
}
    };
    getmysongs();
 },[])

  useEffect(()=>{
    const getmyalbums = async () => {
try{
    const response = await api.get("/api/music/my-albums");

  setalbum(response.data.albums);

} catch(err) {
    console.log(err);
}
    };
    getmyalbums();
 },[])

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
            <ArtistNavbar/>
            <div className="p-5">
                <div className="text-white font-bold ml-5 mb-5 mt-8 text-2xl">My songs</div>
            <div className="flex overflow-x-auto gap-15 hide-scrollbar overflow-y-hidden">
                 {music?.map((track) => 
                    <Musiccardartist title={track.title}  image={track.coverimage} track={track}/>
                )} 
            
</div>
</div>


<div className="p-5">
                <div className="text-white font-bold ml-5 mb-5 mt-8 text-2xl">My Albums</div>
            <div className="flex overflow-x-auto gap-15 mt-10 hide-scrollbar overflow-y-hidden">
                 {album?.map((album) => 
                    <Albumcardartist 
                     onClick = {() => {
                        setselectedalbum(album)}}
                    title={album.title}  image={album.coverimage}
                  />
                )}
             
</div>
</div>


            


<Albumdetailsartist
album={selectedalbum}
onClose={() => setselectedalbum(null)}/>
        <FooterArtist/>

        </div>

        
    )
}

export default ArtistHome;
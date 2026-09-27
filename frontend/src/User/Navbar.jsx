import React, { useEffect } from "react";
import { Search } from 'lucide-react';
// import { CircleUser } from 'lucide-react';
import { useContext ,useState } from "react";
 import AuthContext from "../context/AuthContext";
 import MusicContext from "../context/MusicContext";
 import { Menu ,Play ,Pause ,X} from 'lucide-react';
 import { Link, useNavigate ,useLocation} from "react-router-dom";
 import api from "../services/api";
 import AlbumDetails from "./AlbumDetails";
 import ArtistDetails from "./ArtistDetails";


function Navbar(){

    const {
  currentTrack,
  setcurrentTrack,
  isplaying,
  setisplaying
} = useContext(MusicContext);
    const navigate = useNavigate();
    const location = useLocation();
    const {user , logout} = useContext(AuthContext);
    const[query , setquery] = useState("");
    const[music,setmusic] = useState([]);
    const[albums,setalbums] = useState([]);
    const[artists,setartists] = useState([]);
    const[selectedalbum,setselectedalbum] = useState(null);
     const[selectedartist,setselectedartist] = useState(null);
     const[showprofile , setshowprofile] = useState(false);
    

     useEffect(() => {
        if(!query.trim()) {
            setmusic([]);
            setalbums([]);
            setartists([]);
          return;
        }

        const search = async () => {
            try{
                const[musicresponse , albumresponse , artistresponse] = 
                await Promise.all([
                    api.get(`api/music/searchallmusic?query=${query}`),
                    api.get(`api/music/searchallalbums?query=${query}`),
                    api.get(`api/music/searchallartists?query=${query}`),
                ]);

                setmusic([
                    ...musicresponse.data.localmusic,
                    ...musicresponse.data.jamendomusic
                ]);
                  setalbums([
                    ...albumresponse.data.localalbum,
                    ...albumresponse.data.jamendoalbum
                ]);
                  setartists([
                    ...artistresponse.data.localartist,
                    ...artistresponse.data.jamendoartist
                ]);

               
            }
            catch(err){
                console.log(err);
            }
        };

           const timer = setTimeout(() => {
        search();
    }, 500);

    return () => {
        clearTimeout(timer);
    };
    } , [query]);
        

    return (
    <div className="flex relative z-50 justify-between items-center h-17 w-full">
          <div className="cursor-pointer p-2.5 px-5 mt-1.5">       <h1 className="font-bold text-xl text-transparent  bg-clip-text bg-linear-to-r to-mauve-500 via-mauve-400 from-mauve-300 ">
    Auralis
</h1></div>

<div className="p-2 flex justify-between items-center gap-10">


    <button
        onClick={() => {navigate("/home/user")}}

     className={`text-gray-300 text-center text-[16px] cursor-pointer hover:bg-mauve-700 hover:p-3 hover:rounded-full hover:font-extrabold transition-all duration-200 ${location.pathname === "/home/user" ? "bg-mauve-700 font-extrabold rounded-full p-3" : "text-gray-300"} `}>Home</button>
       

<button
        onClick={() => {navigate("/favorites")}}

     className={`text-gray-300 text-center text-[16px] cursor-pointer hover:bg-mauve-700 hover:p-3 hover:rounded-full hover:font-extrabold transition-all duration-200 ${location.pathname === "/favorites" ? "bg-mauve-700 font-extrabold rounded-full p-3" : "text-gray-300"} `}>Favorites</button>
           

<button
        onClick={() => {navigate("/playlists")}}

     className={`text-gray-300 text-center text-[16px] cursor-pointer hover:bg-mauve-700 hover:p-3 hover:rounded-full hover:font-extrabold transition-all duration-200 ${location.pathname === "/playlists" ? "bg-mauve-700 font-extrabold rounded-full p-3" : "text-gray-300"} `}>Playists</button>
           



</div>
        <div className=" relative flex justify-between items-center w-1/3 p-3">
            <input
            type="text"
            placeholder="What do you want to play?"
            value={query}
            onChange={(e) => setquery(e.target.value)}
            className="border-2 border-black p-3 w-full rounded-full  bg-neutral-700 text-center border-none outline-none hover:bg-neutral-600 hover:border-2 hover:border-gray-400 transition-all duration-200 hover:text-[17px] text-white placeholder:text-gray-300" 
            />
            <button className=" absolute left-6 cursor-pointer"><Search className="text-gray-300"/></button>
  {query.trim() && (
    <button
      onClick={() => setquery("")}
      className="absolute right-6 cursor-pointer"
    >
      <X className="text-gray-300 hover:scale-110 hover:text-white" />
    </button>
  )}


{query.trim() && (
    <div className="absolute top-full max-h-[500px] flex flex-col gap-1 left-3 right-3 bg-neutral-900 rounded-xl p-2 z-50 overflow-y-auto">
   {music.map((song) => {

    const isCurrentSong =
    String(currentTrack?.id || currentTrack?._id) ===
    String(song.id || song._id);

      const handleSongClick = () => {
    if (isCurrentSong) {
      setisplaying(!isplaying);
    } else {
      setcurrentTrack(song);
      setisplaying(true);
    }
  };

   return (

    
    <div key={song.id || song._id}
    className="flex gap-5  hover:scale-102 cursor-pointer hover:bg-neutral-800 transition-all duration-200 items-center text-white p-2 left-3 right-3 bg-neutral-900 rounded-xl z-50 ">
   <img
   src={song.coverimage || song.album_image}
   className="h-10 w-10  transition-all duration-200 "/>
   <div className="flex flex-1 flex-col gap-0.5">
      <div className="font-semibold text-[15px]">{song.title || song.name}
    </div>
    <div className="font-light text-xs text-gray-300">{song.artist_name || song.artist?.username}   
    </div>
   </div>

    <button
    className="hover:scale-120 cursor-pointer transition-all duration-200" onClick={handleSongClick}>
        {isCurrentSong && isplaying ? (
          <Pause size={20} />
        ) : (
         <Play size={20} fill={!isCurrentSong  || (isCurrentSong && !isplaying ) ? "currentColor" : "none"}/>
        )}
      </button>
 
</div>
   )})}

     {albums.map((album) => (
    <div key={album.id || album._id}
     onClick = {() => {
                        setselectedartist(null);
                        setselectedalbum(album)}}
    className="flex gap-5 hover:scale-102 cursor-pointer hover:bg-neutral-800 transition-all duration-200 items-center text-white p-2 left-3 right-3 bg-neutral-900 rounded-xl z-50 ">
   <img
   src={album.coverimage || album.image}
   className="h-10 w-10 hover:h-12 hover:w-12 transition-all duration-200 "/>
   <div className="flex flex-col gap-0.5">
      <div className="font-semibold text-[15px]">{album.title || album.name}
    </div>
    <div className="font-light text-xs text-gray-300">{album.artist_name || album.artist?.username}  
    </div>
   </div>
 
</div>
   ))}

     {artists.map((artist) => (
    <div key={artist.id || artist._id}
     onClick = {() => {
                        setselectedartist(artist);
                        setselectedalbum(null)}}
    className="flex gap-5 hover:scale-102 cursor-pointer hover:bg-neutral-800 transition-all duration-200 items-center text-white p-2 left-3 right-3 bg-neutral-900 rounded-xl z-50 ">
   <img
   src={artist.coverimage || artist.image}
   alt=""
   className="h-10 w-10 hover:h-12 hover:w-12 transition-all duration-200 "/>
   <div className="flex flex-col gap-0.5">
      <div className="font-semibold text-[15px]">{artist.username || artist.name} 
    </div>
    <div className="font-light text-xs text-gray-300">Artist
    </div>
   </div>
 
</div>
   ))}

</div>

)}
  {query.trim() && (
  <div className="fixed top-17 bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm z-40" />
)}


   


           


<AlbumDetails
album={selectedalbum}
onClose={() => setselectedalbum(null)}/>

<ArtistDetails
artist={selectedartist}
onClose={() => setselectedartist(null)}/>
 </div>
        
       <div className="flex gap-2">
        <div className="  text-center h-16 p-2"><button onClick={async () => {
          await logout();
          navigate("/" , { replace: true });
        }}
         className="  text-center  p-3 px-5 rounded-full bg-mauve-500 text-black font-bold cursor-pointer hover:text-[17px] transition-all duration-200 ">Log out</button></div>

                <div className="relative text-center h-16 p-2"><button 
                onClick={() => setshowprofile(!showprofile)}
                className=" text-center  p-3 px-10 rounded-full bg-mauve-500 text-black font-bold cursor-pointer hover:text-[17px] transition-all duration-200 ">Hi {user?.username} !</button>
{showprofile && (
  <div className="absolute top-full left-0  mr-2 bg-neutral-900 rounded-xl p-2 z-50 w-40 ">
<div className="flex-col  flex items-center ">
<div className=" text-white p-3 text-center text-sm font-semibold">
  Role : {user?.role}
</div>

<button
onClick={async ()=> {
  await logout();
  navigate("/login" , { replace: true });
}}
className=" p-3 text-sm font-semibold rounded-xl text-white text-center hover:bg-neutral-800 cursor-pointer hover:scale-102">
  Switch Profile
</button>
</div>
  </div>

)}
</div>
</div>
</div>
    )
}

export default Navbar;
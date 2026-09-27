import React from "react";
import { useNavigate } from "react-router-dom";
import{useState ,useContext , useEffect} from "react";
import api from "../services/api";
import AuthContext from "../context/AuthContext";
import { Search , X} from "lucide-react";




function Playlistform({onClose , onPlaylistcreated}){

 const {user} = useContext(AuthContext);



 const[query , setquery] = useState("");
 const[music,setmusic] = useState([]);

 const [name,setname] = useState("");
 const [musics,setmusics] = useState([]);
 const[error,seterror] = useState("");

 const navigate = useNavigate();

 const handlesubmit = async (e) => {

    e.preventDefault();
    seterror("");

    if(!name.trim()){
        seterror("Please enter playlist name");
        return;
    }

    if(musics.length == 0){
        seterror("Please add atleast one song");
        return;
    }

    try{

        const response = await api.post("/api/playlists/",{
            name:name
        });

        const playlistId = response.data.playlist._id;

        for(const song of musics){

            if(song._id){

                await api.post(`/api/playlists/${playlistId}/add`,
                    {
                        source:"local",
                        music: song._id
                    }
                )

            }

            else if(song.id){

                await api.post(`/api/playlists/${playlistId}/add`,
                    {
                        source:"jamendo",
                        jamendoId: song.id
                    }
                )

            }
        }

        onPlaylistcreated();
        onClose();

    } catch(err) {

        console.log(err);
        seterror(err.response?.data?.message);

    }

 };


 useEffect(() => {

    if(!query.trim()) {
        setmusic([]);
        return;
    }

    const search = async () => {

        try{

            const musicresponse =
            await api.get(`/api/music/searchallmusic?query=${query}`);

            setmusic([
                ...musicresponse.data.localmusic,
                ...musicresponse.data.jamendomusic
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

 }, [query]);


 const handlesongclick = (song) => {

    setmusics([
        ...musics,
        song
    ]);

    setquery("");

 }


 const handleremovesong = (index) => {

    const newmusics = [...musics];

    newmusics.splice(index,1);

    setmusics(newmusics);

 }


 return (

    <div className="bg-gray-950 flex-col flex items-center z-50 inset-0 fixed h-screen pb-30 overflow-y-auto hide-scrollbar">


        <div className=" w-full  pr-10 pl-10 pb-20 max-w-md gap-12 items-center justify-center flex flex-col">


            <form
                onSubmit={handlesubmit}
                className=" w-full p-2 flex flex-col gap-4"
            >


                <div className="w-full flex flex-col gap-3 p-1">

                    <label className="text-white text-xs font-bold">
                        Playlist Name
                    </label>

                    <input
                        type="text"
                        className="w-full border-2 border-amber-50 rounded-lg p-2 text-white text-lg"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />

                </div>


                <h1 className="text-white font-bold p-1 text-xs">
                    Add songs
                </h1>


                {/* SEARCH + ADDED SONGS CONTAINER */}

                <div className="relative flex flex-col items-center w-full gap-5">


                    {/* SEARCH BAR */}

                    <div className="relative w-full z-[100]">

                        <input
                            type="text"
                            placeholder="Search for songs to add"
                            value={query}
                            onChange={(e) => setquery(e.target.value)}
                            className="border-2 hover:scale-102 border-black p-3 w-full rounded-full bg-neutral-700 text-center border-none outline-none hover:bg-neutral-600 hover:border-2 hover:border-gray-400 transition-all duration-200 text-white placeholder:text-gray-300"
                        />


                        <button
                            type="button"
                            className="absolute left-6 top-3 cursor-pointer"
                        >
                            <Search className="text-gray-300"/>
                        </button>


                        {query.trim() && (

                            <button
                                type="button"
                                onClick={() => setquery("")}
                                className="absolute top-3 right-6 cursor-pointer"
                            >
                                <X className="text-gray-300 hover:scale-110 hover:text-white" />
                            </button>

                        )}


                        {/* SEARCH RESULTS */}

                        {query.trim() && (

                            <div className="absolute top-full left-0 right-0 max-h-[500px] flex flex-col gap-1 bg-neutral-900 rounded-xl p-2 z-[999] overflow-y-auto shadow-2xl hide-scrollbar">

                                {music.map((song) => {

                                    return (

                                        <div
                                            key={song.id || song._id}
                                            className="flex gap-5 hover:scale-102 cursor-pointer hover:bg-neutral-800 transition-all duration-200 items-center text-white p-2 left-3 right-3 bg-neutral-900 rounded-xl"
                                        >

                                            <img
                                                src={song.coverimage || song.album_image}
                                                className="h-10 w-10 transition-all duration-200"
                                            />


                                            <div className="flex flex-1 flex-col gap-0.5">

                                                <div className="font-semibold text-[15px]">
                                                    {song.title || song.name}
                                                </div>

                                                <div className="font-light text-xs text-gray-300">
                                                    {song.artist_name || song.artist?.username}
                                                </div>

                                            </div>


                                            <button
                                                type="button"
                                                className="hover:scale-108 text-white text-[15px] hover:border-2 border-white p-3 cursor-pointer transition-all duration-200 rounded-xl font-bold hover:bg-mauve-700 bg-mauve-500"
                                                onClick={() => handlesongclick(song)}
                                            >
                                                Add
                                            </button>

                                        </div>

                                    )

                                })}

                            </div>

                        )}

                    </div>


                    {/* ADDED SONGS */}

                    {musics.length > 0 && (

                        <div className="relative z-10 w-full flex flex-col overflow-y-auto hide-scrollbar max-h-[400px] gap-2">

                            {musics.map((song, index) => (

                                <div
                                    key={song._id || song.id || index}
                                    className="w-full flex items-center justify-between gap-4 bg-neutral-700 p-3 border-neutral-800 rounded-lg text-white"
                                >

                                    <img
                                        src={song.coverimage || song.album_image}
                                        className="h-10 w-10"
                                    />


                                    <div className="flex flex-col flex-1">

                                        <p className="font-semibold text-sm">
                                            {song.title || song.name}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {song.artist_name || song.artist?.username}
                                        </p>

                                    </div>


                                    <button
                                        type="button"
                                        className="hover:scale-108 text-white text-[15px] hover:border-2 border-white p-3 cursor-pointer transition-all duration-200 rounded-xl font-bold hover:bg-mauve-700 bg-mauve-500"
                                        onClick={() => handleremovesong(index)}
                                    >
                                        Remove
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


                {error && (

                    <p className="text-xs font-bold text-red-600 text-center">
                        {error}
                    </p>

                )}


                <button
                    type="submit"
                    className="hover:scale-108 text-white text-[15px] hover:border-2 p-3 cursor-pointer transition-all duration-200 rounded-full font-bold hover:bg-mauve-700 bg-mauve-500"
                >
                    Create Playlist
                </button>


                <button
                    type="button"
                    onClick={onClose}
                    className="hover:scale-108 text-white text-[15px] hover:border-2 border-white p-3 cursor-pointer transition-all duration-200 rounded-full mb-6 px-7 font-bold hover:bg-mauve-700 bg-mauve-500"
                >
                    Cancel
                </button>


            </form>


        </div>


    </div>

 )

}

export default Playlistform;
import React from "react";
import { createContext , useState  } from "react";


const MusicContext =createContext();

function MusicProvider({children}) {
    const[currentTrack ,setcurrentTrack] =useState(null);
    const[isplaying,setisplaying] = useState(false);
        const[tracks ,setTracks] =useState([]);


    return (
        <MusicContext.Provider value={{currentTrack,setcurrentTrack,isplaying,setisplaying , tracks,setTracks}}>
            {children}
        </MusicContext.Provider>
    )
}

export {MusicProvider};
export default MusicContext;
const axios = require("axios");

async function getjamendomusic(){

    const response = await axios.get("https://api.jamendo.com/v3.0/tracks/" ,
        {
            params: {
                client_id : process.env.JAMENDO_CLIENT_ID,
                format : "json",
                limit: 100 ,
                order: "popularity_total"
            }
        }
    );

    return response.data.results;


}

async function getjamendoalbum(){

    const response = await axios.get(
        "https://api.jamendo.com/v3.0/albums/",
        {
            params: {
                client_id: process.env.JAMENDO_CLIENT_ID,
                format: "json",
                limit: 50,
                order: "popularity_total",
                hasaudio: true
            }
        }
    );

    return response.data.results;
}

async function getjamendoartist(){

    const response = await axios.get(
        "https://api.jamendo.com/v3.0/artists/",
        {
            params: {
                client_id: process.env.JAMENDO_CLIENT_ID,
                format: "json",
                limit: 25,
                order: "popularity_total",
                hasimage: true
            }
        }
    );

    return response.data.results;
}
async function getjamendomusicbyid(trackid){

    const response = await axios.get("https://api.jamendo.com/v3.0/tracks/" ,
        {
            params: {
                client_id : process.env.JAMENDO_CLIENT_ID,
                format : "json",
                id: trackid
            }
        }
    );

    return response.data.results[0];
}

async function getjamendoalbumbyid(albumid){

    const response = await axios.get("https://api.jamendo.com/v3.0/albums/" ,
        {
            params: {
                client_id : process.env.JAMENDO_CLIENT_ID,
                format : "json",
                id: albumid,
            }
        }
    );

    const album = response.data.results[0];

    if(!album) {
        return null;
    }

    const tracks = await axios.get("https://api.jamendo.com/v3.0/tracks/",
        {
            params : {
                client_id : process.env.JAMENDO_CLIENT_ID,
                format : "json",
                album_id: albumid,
            }
        }
    );
    album.tracks = tracks.data.results;

console.log(album);
    return album;
}


async function getjamendoartistbyid(artistid){

    const response = await axios.get("https://api.jamendo.com/v3.0/artists/" ,
        {
            params: {
                client_id : process.env.JAMENDO_CLIENT_ID,
                format : "json",
                id: artistid,
            }
        }
    );

    const artist = response.data.results[0];

    if(!artist) {
        return null;
    }

    const tracks = await axios.get("https://api.jamendo.com/v3.0/tracks/",
        {
            params : {
                client_id : process.env.JAMENDO_CLIENT_ID,
                format : "json",
                artist_id: artistid,
            }
        }
    );
    artist.tracks = tracks.data.results;

console.log(artist);
    return artist;
}



async function searchjamendomusic(query){
    const response = await axios.get(
        "https://api.jamendo.com/v3.0/tracks/",
        {
            params: {
                client_id : process.env.JAMENDO_CLIENT_ID,
                format : "json",
                limit : 10, 
                namesearch : query
            }
        }
    )

    return response.data.results;
}

async function searchjamendoalbum(query){
    const response = await axios.get(
        "https://api.jamendo.com/v3.0/albums/",
        {
            params: {
                client_id : process.env.JAMENDO_CLIENT_ID,
                format : "json",
                limit : 10 , 
                namesearch : query
            }
        }
    )

    return response.data.results;
}

async function searchjamendoartist(query){
    const response = await axios.get(
        "https://api.jamendo.com/v3.0/artists/",
        {
            params: {
                client_id : process.env.JAMENDO_CLIENT_ID,
                format : "json",
                limit : 20 , 
                namesearch : query
            }
        }
    )

    return response.data.results;
}

module.exports = {getjamendomusic , getjamendoalbum,getjamendoartist,getjamendomusicbyid, getjamendoalbumbyid,getjamendoartistbyid,searchjamendomusic , searchjamendoalbum , searchjamendoartist};
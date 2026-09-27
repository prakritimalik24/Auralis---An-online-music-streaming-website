const musicmodel = require("../models/music.model");
const albummodel = require("../models/album.model");
const usermodel = require("../models/user.model");
const {uploadfile , uploadimg} = require("../services/storage.service");
const {getjamendomusic ,getjamendoalbum,getjamendoartist,getjamendoalbumbyid,getjamendoartistbyid, searchjamendomusic , searchjamendoalbum , searchjamendoartist} = require("../services/jamendo.service");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function createmusic(req,res) {

   console.log(req.body);
console.log(req.files);
const {title} = req.body;

const musicfile = req.files.music[0]; 

const coverimage = req.files.coverimage[0];

const result = await uploadfile(musicfile.buffer.toString('base64'))
const musiccoverresult  = await uploadimg(coverimage.buffer.toString('base64'))

const music = await musicmodel.create({
 uri: result.url,

 title,

 artist: req.user.id,
 album : null,

coverimage: musiccoverresult.url
});

res.status(201).json({
message:"music created successfully",
 music: { 
 id: music._id,

uri: music.uri,

title: music.title,
artist : music.artist,
album : music.album,
coverimage : music.coverimage
}

})

}

async function createalbum(req,res) {
    
     const{title} = req.body;

     const musictitles = JSON.parse(req.body.musictitles);

     const albumcover = req.files.albumcover[0];

     const musicfiles= req.files.musicfiles;
     const musiccovers = req.files.musiccovers;

          const albumcoverresult = await uploadimg(albumcover.buffer.toString('base64'))


     const album = await albummodel.create({
        title,
        artist: req.user.id,
       coverimage : albumcoverresult.url,
       musics: [] 

     })

     const musicids = [];

     for(let i = 0 ; i < musicfiles.length; i++){
      const musicfile = musicfiles[i];
      const musiccover = musiccovers[i];

      const musicresult = await uploadfile(musicfile.buffer.toString("base64"));

      const coverresult = await uploadimg(musiccover.buffer.toString("base64"));

      const music = await musicmodel.create({
         uri: musicresult.url,
         title: musictitles[i],
         artist : req.user.id,
         album: album._id,
         coverimage: coverresult.url
      });

      musicids.push(music._id);
     }

     album.musics = musicids;
     await album.save();


     res.status(201).json({
        message: "album created",

        album: {
         id: album._id,
         title: album.title,
         artist: album.artist,
         coverimage : album.coverimage,
         musics : musicids
        }
     })}

     async function getmymusic(req,res){
      const musics = await musicmodel.find({
         artist: req.user.id
      });

      return res.status(200).json({
         message : "Your music files are fetched" , 
         musics
      });
     }


     async function getmyalbums(req,res){
      const albums = await albummodel.find({
         artist: req.user.id
      });

      return res.status(200).json({
         message : "Your albums are fetched" , 
         albums
      });
     }

      async function getmyalbumdetails(req,res){
         const albumid = req.params.albumid;
      const album = await albummodel.findOne({
         _id: albumid,
         artist: req.user.id
      }).populate("musics");

      if(!album){
         return res.status(404).json({
            message:"album not found"
         });
      }

      return res.status(200).json({
         message : "Your album is fetched" , 
         album
      });
     }


 async function getallmusic(req,res){

   const musics = await musicmodel.find()

   res.status(200).json({
      message: "music fetched successfully",
      musics
   })
 }


 async function getallalbums(req,res){
    const albums = await albummodel.find().limit(20)

    res.status(200).json({
      message:  "album fetched successfully",
     albums
  })
 }

 async function getalbumbyid(req,res){

   const albumid = req.params.albumid;

   if (!mongoose.Types.ObjectId.isValid(albumid)) {
        return res.status(400).json({
            message: "invalid album id"
        });
    }

   const album  = await albummodel.findById(albumid).populate("musics");

   if(!album) {
      return res.status(401).json({
         message : "album not found"
      })
   }

   return res.status(200).json({
      message: "album fetched successfully",
      album
   })
}

 async function getmusicbyid(req,res){

   const musicid = req.params.musicid;

   if (!mongoose.Types.ObjectId.isValid(musicid)) {
        return res.status(400).json({
            message: "invalid music id"
        });
    }

   const music  = await musicmodel.findById(musicid);

   if(!music) {
      return res.status(401).json({
         message : "music not found"
      })
   }

   return res.status(200).json({
      message: "music fetched successfully",
      music
   })
}

async function searchmusic(req,res){
   const {query} = req.query;

   const musics = await musicmodel.find({
      title : {
         $regex: query,
         $options: "i"
      }
   });

   return res.status(200).json({
      message: "music searched",
      musics
   })
}

async function searchalbums(req,res){
   const {query} = req.query;

   const albums = await albummodel.find({
      title : {
         $regex: query,
         $options: "i"
      }
   });

   return res.status(200).json({
      message: "album searched",
      albums
   })
}


async function searchartists(req,res) {
   const {query} = req.query;

   const artists = await usermodel.find({
      username : {
         $regex: query,
         $options: "i"
      },
      role : "artist"
   });

   return res.status(200).json({
      message: "artist searched sucessfully" ,
      artists
   });
}

async function getjamendomusics(req,res){
   const tracks  = await getjamendomusic();

   const validTracks = tracks.filter(
    (track) => track && track.id && track.audio
);

   return res.status(200).json({
      message : "jamendo tracks fetched",
      tracks : validTracks
   })
}


async function getjamendoalbums(req,res){
   const albums  = await getjamendoalbum();

   return res.status(200).json({
      message : "jamendo albums fetched",
      albums
   })
}

async function getjamendoartists(req,res){
   const artists  = await getjamendoartist();

   return res.status(200).json({
      message : "jamendo artists fetched",
      artists
   })
}


async function fetchjamendoalbum(req, res) {

    const albumid = req.params.albumid;

    const album = await getjamendoalbumbyid(albumid);

    if (!album) {
        return res.status(404).json({
            message: "jamendo album not found"
        });
    }

    return res.status(200).json({
        message: "jamendo album fetched successfully",
        album
    });
}


async function fetchjamendoartist(req, res) {

    const artistid = req.params.artistid;

    const artist = await getjamendoartistbyid(artistid);

    if (!artist) {
        return res.status(404).json({
            message: "jamendo artist not found"
        });
    }

    return res.status(200).json({
        message: "jamendo artist fetched successfully",
        artist
    });
}

async function searchjamendomusics(query){


   const tracks = await searchjamendomusic(query);

   return res.status(200).json({
      message: " jamendo music searched ",
      tracks
   })
}


async function searchallmusic(req,res){

   const {query} = req.query;

   const localmusic = await musicmodel.find({
      title : {
         $regex : query,
         $options : "i"
      }
   }).populate("artist", "username");

   const jamendomusic = await searchjamendomusic(query);

   return res.status(200).json({
      message : "music searched",
      localmusic,
      jamendomusic
   })
}

async function searchallalbums(req,res){

   const {query} = req.query;

   const localalbum = await albummodel.find({
      title : {
         $regex : query,
         $options : "i"
      }
   }).populate("artist", "username");

   const jamendoalbum = await searchjamendoalbum(query);

   return res.status(200).json({
      message : "album searched",
      localalbum,
      jamendoalbum
   })
}


async function searchallartists(req,res){

   const {query} = req.query;

   const localartist = await usermodel.find({
      username : {
         $regex : query,
         $options : "i"
      },
      role:"artist"

   });

   const jamendoartist = await searchjamendoartist(query);

   return res.status(200).json({
      message : "artist searched",
      localartist,
      jamendoartist
   })
}

module.exports = { createmusic , createalbum , getmymusic , getmyalbums ,getmyalbumdetails, getalbumbyid , getallmusic , getallalbums , getmusicbyid , searchmusic , searchalbums , searchartists , 
   getjamendomusics , getjamendoalbums , getjamendoartists,searchjamendomusics , searchallmusic , searchallalbums , searchallartists , fetchjamendoartist,fetchjamendoalbum}

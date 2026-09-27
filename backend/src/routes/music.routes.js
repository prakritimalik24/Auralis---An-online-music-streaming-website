const express = require("express");
const musiccontroller = require("../controller/music.controller");
const authmiddleware = require("../middleware/auth.middleware")
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

router.post("/upload",authmiddleware.authartist,upload.fields([{name: "music" , maxCount:1} , {name: "coverimage" , maxCount : 1}]),musiccontroller.createmusic)

router.post("/album" , authmiddleware.authartist,upload.fields([{name: "albumcover" , maxCount:1} , {name: "musicfiles" , maxCount : 10}, {name: "musiccovers" , maxCount : 10}]),musiccontroller.createalbum);

router.get("/my-music",authmiddleware.authartist,musiccontroller.getmymusic);

router.get("/my-albums",authmiddleware.authartist,musiccontroller.getmyalbums);

router.get("/my-album/:albumid",authmiddleware.authartist,musiccontroller.getmyalbumdetails);


 router.get("/",authmiddleware.authuser,musiccontroller.getallmusic);

router.get("/search" , authmiddleware.authuser,musiccontroller.searchmusic);

router.get("/search-albums" , authmiddleware.authuser,musiccontroller.searchalbums);

router.get("/search-artists" , authmiddleware.authuser,musiccontroller.searchartists);

router.get("/searchallmusic",authmiddleware.authme,musiccontroller.searchallmusic)

router.get("/searchallalbums",authmiddleware.authme,musiccontroller.searchallalbums)

router.get("/searchallartists",authmiddleware.authme,musiccontroller.searchallartists)


router.get("/jamendo",authmiddleware.authuser,musiccontroller.getjamendomusics)

router.get("/jamendo/artists",authmiddleware.authuser,musiccontroller.getjamendoartists)
router.get("/jamendo/albums",authmiddleware.authuser,musiccontroller.getjamendoalbums)


router.get("/jamendo/searchmusic",authmiddleware.authuser,musiccontroller.searchjamendomusics)


router.get("/jamendo/:albumid",authmiddleware.authuser,musiccontroller.fetchjamendoalbum)
router.get("/jamendo/artist/:artistid",authmiddleware.authuser,musiccontroller.fetchjamendoartist)


router.get("/albums",authmiddleware.authuser,musiccontroller.getallalbums);
router.get("/albums/:albumid" , authmiddleware.authuser, musiccontroller.getalbumbyid);


  router.get("/:musicid" , authmiddleware.authuser, musiccontroller.getmusicbyid)



module.exports = router;
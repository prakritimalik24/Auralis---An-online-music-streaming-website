const express = require("express");

const playlistcontroller = require("../controller/playlist.controller");

const authmiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authmiddleware.authuser , playlistcontroller.createplaylist);

router.post("/:playlistId/add", authmiddleware.authuser , playlistcontroller.addmusicplaylist);

router.get( "/my",authmiddleware.authuser,playlistcontroller.getmyplaylists);

router.get( "/:playlistId",authmiddleware.authuser,playlistcontroller.getplaylistbyid);

router.delete( "/:playlistId/music",authmiddleware.authuser,playlistcontroller.removemusicplaylist);

router.delete( "/:playlistId",authmiddleware.authuser,playlistcontroller.deleteplaylist);


module.exports = router;

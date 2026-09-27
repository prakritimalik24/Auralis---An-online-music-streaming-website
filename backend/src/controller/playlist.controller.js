const playlistmodel = require("../models/playlist.model");
const mongoose = require("mongoose");

const {getjamendomusicbyid} = require("../services/jamendo.service")

async function createplaylist(req, res) {

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "playlist name is required"
        });
    }

    const playlist = await playlistmodel.create({
        user: req.user.id,
        name: name,
        musics: []
    });

    return res.status(201).json({
        message: "playlist created successfully",
        playlist
    });
}


async function addmusicplaylist(req, res) {

    const playlistId = req.params.playlistId;

   if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        return res.status(400).json({
            message: "invalid playlist id"
        });
    }
    
    const { source, music, jamendoId } = req.body;


    // Find playlist belonging to logged-in user
    const playlist = await playlistmodel.findOne({
        _id: playlistId,
        user: req.user.id
    });

    if (!playlist) {
        return res.status(404).json({
            message: "playlist not found"
        });
    }


    // LOCAL MUSIC
    if (source === "local") {

        if (!music) {
            return res.status(400).json({
                message: "music id is required"
            });
        }


        // Check duplicate
        const alreadyexists = playlist.musics.some(
            item =>
                item.source === "local" &&
                item.music.toString() === music
        );

        if (alreadyexists) {
            return res.status(409).json({
                message: "music already exists in playlist"
            });
        }


        // Add local music
        playlist.musics.push({
            source: "local",
            music: music
        });
    }


    // JAMENDO MUSIC
    else if (source === "jamendo") {

        if (!jamendoId) {
            return res.status(400).json({
                message: "jamendo id is required"
            });
        }


        // Check duplicate
        const alreadyexists = playlist.musics.some(
            item =>
                item.source === "jamendo" &&
                item.jamendoId === jamendoId
        );

        if (alreadyexists) {
            return res.status(409).json({
                message: "music already exists in playlist"
            });
        }


        // Add Jamendo music
        playlist.musics.push({
            source: "jamendo",
            jamendoId: jamendoId
        });
    }

    else {

        return res.status(400).json({
            message: "invalid source"
        });
    }


    await playlist.save();


    return res.status(200).json({
        message: "music added to playlist",
        playlist
    });
}

async function getmyplaylists(req, res) {

    const playlists = await playlistmodel.find({
        user: req.user.id
    });

    return res.status(200).json({
        message: "playlists fetched successfully",
        playlists
    });
}



async function getplaylistbyid(req, res) {

    const playlistId = req.params.playlistId;

    const playlist = await playlistmodel.findOne({
        _id: playlistId,
        user: req.user.id
    }).populate({
        path:"musics.music",
    populate: {
        path: "artist",
        select: "username"
    }});

    if (!playlist) {
        return res.status(404).json({
            message: "playlist not found"
        });
    }

    const musics = [];

    for (const item of playlist.musics) {

        if (item.source === "local") {

            musics.push({
                source: "local",
                music: item.music
            });

        }

        if (item.source === "jamendo") {

            const track = await getjamendomusicbyid(
                item.jamendoId
            );

            musics.push({
                source: "jamendo",
                music: track
            });
        }
    }

    return res.status(200).json({
        message: "playlist fetched successfully",

        playlist: {
            id: playlist._id,
            name: playlist.name,
            musics: musics
        }
    });
}

async function removemusicplaylist(req, res) {

    const playlistId = req.params.playlistId;

       if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        return res.status(400).json({
            message: "invalid playlist id"
        });
    }

    const { source, music, jamendoId } = req.body;

    const playlist = await playlistmodel.findOne({
        _id: playlistId,
        user: req.user.id
    });

    if (!playlist) {
        return res.status(404).json({
            message: "playlist not found"
        });
    }


    if (source === "local") {

        if (!music) {
            return res.status(400).json({
                message: "music id is required"
            });
        }

        const musicindex = playlist.musics.findIndex(
            item =>
                item.source === "local" &&
                item.music.toString() === music
        );

        if (musicindex === -1) {
            return res.status(404).json({
                message: "music not found in playlist"
            });
        }

        playlist.musics.splice(musicindex, 1);
    }


    else if (source === "jamendo") {

        if (!jamendoId) {
            return res.status(400).json({
                message: "jamendo id is required"
            });
        }

        const musicindex = playlist.musics.findIndex(
            item =>
                item.source === "jamendo" &&
                item.jamendoId === jamendoId
        );

        if (musicindex === -1) {
            return res.status(404).json({
                message: "music not found in playlist"
            });
        }

        playlist.musics.splice(musicindex, 1);
    }


    else {
        return res.status(400).json({
            message: "invalid source"
        });
    }


    await playlist.save();

    return res.status(200).json({
        message: "music removed from playlist",
        playlist
    });
}

async function deleteplaylist(req, res) {

    const playlistId = req.params.playlistId;

    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        return res.status(400).json({
            message: "invalid playlist id"
        });
    }

    const playlist = await playlistmodel.findOneAndDelete({
        _id: playlistId,
        user: req.user.id
    });

    if (!playlist) {
        return res.status(404).json({
            message: "playlist not found"
        });
    }

    return res.status(200).json({
        message: "playlist deleted successfully"
    });
}


module.exports = {createplaylist , addmusicplaylist ,getmyplaylists , getplaylistbyid , removemusicplaylist , deleteplaylist};
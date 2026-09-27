const favmodel = require("../models/fav.model");
const {getjamendomusicbyid} = require("../services/jamendo.service");
const mongoose= require("mongoose");

async function addfav(req,res){

    const {source , music , jamendoid , jamendomusic} = req.body;

    if(source === "local") {

        if(!music){
            return res.status(400).json({
                message: "music id is required"
            });
        }

        const existingfav = await favmodel.findOne({
            user : req.user.id ,
            source: "local" ,
            music : music
        });

        if(existingfav) {
            return res.status(409).json({
                message: "music already in favourites"
            });
        }

        const fav = await favmodel.create({
            user: req.user.id,
            source : "local" ,
            music: music
        });

        return res.status(201).json({
            message : "music added to fav",
            fav
        });
    }


if(source === "jamendo") {

        if(!jamendoid){
            return res.status(400).json({
                message: "jamendo id is required"
            });
        }

        const existingfav = await favmodel.findOne({
            user : req.user.id ,
            source: "jamendo" ,
            jamendoid : jamendoid,
        });

        if(existingfav) {
            return res.status(409).json({
                message: "music already in favourites"
            });
        }

        const fav = await favmodel.create({
            user: req.user.id,
            source : "jamendo" ,
            jamendoid: jamendoid,
                        jamendomusic:jamendomusic

        });
        return res.status(201).json({
            message : "music added to fav",
            fav
        });
    }

    return res.status(401).json({
        message:"invalid source"
    })
 }

 async function getfav(req,res) {
    const favs = await favmodel.find({
        user : req.user.id
    }).populate({
    path: "music",
    populate: {
        path: "artist",
        select: "username"
    }
});
console.log("FAVS FROM DB:", favs);


    const result = [];

    for (const fav of favs) {


        if(fav.source === "local") {
            result.push({
                favid: fav._id,
                source : "local" , 
                music : fav.music
            });
        }

        if(fav.source === "jamendo") {


    

           result.push({
    favid: fav._id,
    source: "jamendo",
    music: fav.jamendomusic
});
        }
    }


    return res.status(200).json({
        message:"fav fetched successfully",
        favs : result
    });
 }


 async function removefav (req,res) {

    const favid = req.params.favid;

    if (!mongoose.Types.ObjectId.isValid(favid)) {
        return res.status(400).json({
            message: "invalid fav id"
        });
    }

    const fav = await favmodel.findOneAndDelete({
        _id : favid,
        user : req.user.id
    });

    if(!fav) {
        return res.status(404).json({
            message: "fav not found"
        });
    }

    return res.status(200).json({
        message: "fav removed"

    })
 }
 module.exports = {addfav , getfav ,removefav}
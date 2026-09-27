const recentlyplayedmodel = require("../models/recentlyplayed.model");
const {getjamendomusicbyid} = require("../services/jamendo.service")


async function addrecentlyplayed(req,res){
    const {source , music , jamendoid} = req.body;

    
 if(source === "local") {
 
         if(!music){
             return res.status(400).json({
                 message: "music id is required"
             });
         }
 
         const existing = await recentlyplayedmodel.findOne({
             user : req.user.id ,
             source: "local" ,
             music : music
         });
 
         if(existing) {
          existing.playedAt = new Date();

          await existing.save();

             return res.status(200).json({
                 message: "recently played updated"
             });
         }
 
         const recentlyplayed = await recentlyplayedmodel.create({
             user: req.user.id,
             source : "local" ,
             music: music
         });
 
         return res.status(201).json({
             message : "music added to recently played",
             recentlyplayed
         });
     }
 
 
 if(source === "jamendo") {
 
         if(!jamendoid){
             return res.status(400).json({
                 message: "jamendo id is required"
             });
         }
 
         const existing = await recentlyplayedmodel.findOne({
             user : req.user.id ,
             source: "jamendo" ,
             jamendoid : jamendoid
         });
 
         if(existing) {
            existing.playedAt = new Date();

          await existing.save();

             return res.status(200).json({
                 message: "recently played updated"
             });
            
         }
 
         const recentlyplayed = await recentlyplayedmodel.create({
             user: req.user.id,
             source : "jamendo" ,
             jamendoid: jamendoid
         });
 
         return res.status(201).json({
             message : "music added to recently played",
             recentlyplayed
         });
     }

    return res.status(400).json({
        message: "invalid source"
    

    });

  }

  async function getrecentlyplayed(req,res) {

    const recentlyplayed = await recentlyplayedmodel.find({
        user:req.user.id
    }).populate({
    path: "music",
    populate: {
        path: "artist",
        select: "username"
    }
}).sort({playedAt : -1}).limit(15);

    const result = [];

    for(const item of recentlyplayed) {

        if(item.source === "local") {
            result.push({
                source : "local",
                music:item.music,
                playedAt:item.playedAt
            })
        }

        if(item.source === "jamendo") {

            const track = await getjamendomusicbyid(item.jamendoid);

            result.push({
                source : "jamendo",
                music: track,
                playedAt:item.playedAt
            });
        }
    }

    return res.status(200).json({
        message:"recently played fetched",
        recentlyplayed : result
    });


  }

  module.exports = {addrecentlyplayed ,  getrecentlyplayed};
 
  
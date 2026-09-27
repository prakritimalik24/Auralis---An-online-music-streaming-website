const mongoose = require("mongoose");

const recentlyplayedscehma = new mongoose.Schema({

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    } ,
    source : {
            type: String,
            enum : ["local" , "jamendo"],
            required : true
        } , 
    
        music : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "music",
            default : null
     } , 
        jamendoid : {
            type : String , 
            default: null
        } ,
        playedAt: {
    type: Date,
    default: Date.now
}
    },{
        timestamps : true
});

const recentlyplayedmodel = new mongoose.model("recentlyplayed" , recentlyplayedscehma);

module.exports = recentlyplayedmodel;
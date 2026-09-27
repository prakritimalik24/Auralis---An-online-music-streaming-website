const mongoose = require("mongoose");


const albumschema = new mongoose.Schema({
title:{
    type: String,
    required : true,
},
musics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "music"
}],
artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user" ,
    required : true,
},
coverimage : {
    type: String,
    

}

})

const albummodel = mongoose.model("album",albumschema);

module.exports = albummodel;
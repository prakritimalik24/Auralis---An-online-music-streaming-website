const mongoose = require("mongoose");

const favschema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "user",
        required : true
    },
    source : {
        type: String,
        enum : ["local" , "jamendo"],
        required : true
    } , 

    music : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "music"
 } , 
    jamendoid : {
        type : String , 
        default: null
    },
    jamendomusic: {
    type: Object,
    default: null
}
    
});

const favmodel = mongoose.model("fav",favschema);

module.exports = favmodel;
const mongoose = require("mongoose");

const musicschema = new mongoose.Schema({

uri:{

 type: String,

required: true

},

title: {

type: String,

 required: true

},

artist : {
 type: mongoose.Schema.Types.ObjectId,
 ref: "user",

required: true,

},

album: {

type: mongoose.Schema.Types.ObjectId,

ref: "album",

 default: null

},

coverimage: {

type: String,

}

})
const musicmodel = mongoose.model("music",musicschema)

module.exports = musicmodel;
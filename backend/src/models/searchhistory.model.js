const mongoose = require ("mongoose");

const searchhistoryscehma = new mongoose.Schema({
     user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user" ,
        required :true
     } , 

     query : {
type : String , 
required : true

     } 
} , {
  timestamps: true
     
});

const searchhistorymodel = mongoose.model("searchhistory" , searchhistoryscehma);

module.exports = searchhistorymodel;
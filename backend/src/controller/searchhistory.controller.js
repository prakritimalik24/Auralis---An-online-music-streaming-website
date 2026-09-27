const searchhistorymodel  = require ("../models/searchhistory.model");

async function savesearches (req,res) {
     const {query} = req.body;

     if(!query) {
        return res.status(400).json({
            message : "search query is required"
        });
     }

     const searchhistory = await searchhistorymodel.create({
        user: req.user.id,
        query : query
     });

     return res.status(201).json({
        message : "search history saved" , 
        searchhistory
     });
}

async function getsearchhistory(req,res){
    const history = await searchhistorymodel.find({
        user:req.user.id
    }).sort({createdAt: -1});

    return res.status(200).json({
        message:"search history fetched" , 
        history
    });
}

async function deletesearchistory(req,res) {
    const historyid =  req.params.historyid;

       if (!mongoose.Types.ObjectId.isValid(historyid)) {
        return res.status(400).json({
            message: "invalid music id"
        });
    }

    const history = await searchhistorymodel.findOneAndDelete({
        _id : historyid,
        user: req.user.id
    });

    if(!history){
        return res.status(404).json({
            message: "search history not found"
        });
    }

    return res.status(200).json({
        message : "search history deleted"
    });
}

module.exports = {savesearches , getsearchhistory , deletesearchistory}
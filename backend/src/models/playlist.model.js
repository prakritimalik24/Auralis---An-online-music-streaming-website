const mongoose = require("mongoose");

const playlistschema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    musics: [
        {
            source: {
                type: String,
                enum: ["local", "jamendo"],
                required: true
            },

            music: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "music",
                default: null
            },

            jamendoId: {
                type: String,
                default: null
            }
        }
    ]
},{

    timestamps: true
});

const playlistmodel = mongoose.model("playlist", playlistschema);

module.exports = playlistmodel;

const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors")
const authroutes = require("./routes/auth.routes")
const musicroutes = require("./routes/music.routes");
const favroutes = require("./routes/fav.routes");
const searchhistoryroutes = require("./routes/searchhistory.routes");
const recentlyplayedroutes = require("./routes/recentlyplayed.routes");
const playlistroutes = require("./routes/playlist.routes")

const app = express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json());
app.use(cookieparser());

app.use("/api/auth",authroutes);
app.use("/api/music",musicroutes);
app.use("/api/fav",favroutes);
app.use("/api/search-history",searchhistoryroutes);
app.use("/api/recentlyplayed",recentlyplayedroutes);
app.use("/api/playlists",playlistroutes);


module.exports = app;
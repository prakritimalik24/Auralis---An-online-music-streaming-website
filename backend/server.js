require('dotenv').config();
const dns =  require("dns");
dns.setServers(['8.8.8.8','8.8.4.4']);

const connectdb = require('./src/db/db');

const app = require("./src/app");

connectdb();

app.listen(3000 , () => {
    console.log("server is running")
})
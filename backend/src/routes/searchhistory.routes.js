const express = require("express");

const searchhistorycontroller = require("../controller/searchhistory.controller");

const authmiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/",authmiddleware.authuser , searchhistorycontroller.savesearches);

router.get("/",authmiddleware.authuser , searchhistorycontroller.getsearchhistory);

router.delete("/:historyid",authmiddleware.authuser , searchhistorycontroller.deletesearchistory);


module.exports = router;
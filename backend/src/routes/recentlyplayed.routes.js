const express = require("express");

const recentlyplayedcontroller = require("../controller/recentlyplayed.controller");

const authmiddleware = require("../middleware/auth.middleware");

const router = express.Router();


router.post("/",authmiddleware.authme , recentlyplayedcontroller.addrecentlyplayed);

router.get("/",authmiddleware.authme , recentlyplayedcontroller.getrecentlyplayed);


module.exports = router;
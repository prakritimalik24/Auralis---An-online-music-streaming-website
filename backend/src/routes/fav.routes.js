const express = require("express");

const favcontroller = require("../controller/fav.controller");

const authmiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/add", authmiddleware.authuser , favcontroller.addfav);

router.get("/",authmiddleware.authuser , favcontroller.getfav);

router.delete("/:favid" , authmiddleware.authuser , favcontroller.removefav);

module.exports = router;


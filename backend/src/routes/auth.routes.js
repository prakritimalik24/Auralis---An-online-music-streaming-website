const express = require("express");
const authcontroller = require("../controller/auth.controller");
const authmiddleware = require("../middleware/auth.middleware");

const router = express.Router();


router.post("/register",authcontroller.registeruser);
router.post("/login" , authcontroller.loginuser);
router.get("/me" ,authmiddleware.authme, authcontroller.userme);

router.post("/logout",authcontroller.logout);

module.exports = router;
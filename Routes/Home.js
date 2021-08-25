const express = require("express");

const router = express.Router();


const homecontroller = require("../Controllers/HomeController");


router.get("/",homecontroller.GetIndex);


module.exports = router;
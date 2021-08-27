const express = require("express");

const router = express.Router();


const autorcontroller = require("../Controllers/AutorController");

const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/Menu",isAuthenticated,autorcontroller.GetMenu);

router.get("/Create",isAuthenticated,autorcontroller.GetAddAutor);
router.post("/Create", autorcontroller.PostAddAutor);

router.get("/edit/:autorId",isAuthenticated, autorcontroller.GetEditAutor);
router.post("/edit",isAuthenticated,autorcontroller.PostEditAutor);

router.get("/List",isAuthenticated,autorcontroller.GetAutorList);

router.get("/delete/:autorId",isAuthenticated,autorcontroller.GetDeleteAutor);
router.post("/delete",isAuthenticated,autorcontroller.DeleteConfirm);

module.exports = router;
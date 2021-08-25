const express = require("express");

const router = express.Router();


const autorcontroller = require("../Controllers/AutorController");

router.get("/Menu",autorcontroller.GetMenu);

router.get("/Create",autorcontroller.GetAddAutor);
router.post("/Create", autorcontroller.PostAddAutor);

router.get("/edit/:autorId", autorcontroller.GetEditAutor);
router.post("/edit", autorcontroller.PostEditAutor);

router.get("/List",autorcontroller.GetAutorList);

router.get("/delete/:autorId",autorcontroller.GetDeleteAutor);
router.post("/delete",autorcontroller.DeleteConfirm);

module.exports = router;
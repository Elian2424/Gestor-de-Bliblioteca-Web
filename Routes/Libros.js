
const express = require("express");

const router = express.Router();


const Libroscontroller = require("../Controllers/LibroController");

router.get("/Menu",Libroscontroller.GetMenu);

router.get("/Create",Libroscontroller.GetAddLibro);
router.post("/Create",Libroscontroller.PostAddLibro);

router.get("/edit/:libroId",Libroscontroller.GetEditLibro);
router.post("/edit",Libroscontroller.PostEditLibro);


router.get("/List",Libroscontroller.GetLibroList);

router.get("/delete/:libroId",Libroscontroller.GetDeleteLibro);
router.post("/delete",Libroscontroller.DeleteConfirm);

module.exports = router;
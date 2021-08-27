
const express = require("express");

const router = express.Router();


const Libroscontroller = require("../Controllers/LibroController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/Menu",isAuthenticated,Libroscontroller.GetMenu);

router.get("/Create",isAuthenticated,Libroscontroller.GetAddLibro);
router.post("/Create",isAuthenticated,Libroscontroller.PostAddLibro);

router.get("/edit/:libroId",isAuthenticated,Libroscontroller.GetEditLibro);
router.post("/edit",isAuthenticated,Libroscontroller.PostEditLibro);


router.get("/List",Libroscontroller.GetLibroList);

router.get("/delete/:libroId",isAuthenticated,Libroscontroller.GetDeleteLibro);
router.post("/delete",isAuthenticated,Libroscontroller.DeleteConfirm);

module.exports = router;
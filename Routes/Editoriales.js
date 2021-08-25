const express = require("express");

const router = express.Router();


const Editorialcontroller = require("../Controllers/EditorialController");

router.get("/Menu",Editorialcontroller.GetMenu);

router.get("/CreateP",Editorialcontroller.GetAddEditorial);
router.post("/Create",Editorialcontroller.PostAddEditorial);


router.get("/edit/:editorialId",Editorialcontroller.GetEditEditorial);
router.post("/edit",Editorialcontroller.PostEditEditorial);

router.get("/List",Editorialcontroller.GetEditorialList);

router.get("/delete/:editorialId",Editorialcontroller.GetDeleteEditorial);
router.post("/delete",Editorialcontroller.DeleteConfirm);
module.exports = router;
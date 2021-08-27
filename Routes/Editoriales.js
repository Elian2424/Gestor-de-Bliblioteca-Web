const express = require("express");

const router = express.Router();


const Editorialcontroller = require("../Controllers/EditorialController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/Menu",isAuthenticated,Editorialcontroller.GetMenu);

router.get("/CreateP",isAuthenticated,Editorialcontroller.GetAddEditorial);
router.post("/Create",isAuthenticated,Editorialcontroller.PostAddEditorial);


router.get("/edit/:editorialId",isAuthenticated,Editorialcontroller.GetEditEditorial);
router.post("/edit",isAuthenticated,Editorialcontroller.PostEditEditorial);

router.get("/List",isAuthenticated,Editorialcontroller.GetEditorialList);

router.get("/delete/:editorialId",isAuthenticated,Editorialcontroller.GetDeleteEditorial);
router.post("/delete",isAuthenticated,Editorialcontroller.DeleteConfirm);
module.exports = router;
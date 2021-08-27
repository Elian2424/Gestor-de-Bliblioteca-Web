const express = require("express");

const router = express.Router();


const adminController = require("../Controllers/AdminController");
const { route } = require("./Home");



router.get("/Create",adminController.GetAddUsuario);
router.post("/Create", adminController.PostAddUsuario);

router.get("/Login",adminController.GetLogin);
router.post("/Login", adminController.PostLogin);

router.get("/RestorePass",adminController.GetRestorePass);
router.post("/RestorePass", adminController.PostRestorePass);
router.post("/Verify",adminController.PostVerify);

router.post("/NewPass",adminController.PostNewPass);

router.post("/Logout",adminController.PostLogout);



module.exports = router;
const express = require("express");
const webController = require("../controllers/webController");
const router = express.Router();

router.get("/login", webController.loginPage);
router.get("/signup", webController.signupPage);
router.get('/dashboard', webController.homePage);
router.get('/profile/:id', webController.profilePage);

module.exports = router;

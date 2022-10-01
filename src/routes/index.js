const express = require("express");

const signupRouter = require('./signup');
const loginRouter = require('./login');
const userRouter = require('./users');
const webRouter = require('./web');

const router = express.Router();

router.use(signupRouter);
router.use(loginRouter);
router.use(userRouter);
router.use(webRouter);

module.exports = router;
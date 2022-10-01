const express = require("express");
const bcrypt = require('bcryptjs');
const status = require('http-status');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const { body, validationResult } = require("express-validator");

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET_KEY;

const router = express.Router();

router.post("/login", [
    body("email", "The email is required!")
        .notEmpty()
        .escape()
        .trim(),
    body("password", "The password is required!")
        .notEmpty()
        .trim(),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(status.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    const { email, password } = req.body;

    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (!userWithEmail)
        return res
            .status(status.BAD_REQUEST)
            .json({ errorMessage: "Email or password does not match!" });

    const checkPass = await bcrypt.compare(password, userWithEmail.password);

    if (!checkPass)
        return res
            .status(status.BAD_REQUEST)
            .json({ errorMessage: "Email or password does not match!" });

    const token = jwt.sign(
        { id: userWithEmail.id, email: userWithEmail.email },
        jwtOptions.secretOrKey);
    res.json({ token: token });
});

module.exports = router;

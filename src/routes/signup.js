const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const status = require('http-status');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
let jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_SECRET_KEY;

const router = express.Router();

router.post("/signup", [
    body("name", "The name is required!")
        .notEmpty(),
    body("email", "The email is invalid!")
        .escape()
        .trim()
        .isEmail(),
    body("password", "The Password must be of minimum 6 characters length")
        .trim()
        .isLength({ min: 6 }),
],async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(status.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    let { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res
            .status(status.BAD_REQUEST)
            .json({ errorMessage: "Name, email and password is required!" });
    }

    const existingUser = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (existingUser) {
        return res.status(status.BAD_REQUEST).json({ errorMessage: "User already exists!" });
    }

    // encrypt password
    password = await bcrypt.hash(password, 16);
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save().catch((err) => {
        res.status(status.INTERNAL_SERVER_ERROR).json({ errorMessage: "Something went wrong that registration unsuccessful!" });
    });

    if (savedUser) {
        const token = jwt.sign(
            { id: savedUser.id, email: savedUser.email },
            jwtOptions.secretOrKey);
        res.status(status.CREATED).json({ token: token });
    }
});

module.exports = router;

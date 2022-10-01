const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const dbConnection = require("../database/connection");

// Home
exports.homePage = async (req, res, next) => {
    // const [row] = await dbConnection.execute("SELECT * FROM `users` WHERE `id`=?", [req.session.userID]);

    // if (row.length !== 1) {
    //     return res.redirect('/logout');
    // }

    res.render('home');
}

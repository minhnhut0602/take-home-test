const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

require("dotenv").config();
const auth = require("./auth/auth.js")();
require("./models/user");

const routes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());

// config view engine
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', './main');
app.set('view engine', 'ejs');

// initialize passport with express
app.use(auth.initialize());

// routes
app.use(routes);
app.use((req, res, next) => {
    if (req.url === '/') {
        res.redirect('/dashboard');
        return;
    }
    next();
})

module.exports = app;
const express = require("express");
const auth = require('../auth/auth')();
const status = require('http-status');
const User = require("../models/user");

const router = express.Router();

router.get('/users',
    auth.authenticate(),
    async (req, res) => {
        const data = await User.findAll().catch(
            (err) => {
                console.log("Error: ", err);
            }
        );

        let users = [];
        if (data && data.length > 0) {
            users = data.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        }

        res.json({ users: users});
    }
);

router.get('/users/:id',
    auth.authenticate(),
    async (req, res) => {
        const data = await User.findOne({ where: { id: req.params.id } }).catch(
            (err) => {
                console.log("Error: ", err);
            }
        );

        if (!data) {
            return res
                .status(status.NOT_FOUND)
                .json({ errorMessage: "User is not found!" });
        }

        const user = {
            id: data.id,
            name: data.name,
            email: data.email
        }
        res.json({ user: user });
    }
);


router.delete('/users/:id',
    auth.authenticate(),
    async (req, res) => {
        const data = await User.destroy({ where: { id: req.params.id } }).catch(
            (err) => {
                console.log("Error: ", err);
            }
        );

        if (data === 1) {
            res.status(status.OK).send('user deleted');
        } else {
            res.status(status.NOT_FOUND).send('User is not found!');
        }
    })

module.exports = router;
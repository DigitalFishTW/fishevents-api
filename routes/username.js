"use strict";
const express = require("express");
const router = express.Router({caseSensitive: true});
const Session = require("../models/session");

router.get('/', function(req, res) {
    Session
        .findOne({
            token: req.query.token
        })
        .then(function(session) {
            res.status(200).json({ username: session.username });
        })
        .catch(function(err) {
            res.status(500).json({ err: err.toString() });
        });
});

module.exports = router;
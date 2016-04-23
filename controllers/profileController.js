"use strict";
const Profile = require("../models/profile");

exports.put = function(req, res) {
    Profile.create({
        name: req.body.name,
        email: req.body.email,
        zip: req.body.zip,
        address: req.body.address,
        city: req.body.city,
        states: req.body.states,
        country_code: req.body.country_code,
        birth: req.body.birth,
        gender: req.body.gender,
        bio: req.body.bio,
        phone: req.body.phone,
        licenses: req.body.licenses
    },
    function(err, profile) {
        if(err) {
            res.status(500).json({ err: err.toString() });
        } else {
            res.status(200).json({});
        }
    });
};

exports.get = function(req, res) {
    
};
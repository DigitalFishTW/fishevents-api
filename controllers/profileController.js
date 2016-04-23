"use strict";
const Profile = require("../models/profile");
const Account = require("../models/account");
const Session = require("../models/session");
const jsonpatch = require("json-patch") 

exports.put = function(req, res) {
    Session
        .findOne({
            token: req.query.token
        })
        .then(function(session) {
            return Account
                .findOne({
                    username: session.username
                });
        })
        .then(function(account) {
            if(account.profile) {
                let err = new Error("profile_exist");
                err.status = "profile_exist";
                throw err;
            } else {
                return;
            }
        })
        .then(function() {
            const profile = Profile.create({
                name: req.body.name,
                type: req.body.type,
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
            });
            profile
                .then(function(profile) {
                    return [Session
                        .findOne({
                            token: req.query.token
                        }), profile];
                        
                })
                .spread(function(session, profile) {
                    console.log(profile);
                    return Account
                        .update({
                            username: session.username
                        },
                        {
                            $set: {
                                profile: profile._id
                            }
                        })
                        .exec();
                })
                .then(function() {
                    res.status(201).json({});
                })
                .catch(function(err) {
                    if(err) {
                        res.status(500).json({ err: err.toString() });
                    }
                });
        })
        .catch(function(err) {
            if(err) {
                res.status(500).json({ err: err.toString() });
            }
        });
};

exports.getMy = function(req, res) {
    Session
        .findOne({
            token: req.query.token
        })
        .then(function(session) {
            return Profile
                .findOne({
                    username: session.username
                });
        })
        .then(function(profile) {
            res.status(200).json(profile);
        })
        .catch(function(err) {
            res.status(500).json({ err: err.toString() });
        });
};

exports.patch = function (req, res, next) {
    if (!req.body || 'object' !== typeof req.body) {
        res.status(400).json({error: 'bad format'})
    }
    var dataObj = null, _id = null, docTemp, patched;
    
    Profile.findById(req.params.id)
    .then(function (doc) {
        if (!doc) {
            var error = new Error();
            error.type = "not_found"
            throw error
        }
        docTemp = doc.toObject();
        
        var temp = {};
        
        Object.keys(docTemp).forEach(function (field) {
            temp[field] = docTemp[field];
        });
        return jsonpatch.apply(temp, req.body);
    })
    .then(function (patchedTrack) {
        patched = patchedTrack;
        dataObj = {
            meta: {}
        }
        var i;
        _id = patchedTrack._id;
        delete patchedTrack._id;
        
        for (i in patchedTrack) {
            dataObj[i] = patchedTrack[i];
        }
        return Profile.update({_id: _id}, dataObj).exec();
    })
    .then(function (doc) {
        return res.json(patched);
    })
    .catch(function (error) {
        if (error.rtpe === "not_found") {
            return res.status('404').json({error: error.stack ? error.stack: error.toString()});
        }
        
        return res.status('500').json({error: error.stack ? error.stack: error.toString()});
    })
}

exports.getAll = function(req, res, next) {
    var query = Profile.find({})
    
    query.sort({_id: 1});
    
    if (!isNaN(Number(req.query.offset))) {
        query.skip(Number(req.query.offset))
    }
    
    if (!isNaN(Number(req.query.limit))) {
        query.limit(Number(req.query.limit))
    } else {
        query.limit(25);
    }
    
    
    query.then(function (docs) {
        var results = docs.map(function (doc) {
            return doc.toObject();
        })
        res.json(results)
    })
    .catch(function (error) {
        return res.status('500').json({error: error.stack ? error.stack: error.toString()});
    })
};
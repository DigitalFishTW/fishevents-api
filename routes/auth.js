const express = require("express");
const config = require("../config");

var router = express.Router({caseSensitive: true});
var Account = require("../models/account");
var Session = require("../models/session");

router.put('/', function (req, res, next) {
    if (!req.body || 'object' !== typeof req.body) {
        return res.status('400').json({error: "invalid request"});
    }
    if (!req.body.username || !req.body.password) {
        return res.status('400').json({error: "missing field"});
    }
    Account.findOne({username: req.body.username})
    .then(function (doc) {
        var error;
        if (doc) {
            error = new Error('account exist');
            error.type = "account_exist";
            throw error;
        }
    })
    .then(function () {
        var account = new Account({
            username: req.body.username
        });
        account.setPassword(req.body.password);
        return account.save();
    })
    .then(function () {
        return res.status('201').json({});
    })
    .catch(function (err) {
        if (err.type === 'account_exist') {
            return res.status('226').json({error: err.toString()});
        }
        return res.status('500').json({error: err.toString()});
    })
})
router.get('/', function (req, res, next) {
    if (!req.query || 'object' !== typeof req.query) {
        console.log(req.query);
        return res.status('400').json({error: "invalid request"});
    }
    if (!req.query.username || !req.query.password) {
        return res.status('400').json({error: "missing field"});
    }
    config.passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status('500').json({error: err.toString()});
        }
        if (info || !user) { 
            return res.status('404').json({error: info ? info.message : 'user not found'});
        }
        var session = new Session({
            username: user.username,
            token: Math.random() + ''
        });
        session.save()
        .then(function (doc) {
            res.json({
                token: doc.token
            })
        })
        .catch(function (err) {
            return res.status('500').json({error: err.toString()});
        })
      })(req, res, next);
})
module.exports = router;
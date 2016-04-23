"use strict";
const express = require("express");
const router = express.Router({caseSensitive: true});

var setting = {
    'vessel': require("../models/vessel"),
    'catch': require("../models/catch"),
    'track': require("../models/track"),
    'permit' : require("../models/permit")
}

router.post('/:name', function (req, res, next) {
    if (!setting[req.params.name]) {
        return res.status(404).json({err: 'api not found'})
    }
    if (!req.body || 'object' !== typeof req.body) {
        return res.status(400).json({err: 'bad request'})
    }
    
    setting[req.params.name].find(req.body)
    .then(function (result) {
        return result.map(function (doc) {
            var temp = {};
            doc = doc.toObject();
            Object.keys(doc).forEach(function (field) {
                temp[field] = doc[field];
            });
            var meta = doc.meta;
            Object.keys(meta || {}).forEach(function (field) {
                temp[field] = meta[field];
            });
            if (doc.mata === temp.meta) {
                delete temp.meta
            }
            return temp;
        })
    })
    .then(function (docs) {
        return res.json(docs)
    })
    .catch(function (err) {
        return res.status(500).json({err: err.toString()})
    })
})

module.exports = router;
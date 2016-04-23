const express = require("express");
const config = require("../config");
const jsonpatch = require("json-patch");
const Catch = require("../models/catch");

var router = express.Router({caseSensitive: true});

var mustHave = [
    "total",
    "selling",,
    "permit",
    "species"
]
    
router.put('/', function (req, res, next) {
    if (!req.body || 'object' !== typeof req.body) {
        res.status(400).json({error: 'bad format'})
    }
    if (!mustHave.reduce(function (all, curr) {
        if (null == req.body[curr]) {
            return false;
        }
        return true;
    }, true)) {
        res.status(400).json({error: 'missing field'});
    }
    var dataObj = {
        meta: {}
    }
    var i;
    for (i in req.body) {
        if (0 <= mustHave.indexOf(i)) {
            dataObj[i] = req.body[i];
        } else {
            dataObj.meta[i] = req.body[i];
        }
    }
    var catchData = new Catch(dataObj);
    catchData.save()
    .then(function (doc) {
        return res.json(doc);
    })
    .catch(function (error) {
        return res.status('500').json({error: error.toString()});
    })
})

router.get('/:id', function (req, res, next) {
    Catch.findById(req.params.id)
    .then(function (doc) {
        if (!doc) {
            return res.status(404).json({error: 'doc not found'});
        }
        doc = doc.toObject()
        var temp = {};
        Object.keys(doc).forEach(function (field) {
            if (0 <= mustHave.indexOf(field)) {
                temp[field] = doc[field];
            }
        });
        Object.keys(doc.meta || {}).forEach(function (field) {
            temp[field] = doc.meta[field];
        });
        return res.json(temp);
        // return res.json(doc);
    })
    .catch(function (error) {
        return res.status('500').json({error: error.toString()});
    })
});

router.patch('/:id', function (req, res, next) {
    if (!req.body || 'object' !== typeof req.body) {
        res.status(400).json({error: 'bad format'})
    }
    var dataObj = null, _id = null, docTemp, patched;
    
    Catch.findById(req.params.id)
    .then(function (doc) {
        if (!doc) {
            var error = new Error();
            error.type = "not_found"
            throw error
        }
        docTemp = doc.toObject();
        var temp = {};
        Object.keys(docTemp).forEach(function (field) {
            if (0 <= mustHave.concat(["_id"]).indexOf(field)) {
                temp[field] = docTemp[field];
            }
        });
        Object.keys(docTemp.meta || {}).forEach(function (field) {
            temp[field] = docTemp.meta[field];
        });
        
        console.log(temp)
        return jsonpatch.apply(temp, req.body);
    })
    .then(function (patchedCatch) {
        patched = patchedCatch;
        dataObj = {
            meta: {}
        }
        var i;
        _id = patchedCatch._id;
        delete patchedCatch._id;
        
        for (i in patchedCatch) {
            if (0 <= mustHave.indexOf(i)) {
                dataObj[i] = patchedCatch[i];
            } else {
                dataObj.meta[i] = patchedCatch[i];
            }
        }
        return Catch.update({_id: _id}, dataObj).exec();
    })
    .then(function (doc) {
        return res.json(patched);
    })
    .catch(function (error) {
        if (error.rtpe === "not_found") {
            return res.status('500').json({error: error.stack ? error.stack: error.toString()});
        }
        
        return res.status('500').json({error: error.stack ? error.stack: error.toString()});
    })
});

router["delete"]('/:id', function (req, res, next) {
    if (!req.body || 'object' !== typeof req.body) {
        res.status(400).json({error: 'bad format'})
    }
    Catch.findById(req.params.id)
    .then(function (doc) {
        if (!doc){
            var error = new Error();
            error.type = "not_found"
            throw error
        }
        return doc.remove();
    })
    .then(function () {
        return res.json({});
    })
    .catch(function(error) {
        if (error.rtpe === "not_found") {
            return res.status('500').json({error: error.stack ? error.stack: error.toString()});
        }
        
        return res.status('500').json({error: error.stack ? error.stack: error.toString()});
    })
})

router.get('/', function(req, res, next) {
    // .skip(20).limit(10)
    
    var query = Catch.find({})
    
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
            var docTemp = doc.toObject();
            var temp = {};
            Object.keys(docTemp).forEach(function (field) {
                if (0 <= mustHave.concat(["_id"]).indexOf(field)) {
                    temp[field] = docTemp[field];
                }
            });
            Object.keys(docTemp.meta || {}).forEach(function (field) {
                temp[field] = docTemp.meta[field];
            });
            return temp;
        })
        res.json(results)
    })
    .catch(function (error) {
        return res.status('500').json({error: error.stack ? error.stack: error.toString()});
    })
})
module.exports = router;
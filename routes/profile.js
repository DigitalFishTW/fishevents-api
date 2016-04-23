"use strict";
const express = require("express");
const router = express.Router({caseSensitive: true});

const profileController = require("../controllers/profileController");

router.put('/', profileController.put);
router.get('/my', profileController.getMy);
router.patch('/', profileController.patch);

module.exports = router;
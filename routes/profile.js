"use strict";
const express = require("express");
const router = express.Router({caseSensitive: true});

const profileController = require("../controllers/profileController");

router.put('/', profileController.put);
router.get('/', profileController.get);

module.exports = router;
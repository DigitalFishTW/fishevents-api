"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fishSchema = new Schema({
    sn: String,
    name: [String],
    chars: [String],
    intro: String
});

const Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;
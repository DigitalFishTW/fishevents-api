"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var catchSchema = Schema({
    total: {
        weight: Number,
        counts: Number
    },
    selling: Boolean,
    permit: {
        type: Schema.Types.ObjectId,
        ref: "Permit"
    },
    species: {
        profile: {
            type: Schema.Types.ObjectId,
            ref: "Fish",
        },
        weight: Number,
        sold: Number,
        pricing: Number
    }
});

var Catch = mongoose.model('Catch', catchSchema);

module.exports = Catch;
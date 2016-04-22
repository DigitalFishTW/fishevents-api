var mongoose = require("mongoose");
var trackSchema = mongoose.Schema({
    boat: mongoose.Schema.Types.ObjectId,
    path: [{
        lat: Number,
        long: Number
    }],
    "catchs": [
        mongoose.Schema.Types.ObjectId
    ],
    start_at: Date,
    end_at: Date
});
var Track = mongoose.model('Track', trackSchema);
module.exports = Track;
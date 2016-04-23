var mongoose = require("mongoose");
var trackSchema = mongoose.Schema({
    boat: mongoose.Schema.Types.ObjectId,
    path: [{
        time: Date,
        lat: Number,
        long: Number,
        speed: Number
    }],
    catches: [
        mongoose.Schema.Types.ObjectId
    ],
    start_at: Date,
    end_at: Date
});
var Track = mongoose.model('Track', trackSchema);
module.exports = Track;
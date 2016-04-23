var mongoose = require("mongoose");
var vesselSchema = mongoose.Schema({
    create_time: Date,
    last_edit: Date,
    name: String,
    imo: String,
    mmsi: String,
    identify: String,
    gears: [String],
    chars: [String],
    radio: String,
    flag: String,
    ais_type: String,
    gross_tonnage: Number,
    deadweight: Number,
    length: Number,
    breadth: Number,
    year: Number,
    status: String,
    home_port: String,
    licenses: [mongoose.Schema.Types.ObjectId]
});
var Vessel = mongoose.model('Vessel', vesselSchema);
module.exports = Vessel;
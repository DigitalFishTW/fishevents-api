var mongoose = require("mongoose");
var permitSchema = mongoose.Schema({
    type: String,
    country_code: String,
    state: String,
    id: String,
    meta: {}
});
var Permit = mongoose.model('Permit', permitSchema);
module.exports = Permit;
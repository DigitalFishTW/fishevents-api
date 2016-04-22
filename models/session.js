var mongoose = require("mongoose");
var sessionSchema = mongoose.Schema({
    token: String,
    user: String
});
var Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
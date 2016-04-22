var mongoose = require("mongoose");
var accountSchema = mongoose.Schema({
    email: String,
    hashed_passowrd: String
});
var Account = mongoose.model('Account', accountSchema);
module.exports = Account;
var mongoose = require("mongoose");
var crypto = require("crypto");
var salt = require("../config").salt;


var accountSchema = mongoose.Schema({
    username: String,
    hashed_password: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }
});

accountSchema.methods.validPassword = function (password) {
    return crypto.pbkdf2Sync(password, salt, 4096, 512, 'sha512').toString('hex') === this.hashed_password;
}

accountSchema.methods.setPassword = function (password) {
    this.hashed_password = crypto.pbkdf2Sync(password, salt, 4096, 512, 'sha512').toString('hex');
}

var Account = mongoose.model('Account', accountSchema);
module.exports = Account;
var mongoose = require("mongoose");
var profileSchema = mongoose.Schema({
    type: String,
    name: {
        first: String,
        middle: String,
        last: String
    },
    email: String,
    zip: String,
    address: String,
    city: String,
    states: String,
    country_code: String,
    birth: Date,
    gender: String,
    bio: String,
    phones: [{
        title: String,
        phone: String
    }],
    licenses: [mongoose.Schema.Types.ObjectId]
});
var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
var mongoose = require("mongoose");
var profileSchema = mongoose.Schema({
    create_time: Date,
    last_edit: Date,
    first_name: String,
    middle_name: String,
    last_name: String,
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
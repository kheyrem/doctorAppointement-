const mongoose = require('mongoose');

const user_schema = mongoose.Schema({
    name:{type: String},
    phone:{type: Number},
    user_name:{type:String},
    password:{type: String}

})

var users = mongoose.model("user", user_schema);
module.exports = users;
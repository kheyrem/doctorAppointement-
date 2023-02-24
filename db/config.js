const mongoose = require('mongoose');

const connectdb = async () => {
    mongoose.connect("mongodb+srv://admin:admin123@cluster0.80odahm.mongodb.net/appointment_db?retryWrites=true&w=majority", (err) => {
    if(!err) console.log('connected to the database');
    console.log(err);
})
}

module.exports  = connectdb;
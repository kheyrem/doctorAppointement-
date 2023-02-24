var mongoose =require('mongoose')

var doct_schema=mongoose.Schema({
    name:String,
    phone: String,
    email: String,
    department_id:{type:mongoose.Types.ObjectId}
})
var  doctor = mongoose.model('doctor',doct_schema)
module.exports = doctor
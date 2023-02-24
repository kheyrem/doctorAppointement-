var mongoose =require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
var b_schema=mongoose.Schema({
    sqn : Number,
    patient_name: String,
    patient_phone: String,
    issue: String,
    doctor_id:{type:mongoose.Types.ObjectId},
    booking_Date:{type:Date,default:Date.now},
    
})

b_schema.plugin(AutoIncrement, {
    id: "booking",
    inc_field: "sqn",
    start_seq: 1,
});
b_schema.index({
  create_at: 1
}, {
  background: true
});
var  booking =mongoose.model('booking',b_schema)


module.exports =booking
 const express = require('express');
const users = require('../model/users');
const depts = require('../model/departement');
var Doctor= require('../model/doctor')
var Booking= require('../model/booking')

const app = express();

// get home page
app.get('/', (req, res) => {
    //console.log("reurn home");
   
    res.render('home', {
        data: []
    });
})

// get uers

app.get('/users', (req, res) => {
    console.log(`user data ${users}`)
    users.find({},(err, users)=>{
        if(!err){
            res.render('users', {
                data: users
            });
        }
        else{
            console.log(err);
        }
    })
    
    
})

 //save user
app.post('/save_user',(req,res)=>{
    console.log(req.body)
    var user_data= new users({
        name:req.body.name,
        phone:req.body.phone,
        user_name:req.body.user_name,
        password:req.body.password
    })
    user_data.save().then((d)=>{
        res.redirect('/users')
    })
})

 //edit user
app.post('/edit_user',(req,res)=>{ 
    var  data = { 
        name:req.body._name, 
        phone:req.body._phone, 
        user_name:req.body._user_name, 
    } 
     users.findOneAndUpdate({_id:req.body._id},data) .then((d)=>{
        res.redirect('users')
    })
  
})


 



//Department
app.get('/departments',(req,res)=>{
    depts.find({}).then((depts)=>{
    res.render('department',{
        data:depts
    })
})
})
app.post('/save_dept',(req,res)=>{
     var dept= new depts({
        name:req.body.name,
        desc:req.body.desc,
       
    })
    dept.save().then((d)=>{
        res.redirect('departments')
    })
})



/// Doctor
app.get('/doctors',(req,res)=>{ 
    Doctor.find({}).aggregate([

        {
            $lookup:{ 
            from:"departments",
            localField:"department_id",
             foreignField:"_id",
              as:"detparment"
            }
        },
        { $unwind: "$detparment" },
        
        {
        $group:{
        _id:"$detparment._id",
        name:{
            $last:"$detparment.name"
        },
        count:{
        $sum:1
        },
        details:{
            $push:{
            doctor:"$name"
            }
        
        }
        
        }
        }
        
        ])
})

//save doctors
app.post('/save_doctor',(req,res)=>{ 
    var doctor_data= new Doctor({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        department_id:req.body.department_id
    })
    doctor_data.save().then((d)=>{
        res.redirect('doctors')
    })
})




// get booking

app.get('/booking',(req,res)=>{ 
    Booking.aggregate([
        {
            $lookup:{
                from:"doctors",
                localField:"doctor_id",
                foreignField:"_id",
                as: "doctor"
            },
        },
            { $unwind: "$doctor" },
        
    ]).then((b)=>{
    Doctor.find({}).then((doct)=>{
        res.render('booking',{
            data:b,
            doct:doct,
            moment:moment
        } ) 
    }) 
}) 
})


//Department
app.get('/departments',(req,res)=>{
    depts.find({}).then((depts)=>{
    res.render('department',{
        data:depts
    })
})
})
app.post('/save_dept',(req,res)=>{
     var dept= new Department({
        name:req.body.name,
        desc:req.body.desc,
       
    })
    dept.save().then((d)=>{
        res.redirect('departments')
    })
})



// get login 

app.get('/login', (req, res) => {
    res.render('login', {
        data: []
    });
})


app.post('/check_login', (req, res) => {
    users.findOne({user_name: req.body.user_name, password: req.body.password})
    .then((user) => {
        if(user){
            res.redirect('/')
        }
        else{
            res.redirect('/login')
        }
    })
})




module.exports = app;
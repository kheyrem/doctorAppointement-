const express = require('express');
const ejs = require('ejs')
const app = express();



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', "html");
app.engine('html', ejs.renderFile);
app.use(express.static('./public'));


// routing 

app.use('/', require('./route/route'));

// require connection 
const connectdb = require('./db/config');
connectdb();



app.listen(9000, (err)=> {
    if(!err) console.log("server is running on port 9000")
})
const express = require('express');
const port = 8001;
const app = express();
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const db = mongoose.connect('mongodb+srv://ysiddhapura6:MCcsIdXQDxBOtWeK@cluster0.2mi8v.mongodb.net/API}')
if(db){
    console.log('db is connecte');
}else{
    console.log('db is not connecte');
}

const jwtStategy = require('./config/passport-jwt');
const passport = require('passport')
const session = require('express-session')

app.use(express.urlencoded());
app.use(session({
    name:'User',
    secret:'jwtSss',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',require('./routes'))
app.listen(port,(err)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log(`Server is running on port ${port}`);
})
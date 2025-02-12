const mongoose = require('mongoose')
const SignupSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
})

const Signup = mongoose.model('Signup', SignupSchema)

module.exports = Signup 
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/API')

const db = mongoose.connection

db.once('open',(err)=>{
    if(err) return console.error(err)
    console.log('Connected to MongoDB')
})
module.exports = db
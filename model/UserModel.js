const mongoose = require('mongoose')
const multer = require('multer')
const ImagePath = '/uploads'
const path = require('path')

const UserSchema = mongoose.Schema({
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
    },
    image:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const imageStore = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null , path.join(__dirname,'..',ImagePath))
    },

    filename:(req,file,cb) => {
        cb(null , file.fieldname+'-'+Date.now())
    }
})

UserSchema.statics.uploadImage = multer({storage:imageStore}).single('image')
UserSchema.statics.imgPath = ImagePath
const User = mongoose.model('User', UserSchema)

module.exports = User 
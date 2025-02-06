const passport = require('passport')
const jwtStategy = require('passport-jwt').Strategy

const Ejwt = require('passport-jwt').ExtractJwt

const opts = {
    jwtFromRequest : Ejwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "user"
}

const Signup = require('../model/Signup')

passport.use(new jwtStategy (opts , async function(payload , done){

    console.log("data")
    let Data = await Signup.findOne({email : payload.user.email})
    if(Data){
        return done(null , Data)
    }else {
        return done(null , false)
    }
}))


passport.serializeUser(function (user , done){
    done (null , user.id)
})

passport.deserializeUser( async function (id , done ){
    let UserData = await Signup.findById(id)
    if(UserData){
        done(null , UserData)
    }else{
        done(null , false)
    }
})

module.exports = passport
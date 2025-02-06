const express = require('express')
const Route = express.Router();
const AuthCtl = require('../controllers/AuthCtl')


Route.post('/register' , AuthCtl.RegisterUser)
Route.post('/login' , AuthCtl.Login)

module.exports = Route
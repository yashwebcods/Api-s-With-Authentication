const express = require('express');
const Routes = express.Router();
const UserCtl = require('../controllers/UserCtl');
const passport = require('passport');
const UserModel = require('../model/UserModel')

Routes.get('/', passport.authenticate('jwt',{failureRedirect:'/unAuth'}) , UserCtl.home)
Routes.get('/unAuth' , (req,res) => {
    return res.status(501).json({mas:'Your not Authecated'})
})
Routes.post('/create', UserModel.uploadImage ,UserCtl.AddData)
Routes.delete('/deleteUser/:id',UserCtl.deleteData)
Routes.get('/getUpdateData/:id', UserCtl.GetUpdateData)
Routes.patch('/updateUser/:id' , UserModel.uploadImage ,  UserCtl.UpdateUser)
Routes.use('/auth' , require('./Auth'))
Routes.get('/changeStatus' , UserCtl.UpdateSattus)
module.exports = Routes;
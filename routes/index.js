const express = require('express');
const Routes = express.Router();
const UserCtl = require('../controllers/UserCtl');
const passport = require('passport');

Routes.get('/', passport.authenticate('jwt',{failureRedirect:'/unAuth'}) , UserCtl.home)
Routes.get('/unAuth' , (req,res) => {
    return res.status(501).json({mas:'Your not Authecated'})
})
Routes.post('/create',UserCtl.AddData)
Routes.delete('/deleteUser/:id',UserCtl.deleteData)
Routes.get('/getUpdateData/:id', UserCtl.GetUpdateData)
Routes.patch('/updateUser/:id' , UserCtl.UpdateUser)
Routes.use('/auth' , require('./Auth'))
module.exports = Routes;
const { log } = require('console')
const UserModel = require('../model/UserModel')

module.exports.home = async (req,res) =>{
    try{
        const UserData = await UserModel.find()
        return res.status(200).json({msg:'HEllo',data:UserData})
    }
    catch(err){
        return res.status(400).json({msg:'Somthing Wrong',data:err})
        
    }
}
module.exports.AddData = async (req,res)=>{
    try{
        let UserData = await UserModel.create(req.body)
        console.log(UserData)
        if(UserData){
            return res.status(200).json({msg:'Mongo DB Data added successfully',data:UserData})
        }
        else{
            return res.status(200).json({msg:'Failed to add data to MongoDB'})
        }
    }
    catch(err){
        return res.status(400).json({msg:'Somthing Wrong',data:err})
        
    }
}
module.exports.deleteData = async (req,res) =>{
    try{
        let delData = await UserModel.findById(req.params.id)
        if(delData){
            await UserModel.findByIdAndDelete(req.params.id)
            return res.status(200).json({msg:'Data deleted successfully',data:delData})
        }
        else{
            return res.status(200).json({msg:'No data found to delete'})
        }
    }
    catch(err){
        return res.status(400).json({msg:'Somthing Wrong',data:err})
    }
}

module.exports.GetUpdateData = async (req,res) => {
    try{
      let id =  req.params.id
      let UserData = await UserModel.findById(id)
      if(UserData){
        return res.status(200).json({msg:'User Data Here',data:UserData})
      }else{
        return res.status(200).json({msg:'User Data Not found'})
      }
    }catch(err){
        return res.status(400).json({msg:'Somthing Wrong',data:err})
    }
}

module.exports.UpdateUser = async (req,res) => {
    try{
        let id =  req.params.id
         
        let updatedUser = await UserModel.findByIdAndUpdate(id,req.body)
        if(updatedUser){
              let nweData = await UserModel.findById(id)
              return res.status(200).json({msg:'User New Data Here',data:nweData})
        }else{
            return res.status(200).json({msg:'User not found'})       
        }
    }catch{
        return res.status(400).json({msg:'Somthing Wrong',data:err})
    }
}
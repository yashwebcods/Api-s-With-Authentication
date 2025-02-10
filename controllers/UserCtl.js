const UserModel = require('../model/UserModel')
const path = require('path')
const fs = require('fs')

module.exports.home = async (req, res) => {
    try {
        console.log(req.query);
        let search = '';
        let PerPage = 1;
        let page = 0
       
        if (req.query.page) {
            page = req.query.page
        }

        if (req.query.search) {
            search = req.query.search
        }
        const UserData = await UserModel.find({
            $or:[
                {'username':{$regex:search}}
            ]
        }).skip(PerPage * page).limit(PerPage)

        const total = await UserModel.find({
            $or:[
                {'username':{$regex:search}}
            ]
        }).countDocuments() 
        console.log(Math.ceil(total/PerPage));
        
        return res.status(200).json({ msg: 'HEllo', data: UserData })
    }
    catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })

    }
}
module.exports.AddData = async (req, res) => {
    try {


        req.body.image = UserModel.imgPath + '/' + req.file.filename

        let UserData = await UserModel.create(req.body)

        if (UserData) {
            return res.status(200).json({ msg: 'Mongo DB Data added successfully', data: UserData })
        }
        else {
            return res.status(200).json({ msg: 'Failed to add data to MongoDB' })
        }
    }
    catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })
    }
}

module.exports.deleteData = async (req, res) => {
    try {
        let delData = await UserModel.findById(req.params.id)
        console.log(delData);

        if (delData) {
            try {
                let deleteImage = path.join(__dirname, '..', delData.image)
                fs.unlinkSync(deleteImage)
            } catch (err) {
                console.log('image not found');
            }
            let DeleteRcord = await UserModel.findByIdAndDelete(req.params.id)
        }
        else {
            return res.status(200).json({ msg: 'No data found to delete' })
        }
    }
    catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })
    }
}

module.exports.GetUpdateData = async (req, res) => {
    try {
        let id = req.params.id
        let UserData = await UserModel.findById(id)
        if (UserData) {
            return res.status(200).json({ msg: 'User Data Here', data: UserData })
        } else {
            return res.status(200).json({ msg: 'User Data Not found' })
        }
    } catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })
    }
}

module.exports.UpdateUser = async (req, res) => {
    try {
        let id = req.params.id
        console.log(id);

        let updatedUser = await UserModel.findById(id)
        console.log(updatedUser);


        if (req.file) {
            try {
                let oldImage = path.join(__dirname, '..', updatedUser.image)
                fs.unlinkSync(oldImage)
            } catch (err) {
                console.log(err);
            }

            req.body.image = UserModel.imgPath + '/' + req.file.filename

        } else {
            req.body.image = updatedUser.image
        }
        let isUpdated = await UserModel.findByIdAndUpdate(id, req.body)
        console.log(isUpdated);

        if (isUpdated) {
            let nweData = await UserModel.findById(id)
            return res.status(200).json({ msg: 'User New Data Here', data: nweData })
        } else {
            return res.status(200).json({ msg: 'User not found' })
        }

    } catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })
    }
}

module.exports.UpdateSattus = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.query.userId)
        let status = req.query.userStatus
        if (userData) {
            console.log('hi');
            if (status == "false") {
                userData.status = false
            } else {
                userData.status = true
            }
            let isUpdated = await UserModel.findByIdAndUpdate(req.query.userId, userData)
            if (isUpdated) {
                return res.status(200).json({ mes: "Status Updated" })
            } else {
                return res.status(200).json({ mes: "Status Not Updated" })
            }
        } else {
            return res.status(200).json({ mes: "Record Not Found" })
        }
    } catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })
    }
}
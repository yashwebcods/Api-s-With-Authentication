const Register = require('../model/Signup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports.RegisterUser = async (req, res) => {
    try {

        console.log(req.body);

        let isUser = await Register.find({ email: req.body.email }).countDocuments();
        if (isUser == 0) {
            if (req.body.password == req.body.confirmPassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10)

                const RegisterData = await Register.create(req.body)
                if (RegisterData) {
                    return res.status(200).json({ msg: 'User added', data: RegisterData })

                } else {
                    return res.status(200).json({ msg: 'User Not Add' })

                }
            } else {
                return res.status(200).json({ msg: 'password are not match' })
            }
        } else {
            return res.status(200).json({ msg: 'user alredy exist' })
        }

    } catch (err) {
        return res.status(400).json({ msg: 'something went wrong' })
    }
}


module.exports.Login = async (req, res) => {
    try {
        
        let isUser = await Register.findOne({ email: req.body.email })
        if (isUser) {
            let isRight = await bcrypt.compare(req.body.password, isUser.password)

            console.log(isRight);

            if (isRight) {
                let token = await jwt.sign({ user: isUser }, 'user')
                return res.status(200).json({ mas: 'User Login Success', data: token })
            } else {

                return res.status(200).json({ msg: 'Invalid Password' })
            }
        } else {
            return res.status(200).json({ msg: 'Invalid Email' })

        }
    } catch (err) {
        return res.status(400).json({ msg: 'something went wrong' })

    }
}
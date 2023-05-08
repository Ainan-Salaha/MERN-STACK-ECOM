const uSers = require('../models/user')
let bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Signup = async (req, res) => {
    try {
        let { name, email, password } = req.body
        if (!name) {
            return res.status(500).send({
                success: false,
                message: "Name is Required"
            })
        }
        if (!email) {
            return res.status(500).send({
                success: false,
                message: "Email is Required"
            })
        }
        const exisitingUser = await uSers.findOne({ email })
        if (exisitingUser) {
            return res.status(500).send({
                success: false,
                message: "Already Register Please Login"
            })
        }

        let hashpassword = await bcrypt.hash(password, 10)
        let users = await uSers.insertMany({ name: name, email: email, password: hashpassword })
        return res.status(200).send({
            success: true,
            message: "User Register Successfully",
            users,
        })

    } catch (error) {
        console.log(`UserController__Signup  ->  ${error}`)
        return res.status(500).json({
            success: false,
            message: "Error in Resgisteration"
        })
    }
}

const Login = async (req, res) => {
    try {
        let { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })

        }

        //check user
        let user = await uSers.findOne({ email: email })
        console.log(user)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not register"
            })
        }
        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Invalid Password"
            })
        }
        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token,
        })

    } catch (error) {
        console.log(`UserController__Login  ->  ${error}`)
        return res.status(500).json({ "message": error })
    }
}

module.exports = { Signup, Login }

const bcrypt = require("bcryptjs")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { password, email } = req.body

        const result = await User.findOne({ email })

        if (result) {
            return res.status(401).json({ message: "email already exist" })
        }

        //                                       👇 for create strong password
        const hash = await bcrypt.hash(password, 10)

        await User.create({ ...req.body, password: hash })

        res.json({ message: "register success" })

    } catch (error) {
        res.status(404).json({ message: "something went wrong" })
    }
}


exports.login = async (req, res) => {
    try {

        const { email, password } = req.body
        // step 1 :  check for emaill if not match throw error
        const result = await User.findOne({ email })

        if (!result) {
            return res.status(401).json({ message: "invalid emaill" })
        }

        // step 2 :  check for password if not match throw error
        const verify = await bcrypt.compare(password, result.password)

        if (!verify) {
            res.status(401).json({ message: "invalid password" })
        }

        // kon login zala
        const token = jwt.sign({ _id: result._id, name: result.name }, "secretpassword")

        // kiti time sathi login rahin 
        res.cookie("kahipn", token, { maxAge: 1000 * 60 * 15 })

        res.json({ message: "login success", result: { name: result.name } })

    } catch (error) {
        res.status(400).json({ message: "something went wrong" })
    }
}


exports.logout = (req, res) => {
    try {
        res.clearCookie("kahipn")
        res.json({ message: "logout success" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong" })
    }
}


exports.getUsers = async (req, res) => {
    try {

        const result = await User.find()
        res.json({ message: "user fetch success", result })

    } catch (error) {

        console.log(error)
        res.status(404).json({ message: "something went wrong" })

    }
}

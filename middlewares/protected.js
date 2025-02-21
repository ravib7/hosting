const jwt = require("jsonwebtoken")

exports.privateRoute = (req, res, next) => {
    if (!req.cookies.kahipn) {
        return res.status(404).json({ message: "no cookie found" })
    }
    //                                                          👇from login controller { _id: result._id, name: result.name }
    jwt.verify(req.cookies.kahipn, "secretpassword", (error, data) => {
        if (error) {
            return res.status(404).json({ message: "jwt error" })
        }
        console.log(data)
        next()
    })
}
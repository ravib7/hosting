exports.log = (req, res, next) => {
    console.log("request recived")
    next()
}
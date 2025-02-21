const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { log } = require("./middlewares/logger")
require("dotenv").config()

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(log)

app.use("/api/auth", require("./routes/auth.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "resource not found" })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("db connected");
    app.listen(process.env.PORT, console.log("server running"))
})
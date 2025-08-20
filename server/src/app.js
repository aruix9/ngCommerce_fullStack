const express = require("express")
const userRoutes = require("./routes/user.routes.js")

const app = express()

// api routes
app.use("/api/v1/users", userRoutes)

module.exports = app
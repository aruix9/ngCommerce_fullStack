const express = require("express")
const mountRoutes = require('./routes')
const cookieParser = require("cookie-parser");

const app = express()

// accept json data from request body and also limit the size of data
app.use(express.json({ limit: '20kb' }))

// cookie parser
app.use(cookieParser());

// api routes
mountRoutes(app)

module.exports = app
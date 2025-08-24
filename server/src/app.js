const express = require("express")
const mountRoutes = require('./routes')
const cookieParser = require("cookie-parser");

const app = express()

// accept json data from request body and also limit the size of data
app.use(express.json({
    limit: "16kb"
}));

// url params encoding
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// cookie parser
app.use(cookieParser());

// api routes
mountRoutes(app)

module.exports = app
const express = require("express")
const mountRoutes = require('./routes')

const app = express()

// api routes
mountRoutes(app)

module.exports = app
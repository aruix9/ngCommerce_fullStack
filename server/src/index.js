const connectDB = require("./db")
const app = require("./app.js")
const dotenv = require("dotenv")

// configure dotenv
dotenv.config({
    path: "./.env"
})

// db setup and server start
connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`\nServer running on port ${(process.env.PORT || 8000)}`)
    })
}).catch(error => {
    console.log(`\nDB connection FAILED!! ${error}`)
})

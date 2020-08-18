const express = require("express")
const bodyparse = require("body-parser")
const moment = require("moment")
const md5 = require("md5")
const crypte = require("cryptr")
const crypt = new crypte("kk3nf535nyk3n4ng059zmoel")
const cors = require("cors")
let mysql = require("mysql")
const app = express()
app.use(cors())
app.use(bodyparse.json())
app.use(bodyparse.urlencoded({ extended: true }))

let port = () => {
    return app.listen(8000, () => {
        console.log("Server run on port 8000")
    })

}

module.exports = { mysql, app, moment, md5, port, crypt }
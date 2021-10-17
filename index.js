const express = require('express')
const app = express()
const consign = require('consign')
const db = require('./config/db')
const port = 3000

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./routers/validation.js')
    .then('./routers')
    .then('./config/routers.js')
    .into(app)

app.listen(port, () => {
    console.log(`App roando em http:localhost:${port}`)
})
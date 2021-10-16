const express = require('express')
const app = express()
const routers = require('./routers/routers')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

routers(app)

app.listen(port, () => {
    console.log(`App roando em http:localhost:${port}`)
})
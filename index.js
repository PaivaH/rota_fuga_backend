const express = require('express')
const app = express()
const routers = require('./routers/routers')
const cors = require('cors')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

routers(app)

app.listen(port, () => {
    console.log(`App roando em http:localhost:${port}`)
})
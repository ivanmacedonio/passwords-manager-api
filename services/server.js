const express = require('express')
const {PORT, app, Sequelize} = require('../config/config')
const session = require('express-session');
//routes
const crud = require("../routes/crud")
const auth = require('../routes/auth')
app.use(express.json())
app.use(session({
    secret: "ivandevfirm",
    resave: false,
    saveUninitialized: false
}))

app.use('/', crud)
app.use('/', auth)


app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`)
})


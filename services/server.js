const express = require('express')
const {PORT, app, Sequelize} = require('../config/config')
const cors = require('cors')
const session = require('express-session');
//routes
const crud = require("../routes/crud")
const auth = require('../routes/auth')
app.use(express.json())

app.use(session({
    secret: "ivandevfirm",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Ajusta esto a true si estás usando HTTPS
        httpOnly: true, // Evita que JavaScript en el cliente acceda a la cookie
        sameSite: 'strict' // Protege contra ataques CSRF
    }
}));
///CORS
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions))

app.use('/', crud)
app.use('/', auth)


app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`)
})


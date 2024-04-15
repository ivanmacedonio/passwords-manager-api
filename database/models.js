const {Sequelize} = require('../config/config')

//db connect
const sequelize = new Sequelize("passwordsdb", "root", "mamageor28", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.sync({force: false}).then(() => {
    console.log("Base de datos sincronizada!")
}).catch((error) => {
    console.log(error)
})

//models
const User = sequelize.define("usuario", {
    username: Sequelize.STRING,
    password: Sequelize.STRING
})

module.exports = {User}
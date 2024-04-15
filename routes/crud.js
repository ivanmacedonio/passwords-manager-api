const express = require('express')
const {PORT, app, Sequelize} = require('../config/config')
const router = express.Router()

//db connection
const sequelize = new Sequelize("passwordsdb", "root", "mamageor28", {
    host: "localhost",
    dialect: "mysql"
});

//auth middleware
function requireAuth(req,res,next){
    if(req.session.authenticated){
        next()
    } else {
        res.status(401).send("Not authenticated")
    }
}

//get all passwords
router.get("/passwords", requireAuth, async(_req,res) => {
    try{
        const passwords = await sequelize.query("SELECT * FROM passwords;")
        res.status(200).json(passwords[0])
    } catch(error){
        res.status(500).send("Intern error")
    }
})

//create a password
router.post("/passwords", requireAuth,  async(req,res) => {
    try{
        const pass = req.body.password
        const noTieneEspacios = !pass.includes(" ");
        const contieneMayusculas = /[A-Z]/.test(pass);
        const contieneNumeros = /\d/.test(pass);
        if(noTieneEspacios === true && contieneMayusculas && contieneNumeros){
            const body = await sequelize.query(`INSERT INTO passwords (password) VALUES ("${pass}")`)
            res.send("Password created!").status(201)
            return
        }
        res.send("the password must be contain uppercase, number and not white spaces").status(400)
    } catch (error){
        res.send("Internal Error").status(500)
    }
})

//get an specific password
router.get("/passwords/:id", requireAuth,  async(req,res) => {
    const id = req.params.id
    try{
        const password = await sequelize.query(`SELECT * FROM passwords WHERE id = ${id};`)
        if (password){
            res.send({"password": password[0]}).status(200)
            return
        } else {
            res.send("password not found").status(404)
            return
        }
    } catch(error){
        console.log(error)
        res.send("Internal server error").status(500)
    }
})

//delete a password
router.delete("/passwords/:id", requireAuth,  async(req,res) => {
    const id = req.params.id
    if(id){
        try{
            const password = sequelize.query(`DELETE FROM passwords WHERE id = ${id}`)
            res.send("Password deleted!").status(200)
            return
        } catch(error) {
            res.send("Internal server error").status(500)
        }
    } else {
        res.send("password not found").status(404)
    }
})

module.exports = router

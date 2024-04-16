const express = require('express')
const router = express.Router()
const {User} = require("../database/models")
const bcrypt = require('bcrypt')
const session = require('express-session')
//register
router.post("/register", async(req,res) => {
    const {username, password} = req.body
    const userExists = await User.findOne({where: {username} })
    if(userExists){
        return res.status(400).json({error: "User aleady exists!"})
    }
    
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    try{
        await User.create({username, password: hashedPassword})
        return res.send("User created!").status(201)
    } catch (error){
        console.log(error)
        return res.send("Internal server error").status(500)
    }
})

router.post("/login", async(req,res) => {
    const {username, password} = req.body
    const user = await User.findOne({where: {username} })
    if(!user){
        return res.status(401).json({"message": "User not found"})
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
        return res.status(401).json({"message": "Passwords doesnt match"})
    }
    req.session.authenticated = true;
    res.status(200).json({message: "Authenticated!"})
})

router.post("/logout", (req,res) => {
    req.session.authenticated = false
    return res.send("Session ended!").status(200)
})

router.get('/status', (req,res) => {
    const status = req.session.authenticated
    if(status === true){
        return res.status(200).json({"status": true})
    } else {
        return res.status(401).json({"status": false})
    }
})

module.exports = router




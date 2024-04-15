const express = require("express")
const app = express()
const PORT = 3000
const {Sequelize} = require('sequelize')

module.exports = {app, PORT, Sequelize}


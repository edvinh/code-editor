const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect('mongodb://localhost/codeditor')

// Load api
require('./api')(app)

app.listen(3001)

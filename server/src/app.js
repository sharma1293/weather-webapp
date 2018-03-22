const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
/* eslint-disable */
// const http = require('http')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
    res.send({
        message: 'User registered'
    })
})
/* eslint-enable */

app.listen(config.port)
// var method = "/api/" + apiKey + "/conditions/q/" + state + "/" + city + ".json";

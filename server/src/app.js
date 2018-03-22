const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// const http = require('http')
const request = require('request')
const mongoose = require('mongoose')
// Connect to mongodb
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/weather-app')
var schema = mongoose.schema({
    zipcode: String,
    state: String,
    city: String,
    country: String,
    weather: String,
    temperature: String,
    observationTime: String,
    humidity: String
})

var Weather = mongoose.model('weather', schema);

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/status', (req, res) => {
    res.send({
        message: 'Hello World'
    })
})

app.listen(process.env.PORT || 8090)

// var method = "/api/" + apiKey + "/conditions/q/" + state + "/" + city + ".json";

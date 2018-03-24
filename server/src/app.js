const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const fs = require('fs')
var userDataSet = fs.readFileSync('./Data/User.json')
var userDataJson = JSON.parse(userDataSet)
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/weather-app')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/weather-app')
/* eslint-disable */
// var Schema = mongoose.Schema
var weatherSchema = mongoose.Schema({
    zipcode: String,
    state: String,
    city: String,
    country: String,
    weather: String,
    temperature: String,
    observationTime: String,
    humidity: String
})
weatherSchema.index({zipcode: 1, observationTime: 1})

var Weather = mongoose.model('weather', weatherSchema)
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

app.get('/zipcode/:id', (req,res) => {
    console.log('request received'+req.params.id)
    const zipcode = req.params.id
    var zipCodeData = checkZipcode(zipcode)
    console.log(zipCodeData);
    const zipJson = JSON.stringify(zipCodeData)
      res.send({
        data: zipJson
    })
})

function checkZipcode(zipcode){
    console.log('Checking if data is there for zipcode: '+zipcode)
    var query = Weather.findOne({'zipcode':zipcode}, 'city weather temperature observationTime', function (err, weatherData) {
    // if (err) return handleError(err);
    console.log(weatherData)
  // Prints "Space Ghost is a talk show host".
  // console.log('%s %s is a %s.', person.name.first, person.name.last,
    // person.occupation);
})
    // console.log(query);
    return query
}

app.post('/login', (req, res) => {

    try {
      const {email, password} = req.body
      const user = checkUser(email)

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const isPasswordValid = (user.password == password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = JSON.stringify(user)
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
        console.log(err.message);
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
  }
})

function checkUser(email){
    console.log('Checking for email: '+email);
    for (var i = 0 ; i< userDataJson.length; i++) {
        if (userDataJson[i].id == email) {
            return userDataJson[i];
        }
    }
}
function jwtSignUser (user) {
  return jwt.sign(user, config.authentication.jwtSecret, {})
}
/* eslint-enable */

app.listen(config.port)

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const fs = require('fs')
var userDataSet = fs.readFileSync('./Data/User.json')
var userDataJson = JSON.parse(userDataSet)
const jwt = require('jsonwebtoken')
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

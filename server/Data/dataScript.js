/* eslint-disable */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
    // const http = require('http')
const request = require('request')
const mongoose = require('mongoose')
    // Add code for getting multiple locations
var allZipcode = new Array()
var startIndex
for (startIndex = 12007; startIndex <12036; startIndex++){
    allZipcode.push(startIndex)
}
for (startIndex = 14201; startIndex <14281; startIndex++){
    allZipcode.push(startIndex)
}
for (startIndex = 20001; startIndex <20099; startIndex++){
    allZipcode.push(startIndex)
}
for (startIndex = 18001; startIndex <18099; startIndex++){
    allZipcode.push(startIndex)
}
for (startIndex = 10001; startIndex <10096; startIndex++){
    allZipcode.push(startIndex)
}
for (startIndex = 90001; startIndex <90096; startIndex++){
    allZipcode.push(startIndex)
}
for (startIndex = 80101; startIndex <80130; startIndex++){
    allZipcode.push(startIndex)
}
for (startIndex = 70001; startIndex <70011; startIndex++){
    allZipcode.push(startIndex)
}
for (startIndex = 67001; startIndex <67030; startIndex++){
    allZipcode.push(startIndex)
}
console.log('Number of zipcodes: '+allZipcode.length)
//All zipcodes added
// Connect to mongodb
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/weather-app')
var Schema = mongoose.Schema
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

var Weather = mongoose.model('weather', weatherSchema);

// var method = "/api/" + apiKey + "/conditions/q/" + state + "/" + city + ".json";
allZipcode.forEach(getData)

async function getData(currentZipcode) {
    setTimeout(function(){
    console.log('Making Call for zipcode'+currentZipcode)
    var url = 'http://api.wunderground.com/api/e60d5bd5870e111d/conditions/q/'+currentZipcode+'.json'
    request({uri: url,
        method: 'GET',
        timeout: 10000}, function(err, response, body) {
        console.log('Making request'+currentZipcode)
    if (err) {
        console.log('error:'+err+'Response is: '+JSON.stringify(response))

    } else {
        var weather = JSON.parse(body)
        if(weather.response.hasOwnProperty('error')){
            console.log('Returned query had error, skipping to next')
        }else{
            var zip = weather.current_observation.display_location.zip
        var state = weather.current_observation.display_location.state_name
        var city = weather.current_observation.display_location.city
        var country = weather.current_observation.display_location.country
        var weatherValue = weather.current_observation.weather
        var temperature = weather.current_observation.temperature_string
        var observationTime = weather.current_observation.observation_time_rfc822
        var humidity = weather.current_observation.relative_humidity

        storeWeather(zip, state, city, country, weatherValue, temperature, observationTime, humidity)
        }
    }
})
},10000)
}


function storeWeather(zipcode, state, city, country, weatherValue, temperature, observationTime, humidity) {
    var t = new Weather({
        zipcode: zipcode,
        state: state,
        city: city,
        country: country,
        weather: weatherValue,
        temperature: temperature,
        observationTime: observationTime,
        humidity: humidity
    })
    t.save(function(err) {
        if (err) {
            console.log('error in saving')
        } else {
            console.log('data saved for zipcode'+zipcode)
        }
    })
}
/* eslint-enable */

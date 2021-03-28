const request = require('request')
const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cbae16211c70fe6da3e1a5fc5b5be298&query='+longitude+','+latitude
    request({url, json : true}, (error,{ body } = {}) => {
        if(error) callback('Unable to connect to weather service!',undefined)
        else if(body.error) callback('Unable to find location',undefined)
        else callback(undefined,'It is '+body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out')  
    })
}

module.exports = forecast
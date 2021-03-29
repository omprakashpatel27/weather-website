const request = require('request')
const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cbae16211c70fe6da3e1a5fc5b5be298&query='+longitude+','+latitude
    request({url, json : true}, (error,{ body } = {}) => {
        if(error) callback('Unable to connect to weather service!',undefined)
        else if(body.error) callback('Unable to find location',undefined)
        else{
            callback(undefined,{
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                datetime: body.location.localtime_epoch,
                windspeed: body.current.wind_speed,
                icon: body.current.weather_icons[0]
            }) 
        }
    })
}

module.exports = forecast
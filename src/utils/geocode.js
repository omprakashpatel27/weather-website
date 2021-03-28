const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmFuMjciLCJhIjoiY2s2ZTE2Z2ZoMDFuOTNsa3dub295cWNnNiJ9.5DgoGYhYcCfVD0D268Ev_Q'
    
    request({ url , json : true} , (error, { body } = {}) =>{
        if(error) callback('Unable to connect to location !',undefined)
        else if(body.features.length === 0) callback('No matching result !',undefined)
        else{
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude :  body.features[0].center[1],
                location :  body.features[0].place_name
            })
        }        
    })
}

module.exports = geocode
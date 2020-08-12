const request = require("postman-request");                //37.8267,-122.4233

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=a236a39c8d90042cbd950759a75d0574&query=' + latitude +',' + longitude + '&units=m'
     
    request({url: url, json: true}, (error, response) => {
         if(error){
             callback('Unable to connect weather services', undefined)
         }
         else if(response.body.error){
             callback('Unable to find location', undefined)
         }else{
             callback(undefined, {
                Weather_Description: response.body.current.weather_descriptions[0],
                Temperature: response.body.current.temperature,
                Feels_Like: response.body.current.feelslike,
                Name: response.body.location.name,
                Country: response.body.location.country,
                Region: response.body.location.region
             })
         }
    })
}


module.exports = forecast
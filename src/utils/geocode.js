const request = require("postman-request")


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmFzdXJhamFuIiwiYSI6ImNrZGN6bzRwaTE2c3EzNHJ4ZWxhaXJkc3MifQ.Db_ev49YV4UyWWLbWNzEJQ&limit=1'
     
    request({url: url, json: true}, (error, response) => {
         if(error){
             callback('Unable to connect weather services', undefined)
         }
         else if(response.body.features === 0){
             callback('Unable to find location', undefined)
         }else{
             callback(undefined, {
                    Latitude: response.body.features[0].center[1],
                    Longitude: response.body.features[0].center[0],
                    Location: response.body.features[0].place_name
                
             })
         }
    })
}




module.exports = geocode
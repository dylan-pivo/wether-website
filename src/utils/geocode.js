const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZHlsYW5waXZvIiwiYSI6ImNqdWlsanh6OTB3ejE0ZXNhM3Nwb3J1OW4ifQ.6OX3kDeecpWMgZTJv3iJwA'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unabl to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location,try another search', undefined)
        } else {

            const {center, place_name: location} = response.body.features[0]
            const lat = center[1]
            const long = center[0]

            callback(undefined, {
                lat,
                long,
                location
            })
        }
    })
}

module.exports = geocode
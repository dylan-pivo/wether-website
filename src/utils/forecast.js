const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/fca18b4f6aad6cbba4108286e8079801/' + lat + ',' + long + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to web service', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const { temperature: temp, precipProbability: precipProb } = body.currently
            callback(undefined, 'It is currently ' + temp + ' degrees out, there is ' + precipProb + '% chance of rain')
        }
    })
}

module.exports = forecast
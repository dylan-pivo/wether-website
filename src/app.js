const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const pubDirPath = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set hadlebars and views location
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialsPath)

//Set static directory to serve
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dylan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dylan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'To check weather, type in your location',
        title: 'Help',
        name: 'Dylan'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address not supplied'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error: error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Dylan',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Dylan',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
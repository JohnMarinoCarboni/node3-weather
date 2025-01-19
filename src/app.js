const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// define path for express config
const publicPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')


// set up hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

// setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Johnny Taco'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About what?!',
        name: 'Johnny Taco'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helptext: 'HELP ME, HELP ME',
        title: 'You Need Help',
        name: 'Johnny Taco'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send('error', error)
        }
        
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error){
                return res.send('Error!', error)
            }
    
            res.send({
                address: location,
                forecast: forecastdata,
                message: 'You provided "' + req.query.address + '" as the address.'
            })        
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Johnno',
        errorMessage: 'Help!! article not found!!!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
    title: '404',
    name: 'Johnster',
    errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})
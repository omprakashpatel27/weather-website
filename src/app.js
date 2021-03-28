const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for  Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Sunshine boy'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About Section',
        name : 'Sunshine boy'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title : 'Help',
        name : 'Sunshine boy'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({ error })   
        }

        forecast(latitude , longitude, (error, forecastData) => {
             if(error){
                 res.send({ error })
             }

             res.send({
                 forecast : forecastData,
                 location,
                 address: req.query.address
             })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must privide search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        title : 'Help page not found !',
        name : 'Sunshine boy'
    })
})

app.get('*', (req,res) => {
    res.render('error',{
        title : '404 Error',
        name : 'Sunshine boy'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port+'.')
})
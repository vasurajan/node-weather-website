const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

// Define paths for Express Configuation
const publicDirectoryPath = path.join(__dirname,'../public')  // path.join links one path to another
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const request = require('postman-request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))  //static takes the path to folder we want to serve up

app.get('', (req,res) => {
    res.render('index',{
        title: "Weather",
        name: "Vasu Rajan"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: "About",
        name: "Curriculum"
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: "Help",
        name: "Mercedes"
    })
})


// app.get('', (req,res) =>{
// res.send("Hello World")
// })

// app.get('/help', (req,res) =>{
//     res.send("Help Page")
// })

// app.get('/about', (req,res) =>{
//     res.send("<h1>Welcome to My Site</h1><p>Content Coming soon</p>")
// })

app.get('/weather', (req,res) =>{
if(!req.query.address){
    return res.send({
        error: "Please provide the weather address"
    })
}


  geocode(req.query.address, (error, {Latitude,Longitude,Location}) => {
      if(error){
          return res.send({error})
      }
      forecast(Latitude,Longitude, (error,forecastData) => {
          if(error){
              return res.send({error})
          }
          res.send({
              forecast: forecastData,
              Location: Location,
              address: req.query.address
          })
      })
  })


    // res.send({
    //     forecast: "forecast",
    //     location: "location",
    //     address: req.query.address
    // })
})

app.get('/products', (req,res) =>{
if(!req.query.search){
   return res.send({
       error: "Please provide a search term"
   })
}
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res) => {
    res.render('404',{
        title: "404",
        name: "Vasu",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: "404",
        name: "Vasu",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () =>{
    console.log("server port is up and running on 3000")
})
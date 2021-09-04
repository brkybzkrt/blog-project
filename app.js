const express=require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app= express()
const port=3000
const hostName='127.0.0.1'

mongoose.connect('mongodb://localhost/blog_app');


app.use(express.static('public'))


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
 

app.use(bodyParser.json())

const main = require('./routes/main')
app.use('/',main)


app.listen(port,hostName,()=>{
    console.log(`Server dinleniyor...,http://${hostName}:${port}/`)
})
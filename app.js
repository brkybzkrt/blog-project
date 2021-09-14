const express=require('express')
const exphbs  = require('express-handlebars')
const fileUpload= require('express-fileupload')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const expressSession = require('express-session')
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')
const generateDate=require('./helpers/generateDate')
const truncateString=require('./helpers/truncateString')
const paginate= require('./helpers/paginate')


const app= express()
const port=3000
const hostName='127.0.0.1'
mongoose.connect('mongodb://localhost/blog_app');

app.use(expressSession({
    secret:'denemedeneme',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:'mongodb://localhost/blog_app'})
}))



//for image upload
app.use(fileUpload())

//for override methods
app.use(methodOverride('_method'))

// for our public directories
app.use(express.static('public'))



//for views
app.engine('handlebars', exphbs({
    helpers:{
        generateDate,
        truncateString,
        paginate
    },
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// display link middleware
app.use((req,res,next)=>{

   const {userId}=req.session
   if(userId){
       res.locals = {displayLink:true}
   }else{
    res.locals = {displayLink:false}
   }
   next()
})


// for flash message
app.use((req,res,next)=>{
    res.locals.sessionFlash= req.session.sessionFlash
    delete req.session.sessionFlash
    next()
    })
    
    

const main = require('./routes/main')
app.use('/',main)

const post = require('./routes/posts')
app.use('/posts',post)

const users = require('./routes/users')
app.use('/users',users)

const admin = require('./routes/admin/admin')
app.use('/admin',admin)

const deneme = require('./routes/deneme');
app.use('/deneme',deneme)

const contact = require('./routes/contact')
app.use('/contact',contact)

app.listen(port,hostName,()=>{
    console.log(`Server dinleniyor...,http://${hostName}:${port}/`)
})
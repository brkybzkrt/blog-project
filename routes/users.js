const express=require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt= require('bcrypt')



router.get('/register',(req,res)=>{

res.render('site/register')
})

router.post('/register',(req,res)=>{
    
const {firstName,lastName,userName,password,email}=req.body
    const newUser = new User();
   
    const salt=10
    bcrypt.hash(password,salt,function(err, hash) {
        newUser.lastName=lastName
        newUser.firstName=firstName
        newUser.userName=userName
        newUser.email=email
        newUser.password=hash
    
    newUser.save().then(newUser=>{
         res.redirect('/')})
    });
    
    
})



router.get('/login',(req,res)=>{

   res.render('site/login')
})
        

router.post('/login',(req,res)=>{
    const {email,password}= req.body
    User.findOne({email},(error,user)=>{

        if(user){
           
            if(bcrypt.compare(password,user.password)){
                req.session.userId=user._id
                res.redirect('/')
            }
            else{
                res.redirect('/users/login')
            }
        }
        else{
            res.redirect('/users/register')
        }
    })
    
})


router.get('/logout',(req,res)=>{

    req.session.destroy(()=>{

        res.redirect('/')
    })
    
 })
         

    


module.exports=router

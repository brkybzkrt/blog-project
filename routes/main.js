const express=require('express')
const router = express.Router()
const Post= require('../models/Post')

router.get('/',(req,res)=>{

    res.render('site/index')
    
})



router.get('/blogs',(req,res)=>{
    Post.find({}).sort({_id:-1}).then(posts=>{
        res.render('site/blogs',{posts:posts})
    })

})

router.get('/contact',(req,res)=>{
    res.render('site/contact')
})



module.exports=router
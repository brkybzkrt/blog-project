const express=require('express')
const router = express.Router()
const Post= require('../models/Post')
const path= require('path')



router.get('/new',(req,res)=>{
    
    if(req.session.userId){
        res.render('site/addpost')
    }
    else{
        res.redirect('/users/login')
    }
   
})

router.get('/:id',(req,res)=>{
Post.findById(req.params.id).then(post=>
    {
    res.render('site/blog-single',{post:post})
})}) 


router.post('/test',(req,res)=>{

    let post_image= req.files.post_image

    post_image.mv(path.resolve(__dirname,'../public/img/postImages/',post_image.name))
    Post.create({
        ...req.body,
        post_image:`/img/postImages/${post_image.name}`

    })
    req.session.sessionFlash ={
        type:'alert alert-success',
        message:'Post başarıyla kaydedildi.'
    }
    res.redirect('/blogs')
})


module.exports=router
const express=require('express')
const router = express.Router()
const Post= require('../models/Post')
const Category= require('../models/Category')

router.get('/',(req,res)=>{

    res.render('site/index')
   
  
})



router.get('/posts',(req,res)=>{
    Post.find({}).populate({path:'author',model:'User'}).sort({_id:-1}).then(posts=>{
        Category.aggregate([{

            $lookup:{
                from:'posts',
                localField:'_id',
                foreignField:'category',
                as:'posts'
            }},

            {$project:{
                _id:1,
                name:1,
                countOfPosts:{$size: '$posts'}
            }}
        ]).sort({_id:-1}).then(categories=>{
            Post.find({}).sort({_id:-1}).limit(3).then(threepost=>{
                res.render('site/posts',{posts,categories,threepost})
            })
           
        })
        
    })

})

router.get('/contact',(req,res)=>{
    res.render('site/contact')
})



module.exports=router
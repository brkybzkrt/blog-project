const express=require('express')
const router = express.Router()
const path= require('path')
const Post= require('../models/Post')
const Category= require('../models/Category')


router.get('/get',(req,res)=>{

    Post.find({author:req.session.userId}).populate({path:'author',model:'User'}).sort({_id:-1}).then(post=>{
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
        ]).sort({_id:-1}).then((categories)=>{
            Post.find({}).sort({_id:-1}).limit(3).then(threepost=>{
                res.render('site/myposts',{post,categories,threepost})
            })
           
        })
           
           
        })
        
    
    })

router.delete('/myposts/:id',(req,res)=>{
        const _id=req.params.id
    Post.deleteOne({_id}).then(()=>{
           
        res.redirect('/activeUser/get')
       
           
       })}
       )
   
router.get('/myposts/edit/:id',(req,res)=>{
    const _id=req.params.id
    Post.findOne({_id}).then(post=>{
        Category.find({}).then(categories=>{
            res.render('site/editpost',{post,categories})
        })
        
    })
})

router.put('/edit/:id',(req,res)=>{

    let post_image= req.files.post_image

    post_image.mv(path.resolve(__dirname,'../public/img/postImages/',post_image.name))
    const _id=req.params.id
Post.findOne({_id}).then(post=>{
    post.title=req.body.title
    post.content=req.body.content
    post.category=req.body.category
    post.post_image= `/img/postImages/${post_image.name}`

    post.save().then(post=>{
        res.redirect('/activeUser/get')
    })
})


})

module.exports=router
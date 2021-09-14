const express=require('express')
const router = express.Router()
const Post= require('../models/Post')
const path= require('path')
const Category = require('../models/Category')
const searchRegex= require('../helpers/searchRegex')




router.get('/new',(req,res)=>{
    
    if(!req.session.userId){
        res.redirect('/users/login')
    }
    else{
        Category.find({}).sort({_id:-1}).then(categories=>{

            res.render('site/addpost',{categories})
        })
    }
   
})





router.get("/search", (req, res)=> {
    if (req.query.search) 
    {
       const regex = new RegExp(searchRegex(req.query.search), 'gi');
      Post.find({ title: regex }).sort({_id:-1}).then(posts=> {
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
    }
})


router.get('/category/:categoryId',(req,res)=>{
let categoryId=req.params.categoryId
Post.find({category:categoryId}).sort({_id:-1}).then(posts=>{
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


router.get('/:id',(req,res)=>{
Post.findById(req.params.id).populate({path:'author',model:'User'}).then(post=>
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
        {
            Post.find({}).sort({_id:-1}).limit(3).then(threepost=>{
                res.render('site/post-single',{post,categories,threepost})
            })
            
        }
    })
   
)}) 





router.post('/test',(req,res)=>{

    let post_image= req.files.post_image

    post_image.mv(path.resolve(__dirname,'../public/img/postImages/',post_image.name))
    Post.create({
        ...req.body,
        post_image:`/img/postImages/${post_image.name}`,
        author:req.session.userId

    })
    req.session.sessionFlash ={
        type:'alert alert-success',
        message:'Post başarıyla kaydedildi.'
    }
    res.redirect('/posts')
})




module.exports=router
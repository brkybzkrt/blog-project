const express=require('express')
const router = express.Router()
const Category=require('../../models/Category')
const Post= require('../../models/Post')
const User = require('../../models/User')


router.get('/',(req,res)=>{
User.findById(req.session.userId).then(user=>{
    if(user.isAdmin){
        res.render('admin/admin')
    }
    else{
        res.send('<h1>error </h1>')
    }
})})


// admin/categories

router.get('/categories',(req,res)=>{
Category.find().sort({_id:-1}).then(categories=>{
    res.render('admin/categories',{categories:categories})
})})


router.post('/categories',(req,res)=>{

    Category.create(req.body,(error,category)=>{
        if(!error){
             res.redirect('/admin/categories')
            
        }
       
    })
})

router.delete('/categories/:id',(req,res)=>{
     const _id=req.params.id
    Category.deleteOne({_id}).then(()=>{
        
        res.redirect('/admin/categories')
    
        
    })}
    )

   
router.get('/categories/edit/:id',(req,res)=>{
        const id=req.params.id
            Category.findOne({_id:id}).then(category=>{
                res.render('site/editcategory',{category})
            })
            
        
    })
    

router.put('/categories/update/:id',(req,res)=>{
    const id=req.params.id
    Category.findById({_id:id}).then(category=>{

        category.name=req.body.categoryName

        category.save().then(()=>{
            res.redirect('/admin/categories')
        })
    })

    })


// admin/posts


router.get('/postlist',(req,res)=>{

    Post.find().populate({path:'category',model:'Category'}).populate({path:'author',model:'User'}).sort({_id:-1}).then(posts=>{

        res.render('admin/postlist',{posts})
    })

})

router.delete('/posts/:id',(req,res)=>{
    const id=req.params.id
    Post.deleteOne({_id:id}).then(()=>{
       
       res.redirect('/admin/postlist')
   
       
   })}
   )


// admin/users
router.get('/users',(req,res)=>{
    User.find().sort({_id:-1}).then(users=>{

        res.render('admin/users',{users})
    })

   })



router.delete('/users/delete/:id',(req,res)=>{
    const id=req.params.id

    User.deleteOne({_id:id}).then(()=>{
        res.redirect('/admin/users')
    })
})


module.exports=router;
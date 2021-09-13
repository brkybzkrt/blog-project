const express=require('express')
const router = express.Router()
const User= require('../models/User')

router.get('/',(req,res)=>{
    if(req.session.userId){
        User.findById({_id:req.session.userId}).then(user=>{
           
            res.render('site/contact',{user})
        })

        
    }
    
})


router.post('/email',(req,res)=>{

   const outputHTML=
   `
  <h3>Gönderen Email : ${req.body.email}</h3>
   <p>${req.body.message} </p>`


    
const nodemailer = require("nodemailer");


async function main() {
  
  

 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "b9bozkurt959@gmail.com",  // generated ethereal user
      pass:  "gnfcrdmjmfafxcln"    // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: req.body.email, // sender address
    to: "b9bozkurt959@gmail.com", // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.content, // plain text body
    html: outputHTML, // html body
  });

  console.log("Message sent: %s", info.messageId);
  

  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 
}

main().catch(console.error);

res.redirect('/contact')
})









module.exports=router
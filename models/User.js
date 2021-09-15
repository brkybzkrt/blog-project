const mongoose = require('mongoose');



const UserSchema = mongoose.Schema({
    firstName:{ type:String,required:true},
    lastName:{ type:String,required:true},
    userName:{ type:String,unique:true,required:true},
    email:{ type:String,unique:true,required:true},
    password:{ type:String,required:true},
    date:{ type:Date,default:Date.now},
    isAdmin:{type:Boolean,default:false}
    

})


module.exports= mongoose.model('User',UserSchema)
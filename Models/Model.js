const mongoose=require('mongoose')
const ContactSchema=new mongoose.Schema({
    name:
    {
    type:String,
    required:true
    },
    email:
    {
       type:String,
       required:true
    },
    password:
    {
        type:String,
        required:true
    },
    createdAt:{
        type:new
    }
})
module.exports=mongoose.model('Contact',ContactSchema)
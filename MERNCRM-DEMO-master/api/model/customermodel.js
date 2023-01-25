const mongoose=require('mongoose')

const customerSchema=new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    mobile:String,
    membership:String,
    regon:{
        type:Date,
        default:Date.now
    }
})

const customer=mongoose.model("customer",customerSchema)
module.exports=customer
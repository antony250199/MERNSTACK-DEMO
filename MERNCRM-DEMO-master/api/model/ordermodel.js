const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    order_id:String,
    quantity:String,
    amount:String,
    customer:String,
    orderdate:{
        type:Date,
        default:Date.now
    },
    shippingdate:String
    
})

const order=mongoose.model("order",orderSchema)
module.exports=order
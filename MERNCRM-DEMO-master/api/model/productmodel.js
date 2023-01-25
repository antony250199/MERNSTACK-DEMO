const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    product_id:String,
    product_name:String,
    category:String,
    price:String,
    stock:String
})

const product=mongoose.model("products",productSchema)
module.exports=product
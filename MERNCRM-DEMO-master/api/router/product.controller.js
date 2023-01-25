const express=require('express')
const mongoose=require('mongoose')
const productmodel=require('../model/productmodel')

const productroute=express.Router()


productroute.get('/getAllProducts',(req,res)=>{
    productmodel.find((err,result)=>{
        if(err){
            // res.send(err)
            res.json({"status":0,"error":err})
        }else{
            // res.send(result)
            res.json({"status":1,"productlist":result})
        }
    })
})
productroute.get('/getProduct/:id',(req,res)=>{
    productmodel.findOne({_id:req.params.id},(err,result)=>{
        if(err){
            // res.send(err)
            res.json({"status":0,"error":1})
        }else{
            console.log(result)
            // res.send(result)
            // res.json({"status":1,"user":result})
            if(result==null){
                res.json({"status":0,"msg":"product not available"})
            }
            else{
                res.json({"status":1,"msg":"product available"})
            }
        }
    })
})


productroute.post('/addProduct',(req,res)=>{
   
    let new_product ={
        product_id:"product_"+Math.round((Math.random()*100)+1),
        product_name:req.body.product_name,
        category:req.body.category,
        price:req.body.price,
        stock:req.body.stock
    }
    console.log(new_product)
    productmodel.insertMany(new_product,(err,result)=>{
        if(err){
            res.send("product not added")
        }
        else{
            res.json({"msg":"product added"})
        }

    })
    })
productroute.put('/editProduct/:id',(req,res)=>{
        productmodel.update({_id:req.params.id},{$set:req.body},(err,result)=>{
            if(err){
                res.send("data not edited")
                // res.json({"status":0,"error":1})
            }else{
                // res.send("data edited")
                // res.json({"status":1,"user":result})
                if(result.modified==0){
                    res.json({"status":0,"msg":"product not available"})
                }
                else{
                    res.json({"status":1,"msg":"product data editted"})
                }
            }
        })
    
})

productroute.delete('/deleteProduct/:id',(req,res)=>{
    productmodel.deleteOne({_id:req.params.id},(err,result)=>{
        if(err){
            // res.send("data not deleted")
            res.json({"status":0,"msg":"product not deleted","error":err})
        }else{
            // res.json({"status":1,"user":result})
            if(result.deletedCount==0){
                res.json({"status":0,"msg":"product not available"})
            }
            else{
                res.json({"status":1,"msg":"product deleted"})
            }
        }
    })
})
module.exports=productroute
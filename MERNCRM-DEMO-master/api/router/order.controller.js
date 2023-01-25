const express= require('express')
const mongoose=require('mongoose')
const orderroute=express.Router()

const ordermodel=require('../model/ordermodel')

orderroute.get('/getAllOrder',(req,res)=>{
    console.log(req.body)
    ordermodel.find((err,result)=>{
        if(err){
            // res.send(err)
            res.json({"status":0,"Error":err})
        }else{
            // res.send(result)
            res.json({"status":1,result})
        }
    })
})
orderroute.get('/getOrder/:id',(req,res)=>{
    ordermodel.findOne({order_id:req.params.id},(err,result)=>{
        if(err){
            // res.send(err)
            res.json({"status":0,"error":1})
        }else{
            console.log(result)
            // res.send(result)
            // res.json({"status":1,"user":result})
            if(result==null){
                res.json({"status":0,"msg":"order not available"})
            }
            else{
                res.json({"status":1,"msg":"order available",result})
            }
        }
    })
})
orderroute.post('/addOrder',(req,res)=>{

    let new_order ={
        order_id:"order_"+Math.round((Math.random()*100)+1),
        quantity:req.body.quantity,
        amount:req.body.amount,
        customer:req.body.customer,
        shippingdate:req.body.shippingdate
    }

    console.log(req.body)
        ordermodel.insertMany(new_order,(err,result)=>{
            if(err){
                res.send("order not placed")
            }
            else{
                res.json({"msg":"order placed"})
            }
        })
            
    })

    orderroute.put('/editOrder/:id',(req,res)=>{

        ordermodel.update({order_id:req.params.id},{$set:req.body},(err,result)=>{
            if(err){
                res.send(err)
                // res.json({"status":0,"error":1})
            }else{
                // res.send("data edited")
                // res.json({"status":1,"user":result})
                if(result.modified==0){
                    res.json({"status":0,"msg":"order not available"})
                }
                else{
                    res.json({"status":1,"msg":"order updated"})
                }
            }
        })
    
})
orderroute.delete('/deleteOrder/:id',(req,res)=>{
    ordermodel.deleteOne({order_id:req.params.id},(err,result)=>{
        if(err){
            // res.send("data not deleted")
            res.json({"status":0,"error":err})
        }else{
            // res.json({"status":1,"user":result})
            if(result.deletedCount==0){
                res.json({"status":0,"msg":"order not deleted"})
            }
            else{
                res.json({"status":1,"msg":"order deleted"})
            }
        }
    })
})









module.exports=orderroute
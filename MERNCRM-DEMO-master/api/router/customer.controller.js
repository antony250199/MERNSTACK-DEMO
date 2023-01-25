const express= require('express')
const mongoose=require('mongoose')
const customerroute=express.Router()




const customermodel=require('../model/customermodel')

customerroute.get('/getAllCustomer',(req,res)=>{
    console.log(req.body)
    customermodel.find((err,result)=>{
        if(err){
            // res.send(err)
            res.json({"status":0,"Error":err})
        }else{
            // res.send(result)
            res.json({"status":1,result})
        }
    })
})

customerroute.get('/getCustomer/:id',(req,res)=>{
    customermodel.findOne({_id:req.params.id},(err,result)=>{
        if(err){
            // res.send(err)
            res.json({"status":0,"error":1})
        }else{
            console.log(result)
            // res.send(result)
            // res.json({"status":1,"user":result})
            if(result==null){
                res.json({"status":0,"msg":"customer not available"})
            }
            else{
                res.json({"status":1,"msg":"customer available",result})
            }
        }
    })
})
customerroute.post('/addCustomer',(req,res)=>{
    console.log(req.body)
    customermodel.findOne({email:req.body.email},(err,result)=>{
        if(err){
            res.send(err)
        }else{
            if(result==null){
                customermodel.insertMany(req.body,(err,result)=>{
                    if(err){
                        res.send("customer not registered")
                    }
                    else{
                        res.json({"msg":"Registered"})
                    }
            
                })
            }
            else{
                res.send("customer already exist")
            }
        }
    })
    })
customerroute.put('/editCustomer/:id',(req,res)=>{
        customermodel.update({_id:req.params.id},{$set:req.body},(err,result)=>{
            if(err){
                res.send(err)
                // res.json({"status":0,"error":1})
            }else{
                // res.send("data edited")
                // res.json({"status":1,"user":result})
                if(result.modified==0){
                    res.json({"status":0,"msg":"customer not available"})
                }
                else{
                    res.json({"status":1,"msg":"customer data updated"})
                }
            }
        })
    
})

customerroute.delete('/deleteCustomer/:id',(req,res)=>{
    customermodel.deleteOne({_id:req.params.id},(err,result)=>{
        if(err){
            // res.send("data not deleted")
            res.json({"status":0,"error":err})
        }else{
            // res.json({"status":1,"user":result})
            if(result.deletedCount==0){
                res.json({"status":0,"msg":"customer not available"})
            }
            else{
                res.json({"status":1,"msg":"customer deleted"})
            }
        }
    })
})






module.exports=customerroute

const express=require('express')
const mongoose=require('mongoose')
const usermodel=require('../model/usermodel')
const jwt=require('jsonwebtoken')

const userroute=express.Router()

const jwt_secret="ant"

userroute.get('/getAllUser',(req,res)=>{
    usermodel.find((err,result)=>{
        if(err){
            // res.send(err)
            res.json({"status":0,"error":err})
        }else{
            // res.send(result)
            res.json({"status":1,"userlist":result})
        }
    })
})
userroute.get('/getUser/:id',(req,res)=>{
    usermodel.findOne({_id:req.params.id},(err,result)=>{
        if(err){
            // res.send(err)
            res.json({"status":0,"error":1})
        }else{
            console.log(result)
            // res.send(result)
            // res.json({"status":1,"user":result})
            if(result==null){
                res.json({"status":0,"msg":"user not available"})
            }
            else{
                res.json({"status":1,"msg":"user available","user":result})
            }
        }
    })
})

userroute.post('/loginUser',(req,res)=>{
    console.log(req.body)
    usermodel.findOne({email:req.body.email},(err,result)=>{
        if(err){
            // res.send(err)
            res.json({"status":0,"error":1})
        }else{
            console.log(result)
            // res.send(result)
            // res.json({"status":1,"user":result})
            if(result==null){
                res.json({"status":0,"msg":"user does not exist"})
            }
            else{
              if(req.body.password==result.password){
                  res.json({"status":1,"msg":"login success","user":result})
              }else{
                  res.json({"status":0,"msg":"incorrect password"})
              }
            }
        }
    })
})

userroute.post('/addUser',(req,res)=>{
    console.log(req.body)
    usermodel.findOne({email:req.body.email},(err,result)=>{
        
        if(err){
            res.send(err)
        }else{
            if(result==null){
                usermodel.insertMany(req.body,(err,result)=>{
                    if(err){
                        res.send("user not registered")
                    }
                    else{
                        let token=jwt.sign({"email":result.email},jwt_secret)
                        console.log(token)
                        res.json({"msg":"Registered","token":token})
                    }
            
                })
            }else{
                res.json({"msg":"user already registerd"})
            }
            
        }
    })
    })
userroute.put('/editUser/:id',(req,res)=>{
        usermodel.update({_id:req.params.id},{$set:req.body},(err,result)=>{
            if(err){
                res.send("data not edited")
                // res.json({"status":0,"error":1})
            }else{
                // res.send("data edited")
                // res.json({"status":1,"user":result})
                if(result.modified==0){
                    res.json({"status":0,"msg":"user not available"})
                }
                else{
                    res.json({"status":1,"msg":"user data editted"})
                }
            }
        })
    
})

userroute.delete('/deleteUser/:id',(req,res)=>{
    usermodel.deleteOne({_id:req.params.id},(err,result)=>{
        if(err){
            // res.send("data not deleted")
            res.json({"status":0,"msg":"user not deleted","error":err})
        }else{
            // res.json({"status":1,"user":result})
            if(result.deletedCount==0){
                res.json({"status":0,"msg":"user not available"})
            }
            else{
                res.json({"status":1,"msg":"user deleted"})
            }
        }
    })
})
module.exports=userroute
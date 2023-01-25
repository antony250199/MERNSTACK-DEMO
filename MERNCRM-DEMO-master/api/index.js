
const bodyParser = require('body-parser')
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const userapi=require('./router/user.controller')
const orderapi=require('./router/order.controller')
const customerapi=require('./router/customer.controller')
const productapi=require('./router/product.controller')

const app=express()

const PORT=5000
const mongodb_url="mongodb+srv://antonyraj250199:rajadhoni@cluster0.okr73.mongodb.net/CRM?retryWrites=true&w=majority"

//mongoDb connection
mongoose.connect(mongodb_url,{useNewUrlParser:true})

const db=mongoose.connection
db.on('error',()=>console.log("DB not connected"))
db.once('open',()=>console.log("Db connected"))

//third party middlevar
app.use(bodyParser.json())
app.use(cors())
app.use('/api/user',userapi)
app.use('/api/product',productapi)
app.use('/api/order',orderapi)
app.use('/api/customer',customerapi)


//sample get request
app.get('/home',(req,res)=>{
    res.send("Welcome to MyBlog Home Page!...")
})

app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`))
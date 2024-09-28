const express=require('express');
const mongoose=require('mongoose');
const path=require('path')
const cors=require('cors')
const app=express();
const bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
var fs = require('fs');
app.use(cors())
let form=JSON.parse(fs.readFileSync('./dynamic-data.json','utf-8'))
app.get('/data',(req,resp)=>{
    resp.send(form)
    //console.log(form)
})
async function connection(){
    await mongoose.connect('mongodb://localhost:27017/mern')
    console.log('database connected successfully')
    }
    const schma= new mongoose.Schema({
        name:String,
        email:String,
        tel:Number,
        select:String,
        companyname:String,
        file:String
    })
    const test=mongoose.model('tests_2',schma)
    connection()
app.post('/submit',async(req,resp)=>{
    const name=req.body.name
    const email=req.body.email
      const tel=req.body.tel
      const select=req.body.select
      const file=req.body.file
      const companyname=req.body.companyname
      const user= new test()
      user.name=name
      user.email=email
      user.tel=tel
      user.select=select
      user.companyname=companyname
      user.file=file
      const data=await user.save()
      console.log(req.body)
})
app.listen(4000,()=>{
    console.log("App Runing on route 4000")
})


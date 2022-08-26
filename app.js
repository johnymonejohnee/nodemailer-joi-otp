const express=require('express')
const app=express()
require('./connection')
app.use(express.json());
const router=require('./routes')
app.use('/',router)

app.listen(5000,(err,res)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("sewrver created")
    }
})

const express=require('express')
const router=express()
const db =require('./connection')
const Joi = require('joi')
const otpGenerator = require('otp-generator')
const validateSchema=require('./joi')
var nodemailer = require('nodemailer');
var sendmail=require('./mail')
const { message } = require('./joi')

router.post('/user',(req,res)=>{

    const data=req.body
    const gmailid=data.email



    //otp generator

    const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    console.log(otp)
    sendmail.mail(otp,gmailid);


    let code=`insert into log(email,otp) values
    ('${data.email}','${otp}')`
    db.query(code,(err,result)=>{
        if(err){
            console.log('dberror',err)
        }
        else{
            console.log("value inserted")
        }
    })

})


router.post('/email',async (req,res)=>{
    let data=req.body
    if(data.email==undefined ||data.otp==undefined){
        res.status(500).send({error:"auth failed"})
    }

   
    let code=`select * from log where email='${data.email}' and otp='${data.otp}'`
    console.log(code)
    let reply= await db.query(code)
      console.log(reply)
      if(reply.rowCount==0){
        console.log("otp error")
      }
      else{
        console.log("sucesfully validated")
      }
    

})

router.post('/signup', async(req,res)=>{
    let data =req.body
    let datatoValidate={
        
        username:req.body.username,
        password:req.body.password,
        birthyear:req.body.birthyear,
        email:req.body.email



    }
    const result =  validateSchema.validate(datatoValidate); 
    console.log(result)

    if(result.error==null){

        let code =`insert into signup(email,password,username,birthyear)
    values('${data.email}','${data.password}','${data.username}','${data.birthyear}')`
    console.log(code)
    db.query(code,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("db inserted succesfully")
        }
    })

    }


    

})

module.exports=router

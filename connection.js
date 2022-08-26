const {Pool}= require('pg')


const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'otp',
    password: '@John619',
    port: 5432,

})

pool.connect((err,res)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("db connected")
    }
})

module.exports=pool
 
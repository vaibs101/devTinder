const express=require('express');

const app=express();

app.use("/test",(req,res)=>{
    res.send("Hello from testings server")
})

app.listen(3000,()=>{
    console.log("server started")
});


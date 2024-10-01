const express=require('express');
const connectDB=require('./config/database');
require('./config/database');
const app=express();
const User=require('./models/user');

app.use(express.json());
app.post('/signup',async (req,res)=>{
console.log(req.body);
    const user=new User(req.body);
    try{
        await user.save();
        res.send("User Added Succesfully");
    
    }catch(err){
res.status(400).send("Error saving the User:"+err.message)
    }
    });

    //get user by email
    app.get('/user',async (req,res)=>{
        const userEmail=req.body.emailId;
try{
    const user=await User.findOne({emailId:userEmail});
    if(!user)
        res.status(404).send("User Not Found");
    else
    res.send(user);
//     const users=await User.find({emailId:userEmail})
//   if(users.length===0)
//     res.status(404).send("User Not Found");
// else
//res.send(users);
}
catch(err){
    res.status(400).send("Something went wrong")
}
    })
    //Feed API - GET/feed- get all the users from the database
    app.get('/feed',async (req,res)=>{
try{
const users=await User.find({});
res.send(users);
}
catch(err){
    res.status(400).send("Something went wrong")
}
    })

    app.delete("/user",async (req,res)=>{
        const userId=req.body.userId;
        try{
         const user=await User.findByIdAndDelete(userId);
         res.send("User Deleted Succesfully");
        }
        catch(err){
            res.status(400).send("Something went wrong")
        }
    });

    app.patch("/user:userId",async (req,res)=>{
const data=req.body;
const userId=req.params?.userId;

try{
    const ALLOWED_UPDATES=[
        "photoUrl","about","gender","age","skills"
    ];
    
    const isUpdateAllowed=Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
    
    if(!isUpdateAllowed){
        throw new Error("Update Not allowed");
        
    }
    if(data?.skills.length>10){
        throw new Error("Skill cannot be more than 10");
    }
    const user=await User.findByIdAndUpdate({_id:userId},data, {returnDocument:"after", runValidators:true,});
    res.send("User updated Successfully");
}
catch(err){
    res.status(400).send("Update Failed: "+err.message)
}
 
    });

connectDB().then(()=>{
    console.log("Database connection Established");
    app.listen(7777,()=>{
        console.log("server started")
    });
    }).catch(err=>{
    console.log(err,"Databse cannot be connected!!");
    });





const mongoose=require('mongoose');

const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://vaibhavgupta1071997:IZkYkKxYDSBQLm8Y@cluster0.6ihj1.mongodb.net/devTinder");
};

module.exports=connectDB;


//mongodb+srv://vaibhavgupta1071997:IZkYkKxYDSBQLm8Y@cluster0.6ihj1.mongodb.net/
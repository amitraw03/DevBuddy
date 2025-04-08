const express= require("express");
const {connectDB}= require("./config/database");

const app=express();

// app.get("/hey",
//     (req,res,next)=>{
//     // res.send(`Hello from the server!! kya haal chaal`);
//     next();
// },
// (req,res)=>{
//     res.send(`Han bhai bdia na!!`);
// })
connectDB()
.then(()=>{
    console.log(`DataBase connection stablished🔥`);
    app.listen(3000,()=>{
        console.log(`Server successfull listening on PORT:`+`3000`);
        
    });

}).catch((err) =>{
     console.error(`DB cn't be connected!!`);   
});


const express= require("express");

const app=express();

app.get("/hey",
    (req,res,next)=>{
    // res.send(`Hello from the server!! kya haal chaal`);
    next();
},
(req,res)=>{
    res.send(`Han bhai bdia na!!`);
})


app.listen(3000,()=>{
    console.log(`Server successfull listening`);
    
});
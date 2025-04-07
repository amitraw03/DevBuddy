const express= require('express');

const app=express();

app.use("/hi",(req,res)=>{
    res.send(`Hello from the server!! kya haal chaal`);
})

app.listen(3000,()=>{
    console.log(`Server successfull listening`);
    
});
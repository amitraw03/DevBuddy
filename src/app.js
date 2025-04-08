const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/User");
const app = express();

// app.get("/hey",
//     (req,res,next)=>{
//     // res.send(`Hello from the server!! kya haal chaal`);
//     next();
// },
// (req,res)=>{
//     res.send(`Han bhai bdia na!!`);
// })

app.post("/signup", async (req, res) => {
  //create a instance of a user model
  const user = new User({
    firstName: "Amit",
    lastName: "Rawat",
    emailId: "rwt@gmail.com",
    age: "22",
  });
  try {
    await user.save();
    res.send(`User added succesfully`);
  } catch (error) {
    res.status(400).send(`Error svaing the user data` + err.message);
  }
});

connectDB()
  .then(() => {
    console.log(`DataBase connection stablished🔥`);
    app.listen(3000, () => {
      console.log(`Server successfull listening on PORT:` + `3000`);
    });
  })
  .catch((err) => {
    console.error(`DB cn't be connected!!`);
  });

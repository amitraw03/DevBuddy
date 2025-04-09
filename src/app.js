const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/User");
const app = express();

app.use(express.json()); // express middleware to parse json data in server coming from client

// app.get("/hey",
//     (req,res,next)=>{
//     // res.send(`Hello from the server!! kya haal chaal`);
//     next();
// },
// (req,res)=>{
//     res.send(`Han bhai bdia na!!`);
// })

app.post("/signup", async (req, res) => {
  //creating dynamic instance of a user model
  const user = new User(req?.body);
  try {
    await user.save();
    res.send(`User added succesfully`);
  } catch (error) {
    res.status(400).send(`Error svaing the user data` + error);
  }
});

// /feed api using get API Call -->to display all the users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(404).send(`Something went wrong!`);
  }
});

//  /delete to delete a user
app.delete("/delete", async (req, res) => {
  const userId = req.body?.userId;
  try {
    // await User.findByIdAndDelete({_id: userId});
    await User.findByIdAndDelete(userId);
    res.send(`User deleted successfully!`);
  } catch (error) {
    res.status(404).send(`Something went wrong`);
  }
});

// update a user using patch
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const newData = req.body;

  try {
    // lets perform API level validation like ony certain fields can be update
    const ALLOWED_UPDATES = ["photoUrl", "about", "age", "gender", "skills"];
    const isUpdateAllowed = Object.keys(newData).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error(`Updates not allowed`);
    }

    //here 3rd param is optional just to examine
    const user = await User.findByIdAndUpdate(userId, newData, {
      returnDocument: "before",
      runValidators: true,
    });
    // console.log(user); //before update data on console
    res.send(`Data Updated Succesfully`);
  } catch (error) {
    res.status(400).send(`Update Failed:` + error.message);
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

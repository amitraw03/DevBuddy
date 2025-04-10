const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
const app = express();

app.use(express.json()); // express middleware to parse json data in server coming from client
app.use(cookieParser()); // to read the cookie from req

const authRouter = require("./routes/auth.js");
const profileRouter= require("./routes/profile.js")


app.use("/",authRouter);
app.use("/",profileRouter);

// /feed api using get API Call -->to display all the users
app.get("/feed", userAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(404).send(`Something went wrong!`);
  }
});

//  /delete to delete a user
app.delete("/delete", userAuth, async (req, res) => {
  const userId = req.body?.userId;
  try {
    // await User.findByIdAndDelete({_id: userId});
    await User.findByIdAndDelete(userId);
    res.send(`User deleted successfully!`);
  } catch (error) {
    res.status(404).send(`Something went wrong`);
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

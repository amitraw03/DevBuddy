const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json()); // express middleware to parse json data in server coming from client

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req?.body;
  try {
    if (!firstName || !lastName) {
      throw new Error(`Enter the Name please!`);
    }

    //lets hash the password before saving in DB
    const hashPassword = await bcrypt.hash(password, 10);

    //creating dynamic instance of a user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await user.save();
    res.send(`User added succesfully`);
  } catch (error) {
    res.status(400).send(`Error occured:` + error.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req?.body;
  try {
    if (!emailId) {
      throw new Error(`Please enter the email address`);
    }
    //lets check presence of such user & then check passsword
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error(`User not exist!!`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(`You have entered the wrong password`);
    } else {
      res.send(`User logged inSuccesfully`);
    }
  } catch (error) {
    res.status(400).send(`Error occured:` + error.message);
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

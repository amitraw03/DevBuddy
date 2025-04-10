const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req?.user);
  } catch (error) {
    res.status(400).send(`Error occured :` + error.message);
  }
});

profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{
    try {
        const updater= req?.body;  //new data
        // lets perform API level validation like ony certain fields can be update
        const ALLOWED_UPDATES = ["photoUrl", "about", "age", "gender", "skills"];
        const isUpdateAllowed = Object.keys(newData).every((k) =>
          ALLOWED_UPDATES.includes(k)
        );
        if (!isUpdateAllowed) {
          throw new Error(`Updates not allowed`);
        }
        

        const loggedInUser = req?.user;
        Object.keys(updater).forEach((keys)=>{ loggedInUser[key]= updater[key]});
        await loggedInUser.save();
        
        //professional way of sending data to client
        res.json({
            message:`porfile Data Updated Succesfully`,
            data: loggedInUser,
        })
      } catch (error) {
        res.status(400).send(`Update Failed:` + error.message);
      }
})

module.exports = profileRouter;

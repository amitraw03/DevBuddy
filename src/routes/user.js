const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/requests-pending", userAuth, async (req,res) => {
  try {
    const loggedInUser = req?.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age gender photoUrl about skills")


    res.json({
        message: `Pending Requests fetched Succesfully`,
        data : connectionRequests,
    })
  } catch (error) {
    res.status(400).send(`ERROR: ` + error.message);
  }
});

module.exports = userRouter;

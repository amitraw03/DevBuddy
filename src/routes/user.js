const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/requests-pending", userAuth, async (req, res) => {
  try {
    const loggedInUser = req?.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName age gender photoUrl about skills"
    );

    res.json({
      message: `Pending Requests fetched Succesfully`,
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send(`ERROR: ` + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req?.user._id;

    //to fetch accepted connections 
    const acceptedRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate(
        "fromUserId",
        "firstName lastName age gender photoUrl about skills"
      )
      .populate(
        "toUserId",
        "firstName lastName age gender photoUrl about skills"
      );
      //why 2 populates? cause loggedInUser could be either fromUserId or either toUserID

    //for more simplified and only requirede data
    const requiredData = acceptedRequests.map((row) =>{
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
    });

    res.json({
      message: `Connections Fetched Succesfully`,
      data: requiredData,
    });
  } catch (error) {}
});

module.exports = userRouter;

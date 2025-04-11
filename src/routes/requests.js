const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      //sender ID
      const fromUserId = req?.user._id;
      // target ID
      const toUserId = req.params.toUserId;
      const status = req.params.status; // interest or ignore

      //(1) to validate and make sure fromUserId!=toUserID using Schema Validation using 'pre'

    //(2) to validate status can't be randomed
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: `this` + status + `not allowed!!` });
      }

      //(3) to validate the target user is actually exist in D.B or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res
          .status(400)
          .send(`Such User with userID` + toUserId + `doesn't Exist`);
      }

      //(4)  to validate uniqueness of both parties hwile making a connection
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).send(`Connection request already exists!!`);
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const info = await connectionRequest.save();

      res.json({
        message: `Request Sent successfully!!`,
        info,
      });
    } catch (error) {
      res.status(400).send(`ERROR: ` + error.message);
    }
  }
);

module.exports = requestRouter;

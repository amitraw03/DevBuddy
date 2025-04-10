const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
  try {
    // Read token from req cookies
    const { token } = req?.cookies;
    const decodedToken = await jwt.verify(token, "RAW@WOLF123");

    //validate the token & find the usser
    const { _id } = decodedToken;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error(`User not found`);
    }

    //attach the user info to req
    req.user=user;
    next();
  } catch (error) {
    res.status(500).send(`Error in AUTH :` + error.message);
  }
};

module.exports={
    userAuth,
}

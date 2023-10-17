const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");

const Authenticate = async (req, res, next) => {
  try {
    console.log("*******************");
    const token = req.cookies.jwttoken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Token missing." });
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    // storing these data in req...to be later used somewhere
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized:No token found");
    console.log(err);
  }
};

module.exports = Authenticate;

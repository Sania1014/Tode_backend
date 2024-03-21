
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user_model");

const isAuthenticated=async(req, res, next)=>{
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({ success: false, message: "Login First" });
  }

  const decoded_data = await jsonwebtoken.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded_data);
  next();
}

module.exports=isAuthenticated;
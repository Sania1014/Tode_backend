const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const sendcookie = require("../utils/features");
const { errorhandler } = require("../middlewares/error");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new errorhandler("User already exist", 400)); //400 for bad debt

    const hashed_pass = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashed_pass });
    sendcookie(user, res, "Registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new errorhandler("Invalid Email or password", 400)); //400 for bad debt

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) return next(new errorhandler("Wrong Password", 400)); //400 for bad debt

    sendcookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

const get_my_profile = (req, res, next) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({ success: true, message: "logged out successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  get_my_profile,
  login,
  logout,
};

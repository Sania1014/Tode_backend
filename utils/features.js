const jsonwebtoken = require("jsonwebtoken");

const sendcookie = (user, res, message, statusCode = 200) => {
  const token = jsonwebtoken.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
      sameSite: process.env.NODE_ENV==='Development'? 'lax': 'none',
      secure: process.env.NODE_ENV==='Development'? false: true,
    })
    .json({ success: true, message: message });
};

module.exports = sendcookie;

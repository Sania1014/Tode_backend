const express = require("express");

const {
  register,
  login,
  get_my_profile,
  logout,
} = require("../controllers/user_controllers");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();



router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, get_my_profile);


module.exports = router;

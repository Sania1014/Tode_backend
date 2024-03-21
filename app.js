const express = require("express");
const user_router = require("./routes/user");
const task_router = require("./routes/task");

const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const { error } = require("./middlewares/error");
const cors = require("cors");

config({
  path: "./data/config.env",
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //agr yah true nh krain gy to front end pr credentials like cookies wgaira nh pohanchain gii
  })
);
app.use("/api/v1/users", user_router);
app.use("/api/v1/tasks", task_router);

app.use(error);
app.get("/", (req, res) => {
  res.send("Noice working");
});

//using error middleware
module.exports = app;

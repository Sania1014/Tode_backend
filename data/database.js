const { default: mongoose } = require("mongoose");

const connectdb=()=> mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Todobackend",
  })
  .then(() => {
    console.log("db connected");
  });

  module.exports=connectdb;


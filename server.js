
//we will connect db in server.js and also lsten the app on server and app will nly have middlewares


const app = require("./app");
const connectdb = require("./data/database");

connectdb();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

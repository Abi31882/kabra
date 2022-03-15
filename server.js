const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection successfull");
  });
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

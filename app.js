const express = require("express");
const ProductRouter = require("./Routes/productRoutes");
const UserRouter = require("./Routes/userRoutes");
const cartRouter = require("./Routes/cartRoutes");
const app = express();
const cors = require("cors");
var fileupload = require("express-fileupload");

app.use(fileupload());

app.use(
  cors({
    origin: "*",
  })
);
// app.use(cors());
// app.options("*", cors());

// development logging
if (process.env.NODE_ENV === "development") {
  console.log("development");
}

// production logging
if (process.env.NODE_ENV === "production") {
  console.log("production");
}

app.use("/product", ProductRouter);
app.use("/user", UserRouter);
app.use("/cart", cartRouter);

app.use("*", (req, res) => {
  res.json("could the find the specified url");
});

module.exports = app;

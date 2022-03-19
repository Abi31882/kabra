const express = require("express");
const ProductRouter = require("./Routes/productRoutes");
const UserRouter = require("./Routes/userRoutes");
const cartRouter = require("./Routes/cartRoutes");
const app = express();
const cors = require("cors");
var fileupload = require("express-fileupload");

app.use(fileupload());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://ecstatic-euler-b704c3.netlify.app"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
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

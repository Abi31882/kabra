const express = require("express");
const ProductRouter = require("./Routes/productRoutes");
const app = express();
const cors = require("cors");
var fileupload = require("express-fileupload");

app.use(fileupload());

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/product", ProductRouter);
app.use("/", (req, res) => {
  res.send("hello from the server");
});

module.exports = app;

const productRouter = require("../Routes/productRoutes");
const request = require("supertest");
const express = require("express");
const app = express();
const ProductController = require("../Controllers/productcontroller");
app.use("/", productRouter);
const BASE_URL = "https://boiling-journey-78408.herokuapp.com";

jest.setTimeout(100000);

it("POST /users", async (done) => {
  await request(app)
    .get("/")
    .then((r) => {
      expect(r.body.length).toBe(8);
      console.log(r.body);
      // done();
    });

  // expect(res.statusCode).toBe(200);
  // done();
});

describe("Sample Test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

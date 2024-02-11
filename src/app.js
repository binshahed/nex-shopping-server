require("express-async-errors");
const express = require("express");

const app = express();
const cors = require("cors");
const morgan = require("morgan");

const errors = require("./middlewares/error");

const userRouter = require("./routers/userRouter");
const categoryRouter = require("./routers/categoryRouter");
const brandRouter = require("./routers/brandRouter");
const productRouter = require("./routers/productRouter");

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/user", userRouter);
app.use("/api", categoryRouter);
app.use("/api", brandRouter);
app.use("/api/product", productRouter);
app.use(errors);

module.exports = app;

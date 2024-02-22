const userRouter = require("../routers/userRouter");
const categoryRouter = require("../routers/categoryRouter");
const brandRouter = require("../routers/brandRouter");
const productRouter = require("../routers/productRouter");
const cartRouter = require("../routers/cartRouter");
const profileRouter = require("../routers/profileRouter");

module.exports = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/brand", brandRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/profile", profileRouter);
};

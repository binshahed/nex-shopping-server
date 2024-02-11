const router = require("express").Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
} = require("../controllers/productController");
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");

router.route("/").get(getProducts).post([authorize, admin], createProduct);

router.route("/:id").get(getProductById).patch(updateProductById);

module.exports = router;

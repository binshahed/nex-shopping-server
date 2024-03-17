const router = require("express").Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  getPhoto,
  filterProducts,
  searchProducts,
} = require("../controllers/productController");
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");

router.route("/").get(getProducts).post([authorize, admin], createProduct);

router.route("/search").post(searchProducts);

router
  .route("/:id")
  .get(getProductById)
  .put([authorize, admin], updateProductById);

router.route("/photo/:id").get(getPhoto);

router.route("/filter").post(filterProducts);

module.exports = router;

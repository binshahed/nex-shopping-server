const router = require("express").Router();

const {
  createBrand,
  getBrands,
  getBrandsById,
} = require("../controllers/brandController");
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");

router.route("/brand").post([authorize, admin], createBrand);
router.route("/brand").get(getBrands);
router.route("/brand/:id").get(getBrandsById);

module.exports = router;

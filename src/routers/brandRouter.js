const router = require("express").Router();

const {
  createBrand,
  getBrands,
  getBrandsById,
} = require("../controllers/brandController");
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");

router.route("/").post([authorize, admin], createBrand);
router.route("/").get(getBrands);
router.route("/:id").get(getBrandsById);

module.exports = router;

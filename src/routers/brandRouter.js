const router = require("express").Router();

const { createBrand, getBrand } = require("../controllers/brandController");
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");

router.route("/brand").post([authorize, admin], createBrand);
router.route("/brand").get(getBrand);

module.exports = router;

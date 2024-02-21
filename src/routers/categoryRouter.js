const {
  createCategory,
  getCategories,
  getCategoryId,
} = require("../controllers/categoryControllers");
const router = require("express").Router();

const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");

router.route("/category").post([authorize, admin], createCategory);
router.route("/category").get(getCategories);
router.route("/category/:id").get(getCategoryId);

module.exports = router;

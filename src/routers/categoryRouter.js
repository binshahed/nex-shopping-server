const {
  createCategory,
  getCategories,
  getCategoryId,
} = require("../controllers/categoryControllers");
const router = require("express").Router();

const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");

router.route("/").post([authorize, admin], createCategory);
router.route("/").get(getCategories);
router.route("/:id").get(getCategoryId);

module.exports = router;

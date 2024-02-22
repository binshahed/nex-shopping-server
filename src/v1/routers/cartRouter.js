const {
  getCartItems,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartControllers");
const authorize = require("../middlewares/authorize");

const router = require("express").Router();

router
  .route("/")
  .post(authorize, createCartItem)
  .get(authorize, getCartItems)
  .put(authorize, updateCartItem);

router.route("/:id").delete(authorize, deleteCartItem);

module.exports = router;

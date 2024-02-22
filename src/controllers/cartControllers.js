const _ = require("lodash");
const { CartItem } = require("../models/cartModel");

module.exports.createCartItem = async (req, res) => {
  const { price, product } = _.pick(req.body, ["price", "product"]);
  const item = CartItem.findOne({ user: req.user._id, product: product });

  if (item) {
    return res.status(400).send("Item already exist");
  }

  const cartItem = new CartItem({
    user: req.user._id,
    product: product,
    price: price,
  });
  const result = await cartItem.save();
  return res.status(201).send({
    message: "Item added to cart",
    item: result,
  });
};

module.exports.getCartItems = async (req, res) => {
  const cartItems = await CartItem.find({ user: req.user._id })
    .populate("product", "name")
    .populate("user", "name");

  return res.status(200).send(cartItems);
};

module.exports.updateCartItem = async (req, res) => {
  const { _id, count } = _.pick(req.body, ["count", "_id"]);
  const userId = req.user._id;
  await CartItem.updateOne({ _id: userId, count: count });
  return res.status(200).send({ message: "item updated!!" });
};

module.exports.deleteCartItem = async (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  await CartItem.deleteOne({ user: userId, _id: _id });

  return res.status(200).send({ message: "item deleted!!" });
};

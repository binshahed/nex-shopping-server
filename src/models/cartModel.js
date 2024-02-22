const { Schema, model } = require("mongoose");

const CartItemSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    price: Number,
    count: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const CartItem = model("CartItem", CartItemSchema);

module.exports = { CartItem, CartItemSchema };

const Joi = require("joi");
const { Schema, model } = require("mongoose");

module.exports.Product = model(
  "Product",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discountPercentage: {
        type: Number,
        default: 0,
      },
      stockQuantity: {
        type: Number,
        required: true,
      },

      photoUrl: {
        data: Buffer,
        contentType: String,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
      },
      variants: {
        type: {
          size: String,
          color: String,
          weight: String,
          variantQuantity: String,
        },
        default: {},
      },
    },
    { timestamps: true }
  )
);

module.exports.validate = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(2000).required(),
    price: Joi.number().required(),
    stockQuantity: Joi.number().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
  });
  return schema.validate(product);
};

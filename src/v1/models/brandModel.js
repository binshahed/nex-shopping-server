const Joi = require("joi");
const { Schema, model } = require("mongoose");

module.exports.Brand = model(
  "Brand",
  new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }
  )
);

module.exports.validate = (brand) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });
  return schema.validate(brand);
};

const Joi = require("joi");
const { Schema, model } = require("mongoose");

module.exports.Category = model(
  "Category",
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

module.exports.validate = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(category);
};

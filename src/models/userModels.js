const { Schema, model } = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: [3, "Must be at least 3"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
      minlength: [5, "Must be at least 5"],
    },
    password: {
      type: String,
      required: true,
      maxlength: 1024,
      minlength: [5, "Must be at least 5"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, name: this.name, role: this.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
};

module.exports.UserSchema = User;

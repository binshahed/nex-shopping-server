const { Schema, model } = require("mongoose");

module.exports.Profile = model(
  "Profile",
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postCode: String,
    country: String,
  })
);

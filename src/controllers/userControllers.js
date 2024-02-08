const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/userModels");

// sign up
module.exports.signUp = async (req, res) => {
  // checking user give valid information

  const { error } = validate(req.body); // Use destructuring to get the 'error' property
  if (error) {
    return res.status(400).send("something went wrong!!!");
  }
  let user = {};

  //   checking user already exist or not
  user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).send("User already registered");
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  // hash passwords
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  // generate token
  const token = user.generateJWT();

  // result save
  const result = await user.save();
  return res.status(201).send({
    message: "Registration Successful!",
    token,
    user: _.pick(result, ["_id", "name", "email"]),
  });
};

// sign in
module.exports.signIn = async (req, res) => {
  // checking valid email
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  // checking correct password
  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) {
    return res.status(400).send("Invalid email or password");
  }

  // generate token
  const token = user.generateJWT();
  // send response
  return res.status(200).send({
    message: "Login Successful!",
    token,
    user: _.pick(user, ["_id", "name", "email"]),
  });
};

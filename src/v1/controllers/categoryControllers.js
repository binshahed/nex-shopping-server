const _ = require("lodash");
const { Category, validate } = require("../models/categoryModel");

module.exports.createCategory = async (req, res) => {
  const { error } = validate(_.pick(req.body, ["name"]));
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let category = {};

  category = await Category.findOne({ name: req.body.name });

  if (category) {
    return res.status(400).send("Category already exist");
  }

 

  category = new Category(_.pick(req.body, ["name"]));

  const result = await category.save();
  return res.status(201).send({
    message: "Category Created!",
    category: _.pick(result, ["_id", "name"]),
  });
};

module.exports.getCategories = async (req, res) => {
  const categories = await Category.find()
    .select({ _id: 1, name: 1 })
    .sort({ name: 1 });

  return res.status(200).send(categories);
};
module.exports.getCategoryId = async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);

  return res.status(200).send(category);
};

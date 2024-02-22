const _ = require("lodash");
const { Brand, validate } = require("../models/brandModel");

module.exports.createBrand = async (req, res) => {
  const { error } = validate(_.pick(req.body, ["name"]));
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let brand = {};

  brand = await Brand.findOne({ name: req.body.name });

  if (brand) {
    return res.status(400).send("Brand already exist");
  }

  brand = new Brand(_.pick(req.body, ["name"]));

  const result = await brand.save();
  return res.status(201).send({
    message: "Brand Created!",
    brand: _.pick(result, ["_id", "name"]),
  });
};

module.exports.getBrands = async (req, res) => {
  const brand = await Brand.find()
    .select({ _id: 1, name: 1 })
    .sort({ name: 1 });

  return res.status(200).send(brand);
};

module.exports.getBrandsById = async (req, res) => {
  const brandId = req.params.id;
  const brand = await Brand.findById(brandId);

  return res.status(200).send(brand);
};

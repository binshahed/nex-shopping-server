const _ = require("lodash");
const { Product, validate } = require("../models/productModel");
const formidable = require("formidable");
const fs = require("fs");

module.exports.createProduct = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    const transferFiles = { photoUrl: files?.photoUrl[0] };

    const transformedFields = {
      name: fields.name[0],
      description: fields.description[0],
      price: fields.price[0],
      stockQuantity: fields.stockQuantity[0],
      category: fields.category[0],
      brand: fields.brand[0],
    };

    if (err) {
      return res.status(400).send(err.message);
    }

    const { error } = validate(
      _.pick(transformedFields, [
        "name",
        "description",
        "price",
        "category",
        "brand",
        "stockQuantity",
      ])
    );

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const product = new Product(transformedFields);

    if (transferFiles.photoUrl) {
      try {
        const data = await fs.promises.readFile(
          transferFiles.photoUrl.filepath
        );
        product.photoUrl.data = data;
        product.photoUrl.contentType = transferFiles.photoUrl.type;

        const result = await product.save();
        return res.status(200).send({
          message: "product created successfully",
          data: _.pick(result, [
            "name",
            "description",
            "price",
            "category",
            "brand",
            "stockQuantity",
          ]),
        });
      } catch (error) {
        return res.status(400).send("Internal Server Error!");
      }
    } else {
      return res.status(400).send("No image provided!");
    }
  });
};

module.exports.getProducts = async (req, res) => {
  //?order=desc&sortBy=name&limit=10
  let order = req.query.order === "desc" ? -1 : 1;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  console.log(req.query);
  const products = await Product.find()
    .select({ photoUrl: 0 })
    .sort({ [sortBy]: order })
    .populate("category", "name")
    .populate("brand", "name");
  return res.status(200).send(products);
};

module.exports.getProductById = async (req, res) => {};
module.exports.updateProductById = async (req, res) => {};

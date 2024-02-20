const _ = require("lodash");
const { Product, validate } = require("../models/productModel");
const formidable = require("formidable");
const fs = require("fs");

// create product
module.exports.createProduct = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    const fieldsValue = _.mapValues(fields, (value) => value[0]);
    const transferFiles = _.mapValues(files, (value) => value[0]);

    if (err) {
      return res.status(400).send(err.message);
    }

    const { error } = validate(
      _.pick(fieldsValue, [
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

    const product = new Product(fieldsValue);

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

// get all products
module.exports.getProducts = async (req, res) => {
  // ?order=desc&sortBy=name&limit=10
  let order = req.query.order === "desc" ? -1 : 1;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  console.log(req.query);
  try {
    const products = await Product.find()
      .select({ photoUrl: 0 })
      .sort({ [sortBy]: order })
      .limit(limit)
      .populate("category", "name")
      .populate("brand", "name");

    return res.status(200).send(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

// get product by id
module.exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId)
      .select({ photoUrl: 0 })
      .populate("category", "name")
      .populate("brand", "name");

    if (!product) {
      return res.status(404).send("Product not found");
    }

    return res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
};

// get photo
module.exports.getPhoto = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId).select({
      photoUrl: 1,
      _id: 0,
    });
    res.set("Content-Type", product.photoUrl.contentType);
    return res.status(200).send(product.photoUrl.data);
  } catch (error) {
    console.log(error);
  }
};

// update product
module.exports.updateProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    const fieldsValue = _.mapValues(fields, (value) => value[0]);
    const filesValue = _.mapValues(files, (value) => value[0]);
    if (err) {
      return res.status(400).send("Something went wrong with form parsing.");
    }

    const updatedFields = _.pick(fieldsValue, [
      "name",
      "description",
      "price",
      "description",
      "brand",
      "discountPercentage",
      "stockQuantity",
      "variants",
    ]);

    // update specific fields
    _.assignIn(product, updatedFields);

    if (filesValue?.photoUrl) {
      //import image with file system
      fs.readFile(filesValue.photoUrl?.filepath, async (err, data) => {
        if (err) {
          return res.status(400).send(err.message);
        }
        product.photoUrl.data = data;
        product.photoUrl.contentType = filesValue.photoUrl.type;
        const result = await product.save();
        return res.status(200).send({
          message: "product updated successfully",
          data: _.pick(result, [
            "name",
            "description",
            "price",
            "category",
            "brand",
            "stockQuantity",
          ]),
        });
      });
    }
    //update product without images
    else {
      const result = await product.save();
      return res.status(200).send({
        message: "product updated successfully",
        data: _.pick(result, [
          "name",
          "description",
          "price",
          "category",
          "brand",
          "stockQuantity",
        ]),
      });
    }
  });
};

//filter products

module.exports.filterProducts = async (req, res) => {
  let order = req.body.order === "desc" ? -1 : 1;
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = parseInt(req.body.skip);

  const products = await Product.find()
    .select({ photoUrl: 0 })
    .populate("category", "name")
    .populate("brand", "name")
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit);

  return res.status(200).send(products);
};

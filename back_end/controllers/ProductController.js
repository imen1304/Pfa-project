var multer = require("multer");
const path = require("path");

const fs = require("fs");
const Product = require("../models/Product");

//File size
const maxsize = 1024 * 1024 * 1024 * 40;
const filetype = /jpeg|jpg|png/;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req ", file);
    const dir = `./uploads/shop/products/`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  //limits: { fileSize: maxsize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = filetype;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
});

var upload = multer({ storage: storage }).any();

exports.CreateProduct = async (req, res) => {
  upload(req, res, async (err) => {
    console.log("req body ", req.body);
    console.log("req files ", req.files);
    const path = req.files[0].path;

    const newPath = path.replace(/\\/g, "/");

    const product = new Product(req.body);

    product.image = newPath;

    await product.save();

    res.send({ message: "saved", product: product });
  });
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();

  res.send({ products });
};

exports.delteProduct = async (req, res) => {
  const productId = req.body.productId;

  const productDeleted = await Product.deleteOne({ _id: productId });
  console.log("delte user ", productDeleted);

  res.send({ message: "product deleted" });
};

exports.updateProdcut = async (req, res) => {};

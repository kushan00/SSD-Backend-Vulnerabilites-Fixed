const productsServices = require("../services/products.services");
const upload = require("../middlewares/upload");
const logger = require('../Log/Logger.js');

// Create and Save a new Product
exports.create = (req, res, next) => {

      var model = {
        category: req.body.category,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        expireDate: req.body.expireDate,
        quantity: req.body.quantity,
        productImage: req.body.productImage,
      };

      productsServices.createProduct(model, (error, results) => {
        if (error) {
          logger.error(error.message);
          return next(error);
        }
        return res.status(200).send({
          message: "Success",
          data: results,
        });
      });
    }


// Retrieve all Products from the database.
exports.findAll = (req, res, next) => {
  import('escape-string-regexp')
    .then((module) => {
      const escapeStringRegexp = module.default; // Get the exported function
      const model = {
        productName: escapeStringRegexp(req.query.productName || ''),
      };

      productsServices.getProducts(model, (error, results) => {
        if (error) {
          logger.error(error.message);
          return next(error);
        }
        return res.status(200).send({
          message: "Success",
          data: results,
        });
      });
    })
    .catch((err) => {
      logger.error('Error importing escape-string-regexp:', err);
      // Handle the error as needed
    });
};


// Find a single Tutorial with an id
exports.findOne = (req, res, next) => {
  var model = {
    productId: req.params.id,
  };

  productsServices.getProductById(model, (error, results) => {
    if (error) {
      logger.error(error.message);
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

// Update a Product by the id in the request
exports.update = (req, res, next) => {
      const { id } = req.params;
      var model = {
        category: req.body.category,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        expireDate: req.body.expireDate,
        quantity: req.body.quantity,
        productImage:req.body.productImage,
        productId:id,
      };

      console.log(model);

      productsServices.updateProduct(model, (error, results) => {
        if (error) {
          logger.error(error.message);
          return next(error);
        }
        return res.status(200).send({
          message: "Success",
          data: results,
        });
      });
    }


// Delete a Product with the specified id in the request
exports.delete = (req, res, next) => {
  var model = {
    productId: req.params.id,
  };

  productsServices.deleteProduct(model, (error, results) => {
    if (error) {
      logger.error(error.message);
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

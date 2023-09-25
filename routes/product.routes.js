const productsController = require("../controllers/products.controller");
const express = require("express");
const router = express.Router();

// Create a new Product
router.post("/createproducts", productsController.create);

// Retrieve all Products
router.get("/getproducts", productsController.findAll);

// Retrieve a single Product with id
router.get("/products/:id", productsController.findOne);

// Update a Product with id
router.put("/updateproducts/:id", productsController.update);

// // Delete a Product with id
router.delete("/deleteproducts/:id", productsController.delete);

module.exports = router;

const express = require("express");
const router = express.Router();

const {getPayment, getPayments, createPayment} = require("../Controllers/paymentController");


router.post("/createPayment",createPayment);
router.get("/getPayments",getPayments);
router.get("/getPaymentById/:id",getPayment);



module.exports = router;

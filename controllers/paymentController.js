const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");

const paymentModel = require("../models/paymentModel");

 const getPayments = async (req, res) => { 
    try {
        const payments = await paymentModel.find();
                 
        apiResponse.Success(res,"payments",{ payments: payments })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const getPayment = async (req, res) => { 
    const { id } = req.params;

    try {
        const payment = await paymentModel.findById(id);
        
        apiResponse.Success(res,"payment",{ payment: payment })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createPayment = async (req, res) => {
    const payment = req.body;
    console.log("body data ",payment);
    const newPayment = new paymentModel({ ...payment, creator: req.paymentId, })
    console.log("Saved data",newPayment);
    try {
        await newPayment.save();
        
        apiResponse.Success(res,"NewPayment",{ newPayment: newPayment })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


module.exports = {getPayment, getPayments,createPayment};
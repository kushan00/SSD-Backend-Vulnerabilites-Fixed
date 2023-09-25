const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");

const cardModel = require("../models/cardModel");

 const getCards = async (req, res) => { 
    try {
        const cards = await cardModel.find();
                 
        apiResponse.Success(res,"cards",{ cards: cards })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const getCard = async (req, res) => { 
    const { id } = req.params;

    try {
        const card = await cardModel.findById(id);
        
        apiResponse.Success(res,"card",{ card: card })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createCard = async (req, res) => {
    const card = req.body;

    const newCard = new cardModel({ ...card, creator: req.cardId, })
    console.log("Saved data",newCard);
    try {
        await newCard.save();
        
        apiResponse.Success(res,"Newcard",{ newCard: newCard })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


module.exports = {getCard, getCards,createCard};
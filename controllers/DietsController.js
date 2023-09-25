const express = require("express");
const mongoose = require("mongoose");
const apiResponse = require("../helpers/apiResponse");

const dietModel = require("../models/dietModel");

const getDiets = async (req, res) => {
    try {
        const diets = await dietModel.find();

        apiResponse.Success(res, "Diets", { diets: diets });
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
};

const getDiet = async (req, res) => {
    const { id } = req.params;

    try {
        // const diet = await dietModel.findById(id);
        const diet = await dietModel.find({ "user_id": id });

        apiResponse.Success(res, "Diet", { diet: diet });
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
};

const createDiet = async (req, res) => {
    const diet = req.body;

    const newDiet = new dietModel({ ...diet, creator: req.dietId });
    console.log("Saved data", newDiet);
    try {
        await newDiet.save();

        apiResponse.Success(res, "NewDiet", { newDiet: newDiet });
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
};

const updateDiet = async (req, res) => {
    const { id } = req.params;
    const { user_id, diet_id, workout_type, meal1, meal2, meal3, meal4, meal5, meal6  } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const updatedDiet = { user_id, diet_id, workout_type, meal1, meal2, meal3, meal4, meal5, meal6, _id: id };

    await dietModel.findByIdAndUpdate(id, updatedDiet, { new: true });

    apiResponse.Success(res, "Diet Updated", {});
};

const deleteDiet = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    await dietModel.findByIdAndRemove(id);

    apiResponse.Success(res, "Diet Deleted", {});
};

module.exports = { getDiets, getDiet, createDiet, updateDiet, deleteDiet };
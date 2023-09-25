const express = require("express");
const mongoose = require("mongoose");
const apiResponse = require("../helpers/apiResponse");

const workoutModel = require("../models/workoutModel");

const getWorkouts = async (req, res) => {
    try {
        const workouts = await workoutModel.find();
    
        apiResponse.Success(res, "Workouts", { workouts: workouts });
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
    };

const getWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        // const workout = await workoutModel.findById(id);
        const workout = await workoutModel.find({ "user_id": id });

        apiResponse.Success(res, "Workout", { workout: workout });
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
}

const createWorkout = async (req, res) => {
    const workout = req.body;

    const newWorkout = new workoutModel({ ...workout, creator: req.workoutId, });
    console.log("Saved data", newWorkout);
    try {
        await newWorkout.save();

        apiResponse.Success(res, "NewWorkout", { newWorkout: newWorkout });
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { user_id, workout_id, workout_type, exercise1, exercise2, exercise3, exercise4, exercise5, exercise6 } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedWorkout = { user_id, workout_id, workout_type, exercise1, exercise2, exercise3, exercise4, exercise5, exercise6, _id: id };

    await workoutModel.findByIdAndUpdate(id, updatedWorkout, { new: true });

    apiResponse.Success(res, "Workout Updated", {});
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    await workoutModel.findByIdAndRemove(id);

    apiResponse.Success(res, "Workout Deleted", {});
}

module.exports = { getWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout };
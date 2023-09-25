const express = require("express");
const router = express.Router();

const {getWorkout, getWorkouts, deleteWorkout, createWorkout, updateWorkout} = require("../Controllers/WorkoutsController");

router.post("/createWorkout",createWorkout);
router.get("/getAllWorkouts",getWorkouts);
router.get("/getWorkoutById/:id",getWorkout);
router.delete("/deleteWorkout/:id",deleteWorkout);
router.put("/updateWorkout/:id",updateWorkout);

module.exports = router;
const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    user_id: {
        type:String,
        required: false,
    },
    workout_id: {
        type: String,
        required: false,
    },
    workout_type: {
        type: String,
        required: true,
    },
    exercise1: {
        type: String,
        required: true,
    },
    exercise2: {
        type: String,
        required: true,
    },
    exercise3: {
        type: String,
        required: true,
    },
    exercise4: {
        type: String,
        required: true,
    },
    exercise5: {
        type: String,
        required: true,
    },
    exercise6: {
        type: String,
        required: true,
    },

},
{
    timestamps: true,
}
);

module.exports = Workout = mongoose.model("workout", WorkoutSchema);
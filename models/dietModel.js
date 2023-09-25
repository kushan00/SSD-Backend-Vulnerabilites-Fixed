const mongoose = require("mongoose");

const DietSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: false,
    },
    diet_id: {
        type: String,
        required: false,
    },
    workout_type: {
        type: String,
        required: true,
    },
    meal1: {
        type: String,
        required: true,
    },
    meal2: {
        type: String,
        required: true,
    },
    meal3: {
        type: String,
        required: true,
    },
    meal4: {
        type: String,
        required: true,
    },
    meal5: {
        type: String,
        required: true,
    },
    meal6: {
        type: String,
        required: true,
    },

},
{
    timestamps: true,
}
);

module.exports = Diet = mongoose.model("diet", DietSchema);
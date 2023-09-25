const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    gym_id: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	mobileno: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
    dateOfBirth: {
		type: String,
		required: true,
	},
	weight: {
		type: String,
        required: true,
	},
	height: {
		type: String,
        required: true,
	},
	status: {
		type: String,
        default:null
	},
	instructor: {
		type: String,
        default:null
	},
    memberShip: {
		type: String,
        default: null
	},
    password: {
		type: String,
		required: true,
	}, 
	userRole: {
		type: String,
		default: "user",
	},
},
{
    timestamps: true,
}
);

module.exports = User = mongoose.model("user", UserSchema);
const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
    instructor_id: {
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
    salary: {
		type: String,
        default:null
	},
    password: {
		type: String,
		required: true,
	}, 
    userRole: {
		type: String,
		default: "instructor",
	}, 
},
{
    timestamps: true,
}
);

module.exports = Instructor = mongoose.model("instructor", InstructorSchema);
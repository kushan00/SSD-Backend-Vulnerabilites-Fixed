const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
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
	status: {
		type: String,
        default:null
	},
    password: {
		type: String,
		required: true,
	}, 
    userRole: {
		type: String,
		default: "admin",
	},
},
{
    timestamps: true,
}
);

module.exports = Admin = mongoose.model("admin", AdminSchema);
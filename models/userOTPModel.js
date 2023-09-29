const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: {},
        required: true,
	},
},
{
    timestamps: true,
}
);

module.exports = OTP = mongoose.model("otp", OtpSchema);
const mongoose = require("mongoose"); 

const MembershipsSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
	},
    price: {
        type: String,
		required: true,
    },
	duration: {
        type: String,
		required: true,
    },
	description: {
        type: String,
		required: true,
    },
},
{
	timestamps: true,
}
);

module.exports = Equipments = mongoose.model("Memberships", MembershipsSchema);

const mongoose = require("mongoose"); 

const EquipmentsSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
	},
    quantity: {
        type: String,
		required: true,
    },
	value: {
        type: String,
		required: true,
    },
	company_name: {
        type: String,
		required: true,
    },
	date_of_purchaced: {
        type: String,
		required: true,
    },
	category: {
        type: String,
		required: true,
    },
},
{
	timestamps: true,
}
);

module.exports = Equipments = mongoose.model("Equipments", EquipmentsSchema);

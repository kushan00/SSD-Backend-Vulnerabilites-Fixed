const mongoose = require("mongoose"); 

const PaymentSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
	},
    email: {
		type: String,
		required: true,
	},
    mobile: {
		type: String,
		required: true,
	},

    address:{
        type:String,
        required:true,
    },
    method:{
        type:String,
        required:true,
    },
	total:{
		type:String,
		required:true,
	},
	Items:{
		type:[],
		required:true
	}
    
},
{
	timestamps: true,
}
);

module.exports = Payment = mongoose.model("Payment", PaymentSchema);

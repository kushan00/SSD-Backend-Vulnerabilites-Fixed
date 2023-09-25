const mongoose = require("mongoose"); 

const CardSchema = new mongoose.Schema({

    ctype:{
        type:String,
        // required:true,
    },
    holder:{
        type:String,
        required:true,
    },
    cardNum:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    },
    month:{
        type:String,
        required:true,
    },
    cvv:{
        type:String,
        required:true,
    },
},
{
	timestamps: true,
}
);

module.exports = Card = mongoose.model("Card", CardSchema);

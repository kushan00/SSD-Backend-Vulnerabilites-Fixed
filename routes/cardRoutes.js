const express = require("express");
const router = express.Router();

const {getCard, getCards, createCard} = require("../Controllers/CardController");


router.post("/createCard",createCard);
router.get("/getCards",getCards);
router.get("/getCardById/:id",getCard);



module.exports = router;

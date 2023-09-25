const express = require("express");
const router = express.Router();

const {getDiet, getDiets, deleteDiet, createDiet, updateDiet} = require("../Controllers/DietsController");

router.post("/createDiet",createDiet);
router.get("/getAllDiets",getDiets);
router.get("/getDietById/:id",getDiet);
router.delete("/deleteDiet/:id",deleteDiet);
router.put("/updateDiet/:id",updateDiet);

module.exports = router;
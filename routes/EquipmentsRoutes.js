const express = require("express");
const router = express.Router();

const {getEquipment, getEquipments, deleteEquipment, createEquipment, updateEquipment} = require("../Controllers/EquipmentsController");


router.post("/createEquipment",createEquipment);
router.get("/getAllEquipments",getEquipments);
router.get("/getEquipmentById/:id",getEquipment);
router.delete("/deleteEquipment/:id",deleteEquipment);
router.put("/updateEquipment/:id",updateEquipment);


module.exports = router;

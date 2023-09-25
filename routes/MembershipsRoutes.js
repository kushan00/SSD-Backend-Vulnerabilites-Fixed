const express = require("express");
const router = express.Router();

const {getMembership, getMemberships, deleteMembership, createMembership, updateMembership} = require("../Controllers/MembershipsController");


router.post("/createMembership",createMembership);
router.get("/getAllMemberships",getMemberships);
router.get("/getMembershipById/:id",getMembership);
router.delete("/deleteMembership/:id",deleteMembership);
router.put("/updateMembership/:id",updateMembership);


module.exports = router;

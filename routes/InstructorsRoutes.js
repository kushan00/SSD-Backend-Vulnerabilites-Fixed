const express = require("express");
const router = express.Router();

const {getInstructor, getInstructors, deleteInstructor, createInstructor, updateInstructor} = require("../Controllers/InstructorsController");


router.post("/createInstructor",createInstructor);
router.get("/getAllInstructors",getInstructors);
router.get("/getInstructorById/:id",getInstructor);
router.delete("/deleteInstructor/:id",deleteInstructor);
router.put("/updateInstructor/:id",updateInstructor);

module.exports = router;

//instructor routes end
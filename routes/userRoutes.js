const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getUsers ,createUser , updateUserInstructor , updateUserMemberShip , updateUser , deleteUser , getUserWorkOutAndDietPlans, getOneUser} = require("../controllers/userController.js");


router.post("/create-user",
	[
		check("email", "Please include a valid email").isEmail(),
	],
	createUser);
router.get("/all-users",getUsers);
router.get("/:id",getOneUser);
router.put("/update-instructor/:id",updateUserInstructor);
router.put("/update-memberShip/:id",updateUserMemberShip);
router.put("/update-user/:id",updateUser);
router.delete("/delete-user/:id",deleteUser);
router.get("/get-user-workout-diet-plans/:id",getUserWorkOutAndDietPlans);

module.exports = router;

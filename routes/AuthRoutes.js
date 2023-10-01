const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const passwordValidator = require("../middlewares/passwordValidator");
const { check } = require("express-validator");
const { registerUser ,authUser , loginUser , updateAdmin  ,   sendUserOTP, verifyUserOTP} = require("../controllers/AuthControllers.js"); 


router.post("/signup",
	[
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter password with 8 or more characters"
		).isLength({ min: 8 }),
	],
	registerUser);

router.get("/auth", auth,authUser);

router.post(
	"/signin",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	passwordValidator,
	loginUser);

router.post("/send-otp",sendUserOTP);

router.post("/verify-otp",verifyUserOTP);

router.put("/update-admin/:id",updateAdmin);


module.exports = router;

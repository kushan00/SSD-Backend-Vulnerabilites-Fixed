const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const passwordValidator = require("../middlewares/passwordValidator");
const registrationValidation = require("../middlewares/RegisterValidation");
const loginValidation = require("../middlewares/loginValidation");
const { check } = require("express-validator");
const { registerUser ,authUser , loginUser , updateAdmin  ,   sendUserOTP, verifyUserOTP , verifyOAuthLogins} = require("../controllers/AuthControllers.js"); 


router.post('/verify-OAuth-Token',verifyOAuthLogins);

router.post("/signup",
	[
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter password with 8 or more characters"
		).isLength({ min: 8 }),
	],
  registrationValidation,
	registerUser);

router.get("/auth", auth,authUser);

router.post(
	"/signin",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
  loginValidation,
	passwordValidator,
	loginUser);

router.post("/send-otp",sendUserOTP);

router.post("/verify-otp",verifyUserOTP);

router.put("/update-admin/:id",updateAdmin);

router.post(
  "/signin",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginValidation,
  loginUser
);

router.put("/update-admin/:id", updateAdmin);

module.exports = router;

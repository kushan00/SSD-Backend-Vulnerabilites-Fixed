const passwordValidator = require('password-validator');

module.exports = function (req, res, next) {

    const {  password } = req.body;

    // Create a password schema
    const passwordSchema = new passwordValidator();

    // Add password rules
    passwordSchema
    .is().min(8)  // Minimum length
    .is().max(100)  // Maximum length
    .has().uppercase()  // Must have at least one uppercase letter
    .has().lowercase()  // Must have at least one lowercase letter
    .has().digits()  // Must have at least one digit
    .has().symbols()  // Must have at least one special character
    .is().not().oneOf(['password']);  // Cannot be a common password

    // Validate a password
    const isPasswordValid = passwordSchema.validate(password);

    
    try {
		if (isPasswordValid) {
            // Password is valid
            next();
        } else {
            // Password is not valid
            res.status(401).json({ msg: "Password is not valid" });
        }		
	} catch (err) {
		res.status(401).json({ msg: "Password is not valid" });
	}
}
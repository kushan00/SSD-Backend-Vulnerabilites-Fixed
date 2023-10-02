const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

/* Loading the environment variables from the .env file. */
dotenv.config();

var jwtSecret = process.env.KEY;

module.exports = function (req, res, next) {
	//Get token from header
	//const token = req.header("x-auth-token");
	const token = req.headers.authorization.split(' ')[1];
	//Check if there is no token in the header
	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied" });
	}

	//Verify token
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: "Token is not valid" });
	}
};

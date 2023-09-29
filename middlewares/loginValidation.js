const xss = require("xss");

// Sanitization function using xss
const sanitize = (input) => xss(input);

module.exports = function (req, res, next) {
  try {
    // Check if email and password exist in the request body
    if (req.body.email) {
      req.body.email = sanitize(req.body.email);
    }
    if (req.body.password) {
      req.body.password = sanitize(req.body.password);
    }  

    next();
  } catch (err) {
    res.status(401).json({ msg: "Input is not acceptable" });
  }
};

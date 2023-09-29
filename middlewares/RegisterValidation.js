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

    if (req.body.fullName) {
      req.body.fullName = sanitize(req.body.fullName);
    }

    if (req.body.mobileno) {
      req.body.mobileno = sanitize(req.body.mobileno);
    }

    if (req.body.weight) {
      req.body.weight = sanitize(req.body.weight);
    }

    if (req.body.dateOfBirth) {
      req.body.dateOfBirth = sanitize(req.body.dateOfBirth);
    }

    if (req.body.height) {
      req.body.height = sanitize(req.body.height);
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Input is not acceptable" });
  }
};

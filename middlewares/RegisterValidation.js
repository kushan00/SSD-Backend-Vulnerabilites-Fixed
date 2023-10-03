module.exports = function (req, res, next) {
  try {
    if (req.body.email) {
      if (!isValidInput(req.body.email)) {
        throw new Error("Invalid input in email");
      }
    }
    if (req.body.password) {
      if (!isValidInput(req.body.password)) {
        throw new Error("Invalid input in password");
      }
    }

    if (req.body.fullName) {
      if (!isValidInput(req.body.fullName)) {
        throw new Error("Invalid input in fullName");
      }
    }

    if (req.body.mobileno) {
      if (!isValidInput(req.body.mobileno)) {
        throw new Error("Invalid input in mobileno");
      }
    }

    if (req.body.weight) {
      if (!isValidInput(req.body.weight)) {
        throw new Error("Invalid input in weight");
      }
    }

    if (req.body.dateOfBirth) {
      if (!isValidInput(req.body.dateOfBirth)) {
        throw new Error("Invalid input in dateOfBirth");
      }
    }

    if (req.body.height) {
      if (!isValidInput(req.body.height)) {
        throw new Error("Invalid input in height");
      }
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Input is not acceptable" });
  }
};

function isValidInput(input) {
  const htmlPattern = /<[^>]*>/;
  return !htmlPattern.test(input);
}

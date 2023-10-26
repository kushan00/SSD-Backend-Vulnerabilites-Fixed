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

    next();
  } catch (err) {
    res.status(401).json({ msg: "Input is not acceptable" });
  }
};

function isValidInput(input) {
  const htmlPattern = /<[^>]*>/;
  return !htmlPattern.test(input);
}

const jwt = require("jsonwebtoken");
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns an error if the user is not authenticated
 */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};

// this middleware always call after authorize middleware
module.exports = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Forbidden!" });
  }
};

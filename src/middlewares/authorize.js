// const jwt = require("jsonwebtoken");

// module.exports = async function (req, res, next) {
//   let token = req.headers("Authorization");
//   if (!token) {
//     return res
//       .status(401)
//       .send({ message: "Access denied! No token provided" });
//   }

//   token = token.split(" ")[1].trim();

//   try {
//     const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       return res
//         .status(401)
//         .send({ message: "Access denied! Token has expired" });
//     }
//     return res.status(401).send({ message: "Access denied! Invalid token" });
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Access denied! No token provided" });
    }

    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .send({ message: "Access denied! Token has expired" });
    }
    return res.status(401).send({ message: "Access denied! Invalid token" });
  }
};

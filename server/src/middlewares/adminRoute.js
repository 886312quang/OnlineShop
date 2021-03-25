const jwtHelper = require("../helpers/jwt.helper");
const { User } = require("../helpers/role");

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET ||
  "access-token-secret-example.com-blue-cat-a@456";

let authorize = (roles = User.role) => async (req, res) => {
  const tokenFromClient =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenSecret,
      );

      req.jwtDecoded = decoded;

      const role = decoded.data.role;

      if (roles.length && !roles.includes(role)) {
        // user's role is not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }

      return res.status(200).json(role);
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

module.exports = {
  authorize,
};

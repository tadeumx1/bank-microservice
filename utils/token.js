const jwt = require("jsonwebtoken");

const getTokenInfo = (token) => {
  return jwt.decode(token);
}

module.exports = getTokenInfo;

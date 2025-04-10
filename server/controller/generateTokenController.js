const crypto = require("crypto")

const generateToken = () => {
  return crypto.randomBytes(64).toString("hex")
}

module.exports = generateToken 
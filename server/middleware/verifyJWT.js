const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header

  if (!token) {
    return res.status(401).json({ message: 'Access token is required.' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    req.userId = decoded.userId;
    req.roles = decoded.roles;
    req.email = decoded.email;
    
    next();
  });
};

module.exports = verifyJWT;
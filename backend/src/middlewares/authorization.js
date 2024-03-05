const jwt = require('jsonwebtoken');
const errorFunction = require('../utils/errorFunction');
const { UNAUTHORIZED } = require('../utils/statusCode');

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(errorFunction(UNAUTHORIZED, 'Token not found'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 's3cr3t');

    req.user = decoded.data;

    return next();
  } catch (err) {
    return next(errorFunction(UNAUTHORIZED, 'Expired or invalid token'));
  }
};

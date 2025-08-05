const jwt = require('jsonwebtoken');
const config = require('../config');
const ApiError = require('../api-error');

module.exports = function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return next(new ApiError(401, 'Unauthorized'));

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.app.jwtSecret);
    req.user = payload;  // { id, role }
    next();
  } catch {
    next(new ApiError(401, 'Invalid token'));
  }
};
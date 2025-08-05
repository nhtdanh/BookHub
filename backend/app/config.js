require('dotenv').config()
const config = {
  app: {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret', //jwt
    jwtExpiresIn: '1d'
  },
  db: {
    uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/BookHub",
  },
};

module.exports = config;

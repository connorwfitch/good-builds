module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
  sessionSecret: process.env.SESSION_SECRET,
  seedpass1: process.env.SEEDPASS1,
  seedpass2: process.env.SEEDPASS2
};

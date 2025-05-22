require('dotenv').config();

const {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DATABASE_URL,
} = process.env;

module.exports = {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DATABASE_URL,
};

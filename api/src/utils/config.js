require('dotenv').config();

const { PORT, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const DATABASE_URL =
  process.env.NODE_ENV === 'development'
    ? `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`
    : process.env.DATABASE_URL;

const CORS_ORIGIN =
  process.env.NODE_ENV === 'development'
    ? '*'
    : 'https://food-api-iota.vercel.app';

module.exports = {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DATABASE_URL,
  CORS_ORIGIN,
};

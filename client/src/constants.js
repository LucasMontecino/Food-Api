export const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://food-api-rest.vercel.app';

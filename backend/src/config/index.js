require('dotenv').config();

export const { PORT, HOST, MONGO_URI, JWT_SECRET, JWT_EXPIRES } = process.env;

import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

require('dotenv').config();

const { JWT_SECRET } = process.env;

const checkAuth = context => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid or Expired Token');
      }
    }
    throw new Error('Authentication token must be Bearer [token]');
  }
  throw new Error('Authorization header must be provided');
};

export default checkAuth;

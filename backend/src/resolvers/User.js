/* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';

import { User } from '../models';
import { signInSchema, signUpSchema } from '../schemas';
import { JWT_SECRET, JWT_EXPIRES } from '../config';

const generateToken = res =>
  jwt.sign(
    {
      id: res.id,
      email: res.email,
      userName: res.userName,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

export default {
  Mutation: {
    async login(
      _parent,
      {
        LoginInput: { userName, password },
      }
    ) {
      // Validate Input Data
      try {
        await signInSchema.validateAsync(
          {
            userName,
            password,
          },
          { abortEarly: false }
        );
      } catch (err) {
        throw new UserInputError('Login Input Error');
      }

      try {
        // Validate UserName
        const user = await User.findOne({ userName });
        if (!user) {
          throw new UserInputError('Login Credentials Error');
        }

        // Validate Password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          throw new UserInputError('Login Credentials Error');
        }

        // Generate Token
        const token = generateToken(user);

        // Send Response
        return { ...user._doc, id: user._id, token };
      } catch (err) {
        throw new Error(err);
      }
    },

    async register(
      _parent,
      {
        RegisterInput: { userName, email, password, confirmPassword },
      },
      _context,
      _info
    ) {
      // Validate Schema
      try {
        await signUpSchema.validateAsync(
          {
            userName,
            email,
            password,
            confirmPassword,
          },
          { abortEarly: false }
        );
      } catch (err) {
        throw new UserInputError('Register Validation Error');
      }

      // Make sure user doesnt exist
      const user = await User.findOne({ userName });
      if (user) {
        throw new UserInputError('User name is taken');
      }

      // Hash Password
      const hashPass = await bcrypt.hash(password, 12);

      // New User
      const newUser = new User({
        userName,
        email,
        password: hashPass,
        createdAt: new Date().toISOString(),
      });

      // Save User
      const res = await newUser.save();

      // Generate Token
      const token = generateToken(res);

      // Send Response
      return { ...res._doc, id: res._id, token };
    },
  },
};

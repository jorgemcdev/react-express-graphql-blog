import Joi from '@hapi/joi';

const email = Joi.string()
  .email()
  .required()
  .label('Email');

const userName = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

const password = Joi.string()
  .min(8)
  .max(50)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/)
  .label('Password');
// 'Minimum 8 characters to 50 Max, and at least one letter or one number'

const confirmPassword = Joi.string()
  .min(8)
  .max(50)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/)
  .label('Confirm Password');
// 'Minimum 8 characters to 50 Max, and at least one letter or one number'

const signUpSchema = Joi.object({
  email,
  userName,
  password,
  confirmPassword,
});

const signInSchema = Joi.object({
  userName,
  password,
});

export { signUpSchema, signInSchema };

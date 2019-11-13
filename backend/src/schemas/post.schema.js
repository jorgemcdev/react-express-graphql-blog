/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

const body = Joi.string()
  .required()
  .label('Body');

const postSchema = Joi.object({
  body,
});

export { postSchema };

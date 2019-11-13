/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

const body = Joi.string()
  .required()
  .label('Body Comment');

const commentSchema = Joi.object({
  body,
});

export { commentSchema };

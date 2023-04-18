import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  JWT_SECRET: Joi.required(),
  DB_HOST: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_NAME: Joi.required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.required(),
  PORT: Joi.number().default(3000),
});

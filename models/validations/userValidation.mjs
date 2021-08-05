"use strict";

import Joi from 'joi';

/**
 * Holds Google user validation.
 *
 * @desc Google Auth user model validation.
 * @property {string} googleId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} displayName
 * @property {object} avatar
 * @property {string} role
 */
const googleUserValidate = Joi.object({
  googleId : Joi.string()
                .alphanum()
                .required(),
  firstName: Joi.string()
                .alphanum()
                .required(),
  lastName : Joi.string()
                .alphanum()
                .required(),
  displayName : Joi.string()
                   .required(),
  avatar      : {
       link : Joi.string(),
  },
  role   : Joi.string()
});

/**
 * Holds Register user validation schema.
 *
 * @desc Local registration schema.
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} displayName
 * @property {string} password
 * @property {object} avatar
 * @property {string} role
 */
const RegisterValidationSchema = Joi.object({
  email : Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  firstName: Joi.string()
                .alphanum()
                .required(),
  lastName : Joi.string()
                .alphanum()
                .required(),
  displayName : Joi.string()
                .required(),
  password : Joi.string()
                .required(),
  avatar : Joi.object({
      buffer : Joi.binary().encoding('base64'),
      ext : Joi.string()
  }),
  role   : Joi.string()
});

/**
 * Holds Login user validation schema.
 *
 * @desc Local login schema.
 * @property {string} email
 * @property {string} password
 */
const LoginValidationSchema = Joi.object({
  email : Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password : Joi.string().min(6).required(),
});

export {
  googleUserValidate,
  RegisterValidationSchema,
  LoginValidationSchema
}

"use strict";

import bcrypt from 'bcryptjs'

/**
 * Tests if the password is valid.
 *
 * @param {object} schema mongoos user schema
 * @param {object} email email of the user
 * @param {object} password password to test against
 * @returns {Boolean} if the password is valid
 */
const isPasswordValid = async (schema, email, password) => {
  const user = await schema.find({"email": email});
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) return true;
  return false;
}


export {
  isPasswordValid,
}

"use strict";

import { User } from '../models/User.mjs'
import { isPasswordValid } from '../libs/validPass.mjs'
import { googleUserValidate } from '../models/validations/userValidation.mjs'

export const authStrategies = {};

/**
 * Defines the google strategie.
 *
 * @param {string} accessToken accessToken
 * @param {string} refreshToken refreshToken
 * @param {object} profile google profile
 * @param {function} done callback to the next middleware
 * @returns {object} response with a set status
 */
authStrategies.google = async (accessToken,refreshToken,profile,done) => {

  if(!profile) return done(null, false);

  const newUser = {
  googleId    : profile.id,
  firstName   : profile.name.familyName,
  lastName    : profile.name.givenName,
  displayName : profile.displayName,
  avatar      : {
      link : profile.photos[0].value,
    }
  };

  User.findOne({"googleId" : newUser.googleId})
    .then((user) => {
      const {error} = googleUserValidate.validate(newUser);
      if(error) {
        return done(error,null);
      }
      if(user){
        done(null,user);
      }else{
        user = User.create(newUser);
        done(null,user);
      }

    }).catch((err) => {
      console.log(err);
    });
}

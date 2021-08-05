"use strict";

import { User } from '../models/User.mjs'
import { authStrategies } from './strategies.mjs'
import { authCtrl } from '../controllers/auth.controller.mjs'
import passportLocal from 'passport-local'
import passportGoogle from 'passport-google-oauth20'

const localStrategy = passportLocal.Strategy;
const googleStrategy = passportGoogle.Strategy;

/**
 * Activate the Auth strategies.
 *
 * @param {object} passport passportjs object
 */
export const passportStrategieBoot = function (passport) {
  //Google
  passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },authStrategies.google));

  //local
  const strategy = new localStrategy({ usernameField: 'email' }, authCtrl.verifyCallback);
  passport.use(strategy);

  passport.serializeUser(async function(user, done) {
    // note From : Tourahi Amine
    // The first time the user may be pending so i've used await here.
    const User = await user;

    if(Array.isArray(user)) {
      done(null, User[0]._id); //Note Tourahi : Here we used findAll in the local auth so is returns a table
    }else {
      done(null, User._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then((user) => {
          done(null, user);
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
  });
}

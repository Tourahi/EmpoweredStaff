"use strict";

import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { isPasswordValid } from '../libs/validPass.mjs'
import {   RegisterValidationSchema,
  LoginValidationSchema } from '../models/validations/userValidation.mjs'


export const authCtrl = {};

/**
 * Register new user.
 *
 * @param {object} req request
 * @param {object} res response
 * @returns {object} response with a set status
 */
authCtrl.registerCtrl = async function (req, res) {
  // Hashing the password
  const salt =  await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  // Construct user
  const UserBody = {
    email : req.body.email,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    displayName : req.body.firstName+" "+req.body.lastName,
    password : req.body.password,
  };
  const {error} = RegisterValidationSchema.validate(UserBody);
  if (error) return res.status(400).json({err : error.details[0].message});
  UserBody.password = hashedPass;
  const user = new User(UserBody);
  try {
    await user.save();
    // Place holder until the dashboard is complete  - Tourahi
    return res.status(201).send({});
  } catch(e) {
    return res.status(500).json({err :"Server Error Unable to save the user."});
  }
};


/**
 * Login verification callback for passportjs.
 *
 * @param {string} email user email
 * @param {string} password user password
 * @param {callback} done callback to pass data to the next middleware
 */
authCtrl.verifyCallback = (email, password, done) => {
  User.find({"email", email})
      .then( async (user) => {
        if (!user) return done(null, false);
        const isValid = await isPasswordValid(User, email, password);
        if (isValid) {
          return done(null, user);
        }else {
          return done(null, false);
        }
      }).catch(err) => {
        done(err);
      };
}

/**
 * Called when the login succeeds.
 *
 * @param {object} req request
 * @param {object} res response
 */
authCtrl.loginSuccess = (req , res , next) => {
  // res.status(200).json({ user : req.user});
  res.redirect("/");
};

/**
 * Called when the login fails.
 *
 * @param {object} req request
 * @param {object} res response
 */
authCtrl.loginFailure = (req , res , next) => {
  res.status(400).json({ err : 'You are not Authenticated'});
}

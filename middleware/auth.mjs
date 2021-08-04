import { User } from '../models/User.mjs'
import bcrypt from 'bcryptjs'

import { isPasswordValid } from '../libs/validPass.mjs'


/**
 * check if user exists before registering.
 *
 * @param {object} req request
 * @param {object} res response
 * @param {function} next move to the next middleware
 */
const isUserAlreadyExisting = async (req,res,next) => {
  // E short for Exists
  const emailE = await User.findOne({email : req.body.email});
  if(emailE) return res.status(400).json({err : "User already exist."});
  next();
}

/**
 * check if user exists.
 *
 * @param {object} req request
 * @param {object} res response
 * @param {function} next move to the next middleware
 */
const isUserExisting = async (req,res,next) => {
  if(req.body.email) {
    const emailExist = await User.findOne({ email : req.body.email });
    if(!emailExist) return res.status(400).json({err : "email incorrect."});
  }
  next();
}


/**
 * check the password if valid.
 *
 * @param {object} req request
 * @param {object} res response
 * @param {function} next move to the next middleware
 */
const checkPassword = async (req,res,next) => {
  const user = await User.findOne({email : req.body.email});
  const isPassValid = await bcrypt.compare(req.body.password , user.password);
  if(!isPassValid) return res.status(400).json({err : "incorrect password."})
  next(); //this should be the last middleware else uncomment this line
}


/**
 * ensure that the unauthenticated user stays at (/).
 *
 * @param {object} req request
 * @param {object} res response
 * @param {function} next move to the next middleware
 */
const ensureAuth = (req , res , next) => {
  // console.log(req.isAuthenticated());
  if(req.isAuthenticated()) {
    return next();
  }else{
    res.redirect('/');
  }
}

/**
 * keep users in home page.
 *
 * @param {object} req request
 * @param {object} res response
 * @param {function} next move to the next middleware
 */
const keepGest = (req , res , next) => {
  if(req.isAuthenticated()) {
    res.redirect('/dashboard'); //keep users in home page
  }else{
    return next();
  }
}

export {
  isUserExisting,
  isUserAlreadyExisting,
  checkPassword,
  ensureAuth,
  keepGest
}

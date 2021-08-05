import Router from 'express'
import passport from 'passport'

export const authRouter = Router();

// Middlewares for local users
import {
  isUserExisting,
  isUserAlreadyExisting,
  checkPassword,
  ensureAuth,
  keepGest
} from '../middleware/auth.mjs'

// Local users controllers
import { authCtrl } from '../controllers/auth.controller.mjs'

/**
 * Route's to google auth interface.
 *
 * @desc Auth with google
 * @method GET
 */
authRouter.get('/google' , passport.authenticate('google' ,{ scope : ['profile'] } ));

/**
 * Route's to root.
 *
 * @desc Google auth callback
 * @method GET
 */
authRouter.get('/google/callback' , passport.authenticate('google' , {
  failureRedirect : '/dashboard'
}) , (req , res) => {
  res.redirect('/dashboard');
});

/**
 * Accepts register post req from client.
 *
 * @desc local register
 * @method POST
 */
authRouter.post('/register', isUserAlreadyExisting, authCtrl.registerCtrl);


/**
 * Accepts login post req from client.
 *
 * @desc local login
 * @method POST
 */
authRouter.post('/login',isUserExisting,checkPassword
            ,passport.authenticate('local',
            {
              failureRedirect: '/auth/login-failure',
              successRedirect: '/auth/login-success'
            }));


/**
 * Login route routes to it if is a succesfull login.
 *
 * @desc local login-succes
 * @method GET
 */
authRouter.get('/login-success', authCtrl.loginSuccess);

/**
 * Login route routes to it if is a un-succesfull login.
 *
 * @desc local login-failure
 * @method GET
 */
authRouter.get('/login-failure', authCtrl.loginFailure);

/**
 * Logout client.
 *
 * @desc local logout
 * @method GET
 */
authRouter.get('/logout' , (req , res) => {
  req.logout();
  res.redirect('/dashboard');
});

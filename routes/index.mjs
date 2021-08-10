"use strict";

import Router from 'express'
import { authRouter } from './auth.mjs'
export const router = {}

// Role checking Middlewares
import {
  hasRoleUser,
  hasRoleAdmin,
  hasRoleManager
} from '../middleware/roles.mjs'

// Middlewares for local users
import {
  isUserExisting,
  isUserAlreadyExisting,
  checkPassword,
  ensureAuth,
  keepGest
} from '../middleware/auth.mjs'

router.register = async (app, express) => {
  const indxRouter = Router();
  /**
   * Landing page route.
   *
   * @desc Landing page
   * @method GET
   */
  indxRouter.get('/', keepGest, (req , res) => {
    res.render('index', { layout: 'login' });
  });

  /**
   * Dashboard page route.
   *
   * @desc Dashboard page
   * @method GET
   */
  indxRouter.get('/dashboard', ensureAuth,(req , res) => {
    res.render('dashboard', { layout: 'main' });
  });

  app.use('/', indxRouter);
  app.use('/auth', authRouter);
}

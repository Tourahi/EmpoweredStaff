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
   * Admin page route.
   *
   * @desc Admin page
   * @method GET
   */
  indxRouter.get('/admin', ensureAuth, hasRoleAdmin, (req , res) => {
    res.render('admin/dashboard', {
      layout: 'main',
      isAdmin: true
    });
  });

  /**
   * Dashboard page route.
   *
   * @desc Dashboard page
   * @method GET
   */
  indxRouter.get('/dashboard', ensureAuth, hasRoleUser,(req , res) => {
    res.render('dashboard', {
      layout: 'main',
      isAdmin: false
    });
  });

  app.use('/', indxRouter);
  app.use('/auth', authRouter);
}

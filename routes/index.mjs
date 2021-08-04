"use strict";

import Router from 'express'

export const router = {}

router.register = async (app, express) => {
  const indxRouter = Router();
  /**
   * Landing page route.
   *
   * @desc Landing page
   * @method GET
   */
  indxRouter.get('/',(req , res) => {
    res.render('index', {});
  });

  app.use('/', indxRouter);
}

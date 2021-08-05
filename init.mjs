"use strict";

import path from 'path'
import { _methodOverride } from './middleware/HTTP.mjs'


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Bind the middlewares to the app object.
 *
 * @param {object} app app (express object)
 * @param {object} session session
 * @param {object} mongoStore connect-mongo(session)
 * @param {object} mongoose mongoose
 * @param {object} passport passport
 * @param {object} flash flash
 * @param {object} express express
 * @param {object} morgan morgan
 * @param {object} methodOverride methodOverride
 */
const init = (app,session,mongoStore,mongoose,passport,flash,express,morgan,methodOverride) =>
{
  // Sessions
  app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      store: new mongoStore({ mongooseConnection: mongoose.connection }),
    })
  );
  // Overloading the post method
  app.use(methodOverride(_methodOverride));
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  //encoding && json
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('tiny'));
  //Connect flash
  app.use(flash());
  //Static folder
  console.log(__dirname);
  app.use(express.static(path.join(__dirname , 'public')));
}

export {
  init
}

"use strict";

import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import methodOverride from 'method-override'
import passport from 'passport'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import morgan from 'morgan'
import expHbs from'express-handlebars'

// local
import {connectDB} from './config/db.mjs'
import {router} from './routes/index.mjs'

// app
const app = express();
const PORT = process.env.PORT || 8000

// parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// connect to mongoDB Database
connectDB(mongoose)

//template :: express-handlebars
const hbs = expHbs.create(
  {
    extname : '.hbs',
    layoutsDir: './views/layouts',
    defaultLaout : 'index',
  }
);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

(async () => {
    await router.register(app, express);
})();

// booting the server
const server = app.listen(
  PORT,
  console.log(`Server is running on port ${PORT}.`)
);

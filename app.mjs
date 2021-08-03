import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import methodOverride from 'method-override'
import passport from 'passport'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import morgan from 'morgan'
// local
import {connectDB} from './config/db.mjs'

// app
const app = express();
const PORT = process.env.PORT || 8000

// parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// connect to mongoDB Database
connectDB(mongoose)



// booting the server
const server = app.listen(
  PORT,
  console.log(`Server is running on port ${PORT}.`)
);

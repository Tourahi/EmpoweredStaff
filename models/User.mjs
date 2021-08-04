"use strict";

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  googleId : {
    type     : String,
    default  : null
  },
  email : {
    type     : String,
    min      : 6,
    max      : 255
  },
  firstName: {
    type     : String,
  },
  lastName: {
    type     : String,
  },
  displayName: {
    type     : String,
  },
  password : {
    type     : String,
    min      : 6,
    max      : 1024
  },
  avatar : {
    buffer : Buffer,
    link   : String,
    ext    : String
  },
  role : {
    type     : String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},{
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
  timestamps: true
});


export = mongoose.model('User' , userSchema);

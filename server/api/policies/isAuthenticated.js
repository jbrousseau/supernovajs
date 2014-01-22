/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var express = require('express');
var app = express();
var passport = require('passport');
var local = require('../../config/local');
 
app.use(passport.initialize());
 
/**
 * Allow any authenticated user.
 */
module.exports = function(req, res, next) {
  if (!req.query.sessionId) {
    return res.forbidden('no session');
  }
  User.findOneBySessionId(req.query.sessionId, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.forbidden('invalid session');
    }
    req.user = user;
    return next();
  });
  // User is allowed, proceed to controller
  /*passport.authenticate('signature', {session: false}, function(err, user, info) {
    if (err || !user) {
      return res.forbidden("You are not permitted to perform this action. " + info);
    }
    return next();
  })(req, res, next);*/
};
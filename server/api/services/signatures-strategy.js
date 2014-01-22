/**
 * 
 * signature authentication strategy is defined here.
 * 
 **/

var passport = require('passport');
var SignatureStrategy = require('passport-signatures');

passport.use(new SignatureStrategy({}, function(req, next) {
  //publickey and signature are required
  if (!(req.query.publickey || req.query.signature)) {
    return next(null, false, null, null, null, 'publickey and signature are required');
  }
  User.findOneByName(req.query.publickey, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, null, null, null, 'user not found');
    }
    if (!user.sessionId) {
      return next(null, false, null, null, null, 'session is not initialized');
    }
    var signingString = req.method + "\n" + req.originalUrl;
    return next(null, user, req.query.signature, signingString, user.sessionId);
  });
}));
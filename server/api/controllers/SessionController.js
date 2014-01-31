/**
 * SessionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var bcrypt = require('bcrypt');

module.exports = {

  create: function (req, res, next) {

    // Check for email and password in params sent via the form, if none
    // redirect the browser back to the sign-in form.
    if (!req.param('email') || !req.param('password')) {
      return res.badRequest('You must enter both a username and password.');
    }

    // Try to find the user by there email address.
    // findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
    // User.findOneByEmail(req.param('email')).done(function(err, user) {
    User.findOneByEmail(req.param('email'), function foundUser(err, user) {
      if (err) return next(err);

      // If no user is found...
      if (!user) {
        return res.badRequest('User not found');
      }

      // Compare password from the form params to the encrypted password of the user found.
      bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
        if (err) return next(err);

        // If the password from the form doesn't match the password from the database...
        if (!valid) {
          return res.badRequest('Invalid username and password combination.');
        }

        // Change status to online
        user.online = true;
        var now = new Date();
        var jsonDate = now.toJSON();

        bcrypt.hash(user.name + jsonDate, 10, function passwordEncrypted(err, encryptedSessionId) {
          if (err) return next(err);
          user.sessionId = encryptedSessionId;
          user.save(function (err, user) {
            if (err) return next(err);
            return res.json(user);
          });
        });
      });
    });
  },

  destroy: function (req, res, next) {

    User.findOne(req.user.id, function foundUser(err, user) {

      var userId = req.user.id;

      if (userId) {
        // The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
        User.update(userId, {
          online: false,
          sessionId: null
        }, function (err) {
          if (err) {
            return next(err);
          }
          req.user = null;

          res.json('session destroyed sucessfully');
        });
      }
      else {
        // Redirect the browser to the sign-in screen
        res.badRequest('error no session found');
      }
    });
  }
};
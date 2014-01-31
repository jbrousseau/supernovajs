/**
 * UserController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {

  create: function (req, res, next) {

    var userObj = {
      name: req.param('name'),
      title: req.param('title'),
      email: req.param('email'),
      password: req.param('password'),
      confirmation: req.param('confirmation')
    }

    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    User.create(userObj, function userCreated(err, user) {

      // // If there's an error
      // if (err) return next(err);

      if (err) {
        // If error redirect back to sign-up page
        return res.json(err);
      }

      // Change status to online
      user.online = true;
      user.save(function (err, user) {
        if (err) return next(err);

        // add the action attribute to the user object for the flash message.
        user.action = " signed-up and logged-in."

        // Let other subscribed sockets know that the user was created.
        User.publishCreate(user);

        // After successfully creating the user
        // redirect to the show action
        // From ep1-6: //res.json(user);

        res.json(user);
      });
    });
  },

  // render the profile view (e.g. /views/show.ejs)
  show: function (req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next();
      }
      res.json(user)
    });
  },

  showAll: function (req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    User.find(function foundUsers(err, users) {
      if (err) {
        return next(err);
      }
      // pass the array down to the /views/index.ejs page
      res.json(users);
    });
  },

  // process the info from edit view
  update: function (req, res, next) {

    if (req.user.admin) {
      var userObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email'),
        admin: req.param('admin')
      }
    }
    else {
      var userObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email')
      }
    }

    User.update(req.param('id'), userObj, function userUpdated(err) {
      if (err) {
        return res.json(err);
      }
      res.json(user);
    });
  },

  destroy: function (req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next('User doesn\'t exist.');
      }

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) {
          return next(err);
        }
        // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
        User.publishUpdate(user.id, {
          name: user.name,
          action: ' has been destroyed.'
        });

        // Let other sockets know that the user instance was destroyed.
        User.publishDestroy(user.id);

      });
      res.json(user);
    });
  },

};
/**
 * Allow a logged-in user to see, edit and update her own profile
 * Allow admins to see everyone
 */

module.exports = function (req, res, next) {

  var sessionUserMatchesId = req.user.id === req.param('id');
  var isAdmin = req.user.admin;

  // The requested id does not match the user's id,
  // and this is not an admin
  if (!(sessionUserMatchesId || isAdmin)) {
    return res.forbidden('You must be an admin.');
  }
  return next();
};
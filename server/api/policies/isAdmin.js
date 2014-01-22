/**
 * Allow any admin user.
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to controller
  if (req.user && req.user.admin) {
    return next();
  } else {
    // User is not allowed
    return res.forbidden('user must be an admin');
  }
};

/**
 * Creates a middleware that handles a role authorization.
 *
 * @param {string} role role name
 * @returns {function} middleware
 */
const authorize = (role) => {
  return function(req, res, next) {
    if(role !== req.user.role) res.status(400).json({err : 'Unauthorized'});
    else next();
  }
}

const hasRoleUser = authorize('user');
const hasRoleAdmin = authorize('admin');
const hasRoleManager = authorize('manager');

export {
  hasRoleUser,
  hasRoleAdmin,
  hasRoleManager
}

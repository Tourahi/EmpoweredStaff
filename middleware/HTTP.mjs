"use strict";
/**
 * Removes _method from the request body.
 *
 * @param {object} req request
 * @param {object} res response
 * @returns {string} method name
 */
const _methodOverride = (req, res) => {
  if (req.body && typeof req.body == 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}

export {
  _methodOverride
}

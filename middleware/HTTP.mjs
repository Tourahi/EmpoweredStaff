
/**
 * Removes _method from the request body.
 *
 * @param {object} req request
 * @param {object} res site identification
 * @returns {string} method name
 */
const methodeOverride = (req, res) => {
  if (req.body && typeof req.body == 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}

export {
  methodeOverride,
}

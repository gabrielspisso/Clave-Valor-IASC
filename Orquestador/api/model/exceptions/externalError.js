class ExternalError extends Error {
  constructor({ statusCode, node }) {
    super()
    this.statusCode = statusCode;
    this.node = node;
  }
};

module.exports = ExternalError;
//ExternalError.prototype = Object.create(Error.prototype);
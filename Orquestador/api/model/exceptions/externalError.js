class ExternalError {
  constructor({ statusCode, node) {
    this.statusCode = statusCode;
    this.node = node;
  }
};

module.exports = ExternalError;
ExternalError.prototype = Object.create(Error.prototype);
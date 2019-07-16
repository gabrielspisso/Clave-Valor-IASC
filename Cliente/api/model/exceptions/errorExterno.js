class ErrorExterno {
  constructor({ statusCode, error: { message }}) {
    this.statusCode = statusCode;
    this.body = {
      message
    }
  }
};

module.exports = ErrorExterno;
ErrorExterno.prototype = Object.create(Error.prototype);
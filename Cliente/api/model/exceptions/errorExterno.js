class ErrorExterno extends Error {
  constructor({ statusCode, error: { message }}) {
    super()
    this.statusCode = statusCode;
    this.body = {
      message
    }
  }
};

module.exports = ErrorExterno;
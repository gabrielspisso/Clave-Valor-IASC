class NotFound {
  constructor(err) {
    this.statusCode = 404;
    this.body = {
      err,
      message: "No se encontro el valor buscado"
    };
  }
};

module.exports = NotFound;

NotFound.prototype = Object.create(Error.prototype);
class NotFound extends Error {
  constructor(err) {
    super()
    this.statusCode = 404;
    this.body = {
      err,
      message: "No se encontro el valor buscado"
    };
  }
};

module.exports = NotFound;
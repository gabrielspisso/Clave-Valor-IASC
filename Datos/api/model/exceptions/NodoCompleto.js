class BodyInvalido extends Error {
    constructor(err) {
      super()
      this.statusCode = 409;
      this.body = {
        err,
        message: "El nodo llego a su tamaño maximo."
      };
    }
  };
  
  module.exports = BodyInvalido;
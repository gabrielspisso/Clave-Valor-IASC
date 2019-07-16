class BodyInvalido extends Error {
    constructor(err) {
      super()
      this.statusCode = 400;
      this.body = {
        err,
        message: "El body no contiene los campos correctos."
      };
    }
  };
  
  module.exports = BodyInvalido;
class BodyInvalido {
    constructor(err) {
      this.statusCode = 400;
      this.body = {
        err,
        message: "El body no contiene los campos correctos."
      };
    }
  };
  
  BodyInvalido.prototype = Object.create(Error.prototype);
class TamanioValido {
  constructor(err) {
    this.statusCode = 400;
    this.body = {
      err,
      message: "El tamaño de uno de los campos es invalido"
    };
  }
};

module.exports = TamanioValido;

TamanioValido.prototype = Object.create(Error.prototype);
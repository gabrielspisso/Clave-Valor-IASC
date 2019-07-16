class TamanioValido extends Error {
  constructor(err) {
    super()
    this.statusCode = 400;
    this.body = {
      err,
      message: "El tamaño de uno de los campos es invalido"
    };
  }
};

module.exports = TamanioValido;
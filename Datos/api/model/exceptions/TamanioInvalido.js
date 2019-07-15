class TamanioValido extends Error {
    constructor(err) {
      super()
      this.body = {
        err,
        message: "Tamaño invalido"
      };
    }
  };
  
  module.exports = TamanioValido;
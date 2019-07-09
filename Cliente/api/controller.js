const Cliente = require('./model/cliente');

class Controller {

  constructor() {
    this.cliente = new Cliente();

  }

  obtenerValor({ params: { key }}) {
    return this.cliente.obtenerValor(key);
  }

  mayorA() {

  }

  menorA() {

  }

  crearValor() {

  }

}

module.exports = new Controller();
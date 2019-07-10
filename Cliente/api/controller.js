const Cliente = require('./model/cliente');

class Controller {

  constructor() {
    this.cliente = new Cliente();

  }

  obtenerValor({ params: { key } }) {
    return this.cliente.obtenerValor(key);
  }

  mayorA({ query: { valor } }) {
    return this.cliente.obtenerMayoresA(valor);
  }

  menorA({ query: { valor } }) {
    return this.cliente.obtenerMenoresA(valor);
  }

  crearValor({ body }) {
    return this.cliente.crearValor(body);
  }

}

module.exports = new Controller();
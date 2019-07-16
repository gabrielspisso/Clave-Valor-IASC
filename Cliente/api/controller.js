const Cliente = require('./model/cliente');

class Controller {

  constructor() {
    this.cliente = new Cliente();
    this.obtenerValor = this.obtenerValor.bind(this);
    this.mayorA = this.mayorA.bind(this);
    this.menorA = this.menorA.bind(this);
    this.crearValor = this.crearValor.bind(this);
    this.borrarPar = this.borrarPar.bind(this);
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

  borrarPar({ params: { key } }) {
    return this.cliente.borrarPar(key);
  }

}

module.exports = new Controller();
const _ = require('lodash');
const Orquestador = require('./model/orquestador');

class Controller {

  constructor() {
    this.orquestador = new Orquestador();
    _.bindAll(this, ["obtenerValor", "mayorA", "menorA", "crearValor", "esMaster"]);
  }

  obtenerValor({ params: { key } }) {
    return this.orquestador.getValue(key);
  }

  mayorA({ query: { valor } }) {
    return this.orquestador.getHighThan(valor);
  }

  menorA({ query: { valor } }) {
    return this.orquestador.getLessThan(valor);
  }

  crearValor({ body }) {
    return this.orquestador.assignKeyAndValue(body);
  }

  esMaster(){
    return this.orquestador.isMaster;
  }

}

module.exports = new Controller();
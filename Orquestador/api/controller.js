const _ = require('lodash');
const orquestador = require('./model/orquestador');

class Controller {

  constructor() {
    this.orquestador = orquestador;
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
    return  Promise.resolve({ esMaster: this.orquestador.isMaster });
  }

}

module.exports = new Controller();
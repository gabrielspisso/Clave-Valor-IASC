const _ = require("lodash");
const Promise = require("bluebird");
const request = require("request-promise");

class Cliente {

  constructor() {
    this.orquestadores = []
  }

  getMaster() {
    return !_.isUndefined(this.master) ? Promise.resolve(this.master) : this.buscarMaster();
  }

  buscarMaster() {
    // VER SI NO EXISTE
    return Promise.filter(this.orquestadores, this.esMaster, { concurrency: 10 })
    .get(0)
    .tap(master => this.master = master)
  };

  esMaster(orquestador) {
    const options = {
      method: "GET",
      uri:`${orquestador}/master`,
      json: true
    }
    return Promise.resolve(request(options))
      .get("esMaster")
  }


  obtenerValor(key) {
    return this._requestMaster({
      method: "GET",
      resource: `${key}`
    });
  }

  obtenerMayoresA(valor) {
    return this._requestMaster({
      method: "GET",
      resource: "mayorA",
      qs: { valor }
    });
  }

  obtenerMenoresA(valor) {
    return this._requestMaster({
      method: "GET",
      resource: "menorA",
      qs: { valor }
    });
  }

  crearValor(par) {
    return this._requestMaster({
      method: "POST",
      resource: "",
      json: par
    });
  }

  _requestMaster(options) {
    return this.getMaster()
      .then(master => request({ 
        uri: `${master}/${options.resource}`,
        ...options
      }));
  }


}

module.exports = Cliente;
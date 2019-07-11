const _ = require("lodash");
const Promise = require("bluebird");
const request = require("request-promise");
const config = require("../../config");
const NoHayMaster = require("./exceptions/noHayMaster");

class Cliente {

  constructor() {
    this.orquestadores = config.orquestadores
  }

  getMaster() {
    return !_.isUndefined(this.master) ? Promise.resolve(this.master) : this.buscarMaster();
  }

  buscarMaster() {
    return Promise.filter(this.orquestadores, this.esMaster, { concurrency: 10 })
    .get(0)
    .tap(this._throwIfUndefined)
    .tap(master => this.master = master)
  };

  _throwIfUndefined(orquestador)
  {
    if(_.isUndefined(orquestador))
      throw new NoHayMaster();
  }

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
    return  obtenerValorSegunCriterio("mayorA",valor)
  }

  obtenerMenoresA(valor) {
    return  obtenerValorSegunCriterio("menorA",valor)
  }
  
  obtenerValorSegunCriterio(criterio,valor) {
    return this._requestMaster({
      method: "GET",
      resource: criterio,
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
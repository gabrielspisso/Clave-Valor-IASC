const _ = require("lodash");
const Promise = require("bluebird");
const request = require("request-promise");
const config = require("../../config");
const NoHayMaster = require("./exceptions/noHayMaster");
const ErrorExterno = require("./exceptions/errorExterno");

class Cliente {

  constructor() {
    this.orquestadores = config.orquestadores
  }

  getMaster() {
    return this.buscarMaster()
      .then(() => this.master)
  }

  buscarMaster() {
    if(!_.isUndefined(this.master))
      return Promise.resolve();
    return Promise.filter(this.orquestadores, this.esMaster, { concurrency: 10 })
      .get(0)
      .tap(this._throwIfUndefined)
      .tap(master => _.assign(this, { master }))
  };

  _throwIfUndefined(orquestador) {
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
      resource: `${key}`,
      json: true
    });
  }

  obtenerMayoresA(valor) {
    return  this.obtenerValorSegunCriterio("mayor",valor)
  }

  obtenerMenoresA(valor) {
    return  this.obtenerValorSegunCriterio("menor",valor)
  }
  
  obtenerValorSegunCriterio(criterio,valor) {
    return this._requestMaster({
      method: "GET",
      resource: criterio,
      qs: { valor },
      json: true
    });
  }
  
  borrarPar(key) {
    return this._requestMaster({
      method: "DELETE",
      resource: key,
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
      }))
      .catch(it => { throw new ErrorExterno(it) })
  }


}

module.exports = Cliente;
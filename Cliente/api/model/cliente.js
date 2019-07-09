import _ from "lodash";
import Promise from "bluebird";
import request from "request-promise";
Promise.promisifyAll(request);

class Cliente {

  constructor() {
    this.orquestadores = []
  }

  getMaster() {
    return !_.isNull(this.master) ? Promise.resolve(this.master) : this.buscarMaster();
  }

  buscarMaster() {
    // VER SI NO EXISTE
    return Promise.filter(this.orquestadores, this.esMaster, { concurrency: 10 })
    .get(0)
    .tap(master => this.master = master)
  }

  esMaster(orquestador) {
    const options = {
      method: "GET",
      uri:`${orquestador}/master`
    }
    return request(options)
      .tap(console.log)
      .get("esMaster");
  }

}

module.exports = new Cliente();